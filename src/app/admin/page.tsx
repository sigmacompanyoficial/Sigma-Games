"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ref, get, update, remove, set, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { ShieldCheck, Users, ShieldAlert, CheckCircle, MessageCircle, Trophy, Trash2, Edit2, Ban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { games } from "@/data/games";

interface UserData {
  uid: string;
  email: string;
  role: string;
  isBanned: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  email: string;
  timestamp: number;
}

interface RankedGame {
  id: string;
  name: string;
  playCount: number;
}

export default function AdminPanel() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'chat' | 'ranking'>('users');
  
  const [usersList, setUsersList] = useState<UserData[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState(true);

  const [rankedGames, setRankedGames] = useState<RankedGame[]>([]);
  const [isLoadingRanking, setIsLoadingRanking] = useState(true);
  const [editingRank, setEditingRank] = useState<string | null>(null);
  const [editRankValue, setEditRankValue] = useState("");

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (isAdmin) {
      if (activeTab === 'users') loadUsers();
      if (activeTab === 'chat') loadChat();
      if (activeTab === 'ranking') loadRanking();
    }
  }, [isAdmin, activeTab]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // --- USERS ---
  const loadUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const snapshot = await get(ref(db, 'users'));
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const list: UserData[] = Object.keys(usersData).map(uid => ({
          uid,
          email: usersData[uid].email || `Usuario_${uid.slice(0, 5)}`, 
          role: usersData[uid].role || 'user',
          isBanned: usersData[uid].isBanned || false
        }));
        setUsersList(list);
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
    setIsLoadingUsers(false);
  };

  const setAdminRole = async (targetUid: string, role: string) => {
    if (targetUid === user?.uid && role === 'user') {
      showMessage('error', 'No puedes quitarte el administrador a ti mismo aquí.');
      return;
    }
    try {
      await update(ref(db, `users/${targetUid}`), { role });
      showMessage('success', role === 'admin' ? 'Usuario ascendido a administrador.' : 'Permisos de administrador revocados.');
      loadUsers();
    } catch (error) {
      showMessage('error', 'Error al cambiar los permisos.');
    }
  };

  const toggleBanStatus = async (targetUid: string, currentBanStatus: boolean) => {
    if (targetUid === user?.uid) {
      showMessage('error', 'No puedes banearte a ti mismo.');
      return;
    }
    try {
      await update(ref(db, `users/${targetUid}`), { isBanned: !currentBanStatus });
      showMessage('success', !currentBanStatus ? 'Usuario baneado exitosamente.' : 'Usuario desbaneado exitosamente.');
      loadUsers();
    } catch (error) {
      showMessage('error', 'Error al actualizar el estado de baneo.');
    }
  };

  // --- CHAT ---
  const loadChat = () => {
    setIsLoadingChat(true);
    const unsubscribe = onValue(ref(db, 'global_chat'), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        list.sort((a, b) => b.timestamp - a.timestamp); // Mas recientes primero
        setMessages(list);
      } else {
        setMessages([]);
      }
      setIsLoadingChat(false);
    });
    return unsubscribe;
  };

  const deleteMessage = async (msgId: string) => {
    try {
      await remove(ref(db, `global_chat/${msgId}`));
      showMessage('success', 'Mensaje borrado.');
    } catch (error) {
      showMessage('error', 'Error al borrar el mensaje.');
    }
  };

  // --- RANKING ---
  const loadRanking = async () => {
    setIsLoadingRanking(true);
    try {
      const snapshot = await get(ref(db, 'global_stats/play_counts'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list: RankedGame[] = [];
        Object.entries(data).forEach(([gameId, count]) => {
          const game = games.find(g => g.id === gameId);
          if (game) {
            list.push({
              id: game.id,
              name: game.name,
              playCount: count as number
            });
          }
        });
        list.sort((a, b) => b.playCount - a.playCount);
        setRankedGames(list);
      }
    } catch (error) {
      console.error("Error cargando ranking:", error);
    }
    setIsLoadingRanking(false);
  };

  const saveRankUpdate = async (gameId: string) => {
    const newCount = parseInt(editRankValue, 10);
    if (isNaN(newCount) || newCount < 0) {
      showMessage('error', 'Valor inválido.');
      return;
    }
    try {
      await set(ref(db, `global_stats/play_counts/${gameId}`), newCount);
      showMessage('success', 'Ranking actualizado.');
      setEditingRank(null);
      loadRanking();
    } catch (error) {
      showMessage('error', 'Error al actualizar el ranking.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card p-10 rounded-3xl text-center max-w-md w-full">
          <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Acceso Denegado</h1>
          <p className="text-white/60">No tienes permisos de administrador para ver esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <ShieldCheck className="text-primary" size={40} />
          Panel de Administración
        </h1>
        <p className="text-white/60 mt-2">Gestiona usuarios, mensajes de chat y el ranking global de juegos.</p>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 mb-6 rounded-xl flex items-center gap-3 ${
              message.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {message.type === 'success' ? <CheckCircle size={20} /> : <ShieldAlert size={20} />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'users' ? 'bg-primary text-white shadow-[0_0_15px_rgba(30,144,255,0.4)]' : 'bg-white/5 text-white/50 hover:bg-white/10'
          }`}
        >
          <Users size={18} />
          Usuarios
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'chat' ? 'bg-primary text-white shadow-[0_0_15px_rgba(30,144,255,0.4)]' : 'bg-white/5 text-white/50 hover:bg-white/10'
          }`}
        >
          <MessageCircle size={18} />
          Chat Global
        </button>
        <button
          onClick={() => setActiveTab('ranking')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'ranking' ? 'bg-primary text-white shadow-[0_0_15px_rgba(30,144,255,0.4)]' : 'bg-white/5 text-white/50 hover:bg-white/10'
          }`}
        >
          <Trophy size={18} />
          Ranking de Juegos
        </button>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-white/10">
        
        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="p-6">
            {isLoadingUsers ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50 text-sm">
                      <th className="pb-3 font-medium">ID Usuario / Email</th>
                      <th className="pb-3 font-medium">Rol</th>
                      <th className="pb-3 font-medium">Estado</th>
                      <th className="pb-3 font-medium text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((u) => (
                      <tr key={u.uid} className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${u.isBanned ? 'opacity-50' : ''}`}>
                        <td className="py-4 text-white">
                          <div className="font-medium text-sm">{u.email}</div>
                          <div className="text-xs text-white/40">{u.uid}</div>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            u.role === 'admin' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/10 text-white/70'
                          }`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4">
                          {u.isBanned ? (
                            <span className="text-xs font-bold text-red-400 bg-red-500/20 px-3 py-1 rounded-full flex items-center w-max gap-1">
                              <Ban size={12} /> Baneado
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-green-400 bg-green-500/20 px-3 py-1 rounded-full w-max flex">
                              Activo
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-right flex items-center justify-end gap-2">
                          {u.role !== 'admin' ? (
                            <button
                              onClick={() => setAdminRole(u.uid, 'admin')}
                              className="px-3 py-1.5 bg-primary/20 hover:bg-primary text-primary hover:text-white rounded-lg text-xs font-medium transition-all"
                            >
                              Hacer Admin
                            </button>
                          ) : (
                            <button
                              onClick={() => setAdminRole(u.uid, 'user')}
                              disabled={u.uid === user?.uid}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                u.uid === user?.uid 
                                  ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                                  : 'bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white'
                              }`}
                            >
                              Quitar Admin
                            </button>
                          )}
                          <button
                            onClick={() => toggleBanStatus(u.uid, u.isBanned)}
                            disabled={u.uid === user?.uid}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                              u.uid === user?.uid
                                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                                : u.isBanned 
                                  ? 'bg-white/20 hover:bg-white/30 text-white' 
                                  : 'bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white'
                            }`}
                          >
                            <Ban size={14} />
                            {u.isBanned ? 'Desbanear' : 'Banear'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <div className="p-6">
            {isLoadingChat ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-10 text-white/40">No hay mensajes en el chat global.</div>
            ) : (
              <div className="space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className="flex items-start justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition-colors gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-white">{msg.email.split('@')[0]}</span>
                        <span className="text-xs text-white/30">
                          {new Date(msg.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm break-all">{msg.text}</p>
                    </div>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="p-2 text-red-400 hover:text-white hover:bg-red-500/80 rounded-lg transition-colors flex-shrink-0"
                      title="Borrar mensaje"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RANKING TAB */}
        {activeTab === 'ranking' && (
          <div className="p-6">
            {isLoadingRanking ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : rankedGames.length === 0 ? (
              <div className="text-center py-10 text-white/40">No hay datos en el ranking todavía.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50 text-sm">
                      <th className="pb-3 font-medium">Juego</th>
                      <th className="pb-3 font-medium">Partidas Jugadas</th>
                      <th className="pb-3 font-medium text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankedGames.map(game => (
                      <tr key={game.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="py-4 text-white font-medium">{game.name}</td>
                        <td className="py-4">
                          {editingRank === game.id ? (
                            <input
                              type="number"
                              value={editRankValue}
                              onChange={(e) => setEditRankValue(e.target.value)}
                              className="bg-black/50 border border-primary text-white rounded-lg px-3 py-1 w-24 text-sm focus:outline-none"
                              autoFocus
                            />
                          ) : (
                            <span className="text-white/80 font-bold">{game.playCount}</span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          {editingRank === game.id ? (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => saveRankUpdate(game.id)}
                                className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white rounded-lg text-xs font-medium transition-all"
                              >
                                Guardar
                              </button>
                              <button
                                onClick={() => setEditingRank(null)}
                                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium transition-all"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingRank(game.id);
                                setEditRankValue(game.playCount.toString());
                              }}
                              className="p-2 text-white/40 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors inline-flex"
                              title="Editar partidas"
                            >
                              <Edit2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}

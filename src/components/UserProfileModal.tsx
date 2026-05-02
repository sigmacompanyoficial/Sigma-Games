"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Gamepad2, User as UserIcon } from "lucide-react";
import { get, ref } from "firebase/database";
import { db } from "@/lib/firebase";
import { games } from "@/data/games";
import Link from "next/link";

interface UserProfileModalProps {
  uid: string | null;
  email?: string;
  onClose: () => void;
}

export default function UserProfileModal({ uid, email, onClose }: UserProfileModalProps) {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const snapshot = await get(ref(db, `users/${uid}`));
        if (snapshot.exists()) {
          setProfileData(snapshot.val());
        } else {
          setProfileData({
            email: email || 'Usuario',
            stats: { gamesPlayed: 0, playTimeMinutes: 0 },
            recentGames: [],
            role: 'user'
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [uid, email]);

  if (!uid) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-black/80 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
        >
          {profileData?.role === 'admin' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>
          )}
          
          <div className="p-6 pb-0 flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                profileData?.role === 'admin' 
                  ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 text-yellow-400 border border-yellow-400/50'
                  : 'bg-primary/20 text-primary border border-primary/30'
              }`}>
                {profileData?.role === 'admin' ? <Crown size={32} /> : <UserIcon size={32} />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {(profileData?.email || email) ? (profileData?.email || email).split('@')[0] : 'Usuario'}
                </h3>
                {profileData?.role === 'admin' ? (
                  <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Administrador
                  </span>
                ) : (
                  <span className="text-xs font-medium text-white/50">Jugador</span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 pt-6 flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : profileData ? (
              <div className="space-y-6">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                    <div className="text-2xl font-bold text-white mb-1">
                      {profileData.stats?.gamesPlayed || 0}
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-wider">
                      Partidas Jugadas
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                    <div className="text-2xl font-bold text-white mb-1">
                      {profileData.recentGames?.length || 0}
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-wider">
                      Juegos Entrados
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
                    <div className="text-2xl font-bold text-white mb-1">
                      {Math.floor((profileData.stats?.playTimeMinutes || 0) / 60)}h {(profileData.stats?.playTimeMinutes || 0) % 60}m
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-white/50 uppercase tracking-wider">
                      Horas Jugadas
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Gamepad2 size={16} /> Juegos Recientes
                  </h4>
                  {profileData.recentGames && profileData.recentGames.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {profileData.recentGames.slice(0, 3).map((gameId: string) => {
                        const game = games.find(g => g.id === gameId);
                        if (!game) return null;
                        return (
                          <Link href={`/${game.slug}`} key={game.id} onClick={onClose}>
                            <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-primary/30 group">
                              <img src={game.image} alt={game.name} className="w-10 h-10 rounded-lg object-cover" />
                              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{game.name}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-white/40">Este usuario aún no ha jugado a nada.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-white/40">
                Perfil no encontrado.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

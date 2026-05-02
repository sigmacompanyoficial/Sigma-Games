"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { games } from "@/data/games";
import GameCard from "@/components/GameCard";
import { motion } from "framer-motion";
import { Heart, User, ArrowLeft, LogOut, Gamepad2, Clock, Play } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading, favorites, recentGames, stats, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const favoriteGamesData = favorites
    .map(id => games.find(g => g.id === id))
    .filter(Boolean) as typeof games;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
          <ArrowLeft size={20} />
          <span>Volver al inicio</span>
        </Link>

        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 border border-white/10"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50 shadow-[0_0_30px_rgba(30,144,255,0.3)] shrink-0">
            {user.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center">
                <User size={48} className="text-white/50" />
              </div>
            )}
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{user.displayName || "Usuario"}</h1>
            <p className="text-white/50 mb-6">{user.email}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Heart size={18} className="text-red-500 fill-red-500" />
                <span className="text-white font-medium">{favorites.length} Favoritos</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Gamepad2 size={18} className="text-blue-400" />
                <span className="text-white font-medium">{stats?.gamesPlayed || 0} Partidas</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Play size={18} className="text-green-400" />
                <span className="text-white font-medium">{recentGames.length} Juegos Entrados</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                <Clock size={18} className="text-purple-400" />
                <span className="text-white font-medium">{Math.floor((stats?.playTimeMinutes || 0) / 60)}h {(stats?.playTimeMinutes || 0) % 60}m</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-medium transition-colors border border-red-500/20 flex items-center gap-2"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </motion.div>

        {/* Favorite Games Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Heart size={24} className="text-red-500 fill-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white">Tus Juegos Favoritos</h2>
          </div>

          {favoriteGamesData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
              {favoriteGamesData.map((game, index) => (
                <motion.div
                  key={`fav-${game.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-card rounded-2xl">
              <Heart className="w-16 h-16 text-white/10 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white/80">Aún no tienes favoritos</h3>
              <p className="text-white/50 mt-2">Explora el catálogo y guarda los juegos que más te gusten.</p>
              <Link 
                href="/"
                className="inline-block mt-6 px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
              >
                Explorar Juegos
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

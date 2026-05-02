"use client";

import { useState, useRef, useEffect } from "react";
import { Game } from "@/data/games";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, Minimize, AlertCircle, Lock, Play, LogIn, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ref, runTransaction } from "firebase/database";
import { db } from "@/lib/firebase";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export default function ClientGameView({ game }: { game: Game }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { addRecentGame, user, loading } = useAuth();

  // Determine if registration is required
  const isLocked = game.isPremium !== false && !user && !loading;

  useEffect(() => {
    if (isGameStarted && user) {
      // Registrar juego reciente
      addRecentGame(game.id);

      // Referencia a las estadísticas del usuario
      const statsRef = ref(db, `users/${user.uid}/stats`);
      
      // Incrementar contador de juegos jugados al iniciar
      runTransaction(statsRef, (stats) => {
        const currentStats = stats || { gamesPlayed: 0, playTimeMinutes: 0 };
        return {
          ...currentStats,
          gamesPlayed: (currentStats.gamesPlayed || 0) + 1
        };
      }).catch(console.error);

      // Cronómetro para contar los minutos de juego
      const timer = setInterval(() => {
        runTransaction(statsRef, (stats) => {
          const currentStats = stats || { gamesPlayed: 1, playTimeMinutes: 0 };
          return {
            ...currentStats,
            playTimeMinutes: (currentStats.playTimeMinutes || 0) + 1
          };
        }).catch(console.error);
      }, 60000); // Cada minuto

      return () => clearInterval(timer);
    }

    if (isGameStarted) {
      // Incrementar contador global de jugadas del juego
      const countRef = ref(db, `global_stats/play_counts/${game.id}`);
      runTransaction(countRef, (currentCount) => {
        return (currentCount || 0) + 1;
      }).catch(console.error);
    }

  }, [game.id, addRecentGame, user, isGameStarted]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <section className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[1400px] flex flex-col items-center gap-8">

        {/* Game Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-2 tracking-tight">
            {game.name}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-primary/50"></span>
            <p className="text-primary font-bold tracking-widest uppercase text-sm">
              {isLocked ? "Contenido Premium" : "Sigma Experience"}
            </p>
            <span className="h-px w-8 bg-primary/50"></span>
          </div>
        </motion.div>

        <div className="w-full flex flex-col items-center gap-6">

          {/* Iframe Container */}
          <div
            ref={containerRef}
            className={`relative w-full max-w-5xl rounded-3xl overflow-hidden glass-card shadow-[0_0_80px_rgba(30,144,255,0.15)] border border-white/10 ${isFullscreen ? "h-screen max-w-none rounded-none" : "aspect-video"
              }`}
          >
            <AnimatePresence mode="wait">
              {isLocked ? (
                /* Registration Wall */
                <motion.div
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none"></div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_40px_rgba(30,144,255,0.3)]"
                  >
                    <Lock className="text-primary" size={40} />
                  </motion.div>

                  <h3 className="text-3xl font-extrabold text-white mb-4">¡Este juego es exclusivo!</h3>
                  <p className="text-white/60 max-w-md mb-8 text-lg leading-relaxed">
                    Para disfrutar de <span className="text-primary font-semibold">{game.name}</span> y guardar tus partidas, necesitas ser parte de la comunidad Sigma Games.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                      href="/login"
                      className="px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/40 flex items-center gap-2 group"
                    >
                      <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                      Registrarse Gratis
                    </Link>
                    <Link
                      href="/"
                      className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all"
                    >
                      Volver al inicio
                    </Link>
                  </div>
                </motion.div>
              ) : !isGameStarted ? (
                /* Lazy Load Start Screen */
                <motion.div
                  key="start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer group"
                  onClick={() => setIsGameStarted(true)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={game.image}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover brightness-50 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all duration-500"></div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative z-10 w-24 h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_50px_rgba(30,144,255,0.6)] group-hover:bg-primary transition-colors"
                  >
                    <Play className="text-white fill-white ml-2" size={40} />
                  </motion.div>

                  <p className="relative z-10 mt-6 text-white font-black text-2xl tracking-widest uppercase drop-shadow-lg">
                    Haga clic para jugar
                  </p>
                  {!user && (
                    <div className="relative z-10 mt-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-2">
                      <Sparkles size={14} className="text-yellow-400" />
                      <span className="text-white/80 text-xs font-bold uppercase tracking-tighter">Modo Invitado</span>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* The Actual Game Iframe */
                <motion.div
                  key="iframe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full"
                >
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center -z-10">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-white/60 font-medium tracking-widest uppercase text-xs">Cargando motor...</p>
                  </div>
                  <iframe
                    ref={iframeRef}
                    src={game.iframe}
                    title={game.name}
                    className="w-full h-full border-0 relative z-10 bg-black/50"
                    allow="fullscreen; autoplay; gamepad"
                  />

                  {/* Controls overlay */}
                  <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                    <button
                      onClick={toggleFullscreen}
                      className="p-3 bg-black/50 hover:bg-primary backdrop-blur-md rounded-xl text-white transition-all shadow-lg border border-white/10"
                      title="Pantalla completa"
                    >
                      {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ad Horizontal Superior */}
          <div className="w-full max-w-5xl flex justify-center hidden sm:flex">
            <AdBanner type="horizontal" />
          </div>
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-5xl p-6 glass-card rounded-3xl flex flex-col sm:flex-row items-start sm:items-center gap-6 text-white/80 border border-white/5 shadow-2xl"
        >
          <div className="p-4 bg-primary/20 rounded-2xl text-primary flex-shrink-0 shadow-inner">
            <AlertCircle size={32} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white mb-1 tracking-tight">Estadísticas en Tiempo Real</h3>
            <p className="leading-relaxed font-light text-white/70">
              Sigma Games registra automáticamente tu tiempo de juego y sesiones para que puedas ver tu progreso en tu perfil. {user ? "Tus horas de juego se están sumando a tu cuenta ahora mismo." : "Regístrate para empezar a acumular horas y aparecer en los rankings."}
            </p>
          </div>
        </motion.div>

        {/* Ad Horizontal Inferior */}
        <div className="w-full max-w-5xl flex justify-center pb-8 hidden sm:flex">
          <AdBanner type="horizontal" />
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, Gamepad2, ChevronDown, Sparkles, Dices, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { games } from "@/data/games";
import GameCard from "@/components/GameCard";
import RankingModal from "@/components/RankingModal";
import { motion, AnimatePresence } from "framer-motion";
import AdBanner from "@/components/AdBanner";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const INITIAL_GAMES_COUNT = 30;

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_GAMES_COUNT);
  const { user, loading, loginWithGoogle, logout, recentGames } = useAuth();

  useEffect(() => {
    // Splash screen logic: skip if already shown in this session
    const hasShownSplash = sessionStorage.getItem("sigma_splash_shown");
    
    if (hasShownSplash) {
      setIsAppLoading(false);
    } else {
      const timer = setTimeout(() => {
        setIsAppLoading(false);
        sessionStorage.setItem("sigma_splash_shown", "true");
      }, 1500); // Reduced from 2000ms
      return () => clearTimeout(timer);
    }
  }, []);

  // Search debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredGames = useMemo(() => {
    if (!debouncedSearchTerm) return games;
    const lowerSearch = debouncedSearchTerm.toLowerCase();
    return games.filter((game) =>
      game.name.toLowerCase().includes(lowerSearch)
    );
  }, [debouncedSearchTerm]);

  const displayedGames = useMemo(() => 
    filteredGames.slice(0, visibleCount),
  [filteredGames, visibleCount]);

  const hasMoreGames = visibleCount < filteredGames.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + INITIAL_GAMES_COUNT);
  };

  const handleRandomGame = () => {
    if (games.length > 0) {
      const randomIndex = Math.floor(Math.random() * games.length);
      const randomGame = games[randomIndex];
      router.push(`/${randomGame.slug}`);
    }
  };

  // Reset pagination on search
  useEffect(() => {
    setVisibleCount(INITIAL_GAMES_COUNT);
  }, [debouncedSearchTerm]);

  const recentGamesData = useMemo(() => 
    recentGames
      .map(id => games.find(g => g.id === id))
      .filter(Boolean) as typeof games,
  [recentGames]);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isAppLoading ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none"></div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center shadow-[0_0_50px_rgba(30,144,255,0.6)] mb-8 border border-white/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 mix-blend-overlay animate-pulse"></div>
              <Gamepad2 className="text-white relative z-10" size={50} />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-2"
            >
              SIGMA GAMES
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "150px" }}
              transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mt-4"
            />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pb-20"
          >
            {/* Header */}
            <header className="sticky top-0 z-40 glass-panel">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-primary/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.png" alt="Sigma Games Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                      Sigma Games
                    </h1>
                    <p className="text-xs text-primary font-medium tracking-wider uppercase">Sigma Company</p>
                  </div>
                </div>
                
                {/* Search Bar & Auth */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white/10 transition-all sm:text-sm backdrop-blur-md shadow-inner"
                      placeholder="Buscar juegos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {!loading && (
                    <div className="flex items-center gap-2">
                      {user ? (
                        <div className="flex items-center gap-2">
                          <Link href="/profile" className="flex items-center gap-2 group">
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={user.photoURL || "/logo.png"} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                          </Link>
                          <button onClick={logout} className="text-sm text-white/60 hover:text-red-400 transition-colors">
                            Salir
                          </button>
                        </div>
                      ) : (
                        <Link 
                          href="/login"
                          className="px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-primary/30"
                        >
                          Iniciar Sesión
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 sm:py-24">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 text-primary text-sm font-medium mb-6"
                >
                  <Sparkles size={16} />
                  <span>Más de 600 juegos premium disponibles</span>
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
                >
                  Descubre la <span className="text-primary drop-shadow-[0_0_15px_rgba(30,144,255,0.5)]">Experiencia</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-8"
                >
                  Juega a los mejores títulos con el catálogo más exclusivo. 
                  Diseño premium, sin interrupciones, máxima diversión.
                </motion.p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    onClick={handleRandomGame}
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(30,144,255,0.4)] hover:shadow-[0_0_50px_rgba(30,144,255,0.6)] hover:-translate-y-1 group"
                  >
                    <Dices size={24} className="group-hover:animate-spin" />
                    <span>Juego Aleatorio</span>
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    onClick={() => setIsRankingOpen(true)}
                    className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-yellow-500/50 text-white rounded-2xl font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 group"
                  >
                    <Trophy size={24} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                    <span>Ranking</span>
                  </motion.button>
                </div>
              </div>
            </section>

            {/* Top Ad Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AdBanner type="horizontal" className="mb-10" />
            </div>

            {/* Recent Games */}
            {user && recentGamesData.length > 0 && !searchTerm && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sparkles size={18} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Juegos Recientes</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {recentGamesData.slice(0, 6).map((game) => (
                    <motion.div key={`recent-${game.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <GameCard game={game} />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Games Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {displayedGames.length > 0 ? (
                <>
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8"
                  >
                    <AnimatePresence>
                      {displayedGames.map((game, index) => {
                        // Insert an ad every 20 items (but not at index 0)
                        const showAdAfter = (index + 1) % 20 === 0 && index !== displayedGames.length - 1;
                        
                        return (
                          <React.Fragment key={game.id}>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -20 }}
                              transition={{ duration: 0.4, delay: Math.min((index % 10) * 0.05, 0.3) }}
                              layout
                            >
                              <GameCard game={game} />
                            </motion.div>
                            
                            {showAdAfter && (
                              <div className="col-span-full w-full py-4 hidden md:flex justify-center">
                                <AdBanner type="horizontal" />
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>

                  {hasMoreGames && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="mt-16 mb-8 flex flex-col items-center gap-10"
                    >
                      <button
                        onClick={handleLoadMore}
                        className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-primary/50 text-white font-medium transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className="relative flex items-center gap-2">
                          Cargar más juegos
                          <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform duration-300 text-primary" />
                        </span>
                      </button>
                      
                      {/* Ad near load more */}
                      <AdBanner type="horizontal" className="hidden md:flex w-full" />
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 glass-card rounded-2xl max-w-2xl mx-auto"
                >
                  <Gamepad2 className="w-20 h-20 text-white/10 mx-auto mb-6" />
                  <h3 className="text-2xl font-medium text-white/80">No se encontraron juegos</h3>
                  <p className="text-white/50 mt-3 text-lg">Prueba con otro término de búsqueda</p>
                </motion.div>
              )}
            </section>
          </motion.div>
        )}
      </AnimatePresence>
      <RankingModal isOpen={isRankingOpen} onClose={() => setIsRankingOpen(false)} />
    </main>
  );
}

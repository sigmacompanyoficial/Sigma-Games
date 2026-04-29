"use client";

import { useState } from "react";
import { Search, Gamepad2 } from "lucide-react";
import { games } from "@/data/games";
import GameCard from "@/components/GameCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center shadow-lg shadow-primary/30 border border-primary/30">
              <Gamepad2 className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Sigma Games
              </h1>
              <p className="text-xs text-primary font-medium tracking-wider uppercase">Sigma Company</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white/10 transition-all sm:text-sm backdrop-blur-md shadow-inner"
              placeholder="Buscar juegos por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            Descubre la <span className="text-primary drop-shadow-[0_0_15px_rgba(30,144,255,0.5)]">Experiencia</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Juega a los mejores títulos con el catálogo más exclusivo. 
            Diseño premium, sin interrupciones, máxima diversión.
          </motion.p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {filteredGames.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, delay: Math.min((index % 20) * 0.05, 0.5) }}
                  layout
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
    </main>
  );
}

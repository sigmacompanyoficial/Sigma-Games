"use client";

import { useState, useRef } from "react";
import { Game } from "@/data/games";
import { motion } from "framer-motion";
import { Maximize, Minimize, AlertCircle } from "lucide-react";

export default function ClientGameView({ game }: { game: Game }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      <div className="max-w-6xl w-full flex flex-col gap-8">
        
        {/* Game Hero Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center sm:hidden"
        >
          <h2 className="text-3xl font-extrabold text-white mb-2">{game.name}</h2>
          <p className="text-primary font-medium tracking-wide">¡Listo para jugar!</p>
        </motion.div>

        {/* Iframe Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          ref={containerRef}
          className={`relative w-full rounded-2xl overflow-hidden glass-card shadow-[0_0_50px_rgba(30,144,255,0.1)] border border-white/10 ${
            isFullscreen ? "h-screen rounded-none" : "aspect-video"
          }`}
        >
          {/* Subtle loading background */}
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center -z-10">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white/60 font-medium">Cargando juego...</p>
          </div>

          <iframe
            src={game.iframe}
            title={game.name}
            className="w-full h-full border-0 relative z-10 bg-black/50"
            allow="fullscreen; autoplay; gamepad; keyboard"
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
        
        {/* Ad or info banner placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full p-6 glass-card rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white/80"
        >
          <div className="p-3 bg-primary/20 rounded-xl text-primary">
            <AlertCircle size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">¡Aviso importante!</h3>
            <p className="leading-relaxed">
              Algunos juegos pueden tardar unos segundos en cargar dependiendo de tu conexión. Si el juego no carga o muestra un error, intenta recargar la página. ¡Disfruta de la experiencia premium de Sigma Games!
            </p>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Game } from "@/data/games";
import { motion } from "framer-motion";
import { Maximize, Minimize, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ref, runTransaction } from "firebase/database";
import { db } from "@/lib/firebase";
import AdBanner from "@/components/AdBanner";

export default function ClientGameView({ game }: { game: Game }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { addRecentGame, user, saveGameData, loadGameData } = useAuth();

  useEffect(() => {
    addRecentGame(game.id);
    
    // Incrementar contador global
    const countRef = ref(db, `global_stats/play_counts/${game.id}`);
    runTransaction(countRef, (currentCount) => {
      return (currentCount || 0) + 1;
    }).catch(console.error);
    
  }, [game.id, addRecentGame]);

  // Sincronizar localStorage del juego hacia la base de datos (Firebase)
  useEffect(() => {
    if (!user || !iframeRef.current) return;

    const syncInterval = setInterval(async () => {
      try {
        const iframeWindow = iframeRef.current?.contentWindow;
        if (iframeWindow) {
          const ls = iframeWindow.localStorage;
          const dataToSave: Record<string, string> = {};
          for (let i = 0; i < ls.length; i++) {
            const key = ls.key(i);
            if (key) {
              dataToSave[key] = ls.getItem(key) || "";
            }
          }
          if (Object.keys(dataToSave).length > 0) {
            await saveGameData(game.id, dataToSave);
          }
        }
      } catch (err) {
        // Si el iframe es cross-origin lanzará un DOMException por seguridad. Lo ignoramos.
      }
    }, 5000); // Guardado automático cada 5 segundos

    return () => clearInterval(syncInterval);
  }, [user, game.id, saveGameData]);

  const handleIframeLoad = async () => {
    if (!user || !iframeRef.current) return;
    try {
      // Cargar datos del juego guardados en DB y restaurarlos en el localStorage del iframe
      const data = await loadGameData(game.id);
      const iframeWindow = iframeRef.current.contentWindow;
      if (iframeWindow && data) {
        const ls = iframeWindow.localStorage;
        Object.entries(data).forEach(([key, value]) => {
          ls.setItem(key, value as string);
        });
      }
    } catch (err) {
      // Cross-origin error ignorable
    }
  };

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
          className="text-center sm:hidden"
        >
          <h2 className="text-3xl font-extrabold text-white mb-2">{game.name}</h2>
          <p className="text-primary font-medium tracking-wide">¡Listo para jugar!</p>
        </motion.div>

        {/* Ad Horizontal Superior */}
        <div className="w-full max-w-5xl flex justify-center hidden sm:flex">
          <AdBanner type="horizontal" />
        </div>

        <div className="w-full flex items-start justify-center gap-6">

          {/* Iframe Container */}
          <div 
            ref={containerRef}
            className={`relative w-full max-w-5xl rounded-2xl overflow-hidden glass-card shadow-[0_0_50px_rgba(30,144,255,0.1)] border border-white/10 ${
              isFullscreen ? "h-screen max-w-none rounded-none" : "aspect-video"
            }`}
          >
            {/* Subtle loading background */}
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center -z-10">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white/60 font-medium">Cargando juego...</p>
            </div>

            <iframe
              ref={iframeRef}
              src={game.iframe}
              title={game.name}
              className="w-full h-full border-0 relative z-10 bg-black/50"
              allow="fullscreen; autoplay; gamepad"
              onLoad={handleIframeLoad}
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
          </div>
        </div>
        
        {/* Ad or info banner placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-5xl p-6 glass-card rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white/80"
        >
          <div className="p-3 bg-primary/20 rounded-xl text-primary flex-shrink-0">
            <AlertCircle size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">¡Aviso importante!</h3>
            <p className="leading-relaxed">
              Algunos juegos pueden tardar unos segundos en cargar dependiendo de tu conexión. Si el juego no carga o muestra un error, intenta recargar la página. ¡Disfruta de la experiencia premium de Sigma Games!
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

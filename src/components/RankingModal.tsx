"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Play } from "lucide-react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { games } from "@/data/games";
import { useRouter } from "next/navigation";

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RankedGame {
  id: string;
  name: string;
  slug: string;
  playCount: number;
  image: string;
}

export default function RankingModal({ isOpen, onClose }: RankingModalProps) {
  const [rankedGames, setRankedGames] = useState<RankedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    const countRef = ref(db, 'global_stats/play_counts');
    const unsubscribe = onValue(countRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const rankings: RankedGame[] = [];
        
        Object.entries(data).forEach(([gameId, count]) => {
          const game = games.find(g => g.id === gameId);
          if (game) {
            rankings.push({
              id: game.id,
              name: game.name,
              slug: game.slug,
              playCount: count as number,
              image: game.image
            });
          }
        });

        // Sort descending
        rankings.sort((a, b) => b.playCount - a.playCount);
        setRankedGames(rankings.slice(0, 10)); // Top 10
      } else {
        setRankedGames([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isOpen]);

  const handleGameClick = (slug: string) => {
    onClose();
    router.push(`/${slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-background border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
                    <Trophy size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Top 10 Más Jugados</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/50 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-white/50">Cargando ranking...</p>
                  </div>
                ) : rankedGames.length === 0 ? (
                  <div className="text-center py-12 text-white/50">
                    Aún no hay suficientes datos para el ranking. ¡Empieza a jugar!
                  </div>
                ) : (
                  rankedGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleGameClick(game.slug)}
                      className="group flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 cursor-pointer transition-all"
                    >
                      <div className={`w-8 text-center font-bold text-lg ${
                        index === 0 ? "text-yellow-400" :
                        index === 1 ? "text-gray-300" :
                        index === 2 ? "text-amber-600" : "text-white/40"
                      }`}>
                        #{index + 1}
                      </div>
                      
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play size={16} className="text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate group-hover:text-primary transition-colors">
                          {game.name}
                        </h4>
                        <p className="text-xs text-white/40">
                          {game.playCount} {game.playCount === 1 ? 'partida' : 'partidas'}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

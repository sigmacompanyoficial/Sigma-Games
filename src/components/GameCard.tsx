import { Play } from "lucide-react";
import { Game } from "@/data/games";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <Link href={`/${game.slug}`} className="block h-full outline-none">
      <motion.div 
        whileHover={{ y: -8 }}
        className="glass-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full shadow-lg hover:shadow-primary/30 transition-shadow duration-300 relative border border-white/5 hover:border-primary/50"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-black/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_30px_rgba(30,144,255,0.8)] backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
              <Play className="w-8 h-8 text-white ml-1 fill-white" />
            </motion.div>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow relative z-10 bg-gradient-to-b from-transparent to-black/40">
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">{game.name}</h3>
          
          <div className="mt-auto overflow-hidden relative">
            <div className="w-full py-2.5 rounded-xl bg-white/10 group-hover:bg-primary text-white flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(30,144,255,0.4)]">
              <Play size={18} className="fill-current" />
              <span>Jugar Ahora</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

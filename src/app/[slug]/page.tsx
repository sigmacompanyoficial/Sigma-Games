import { notFound } from "next/navigation";
import { games } from "@/data/games";
import Link from "next/link";
import { ArrowLeft, Maximize, Share2 } from "lucide-react";
import ClientGameView from "./ClientGameView";

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);

  if (!game) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background flex flex-col relative">
      {/* Background with subtle glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Navigation */}
      <nav className="glass-panel sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all font-medium"
          >
            <ArrowLeft size={20} />
            Volver al catálogo
          </Link>
          
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
              {game.name}
            </h1>
          </div>
          
          <div className="flex gap-2 text-white/50">
            {/* These could be buttons in a real app */}
            <div className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white cursor-pointer transition-colors">
              <Share2 size={20} />
            </div>
          </div>
        </div>
      </nav>

      <ClientGameView game={game} />
    </main>
  );
}

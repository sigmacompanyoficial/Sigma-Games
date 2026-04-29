import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Gamepad2 } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sigma Games | Experiencia de Juego Premium",
  description: "Catálogo moderno y elegante de juegos HTML5 de Sigma Company",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen antialiased bg-background text-foreground flex flex-col`}>
        <div className="flex-grow">
          {children}
        </div>
        
        {/* Global Footer */}
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Sigma Games Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Sigma Games
              </span>
            </div>
            
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Sigma Company. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-white/50">
              <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-primary transition-colors">Términos de Uso</a>
              <a href="#" className="hover:text-primary transition-colors">Contacto</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

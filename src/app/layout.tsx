import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Gamepad2 } from "lucide-react";
import { AuthProvider } from "@/context/AuthContext";
import GlobalChat from "@/components/GlobalChat";
import CookieBanner from "@/components/CookieBanner";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sigma Games | Experiencia de Juego Premium",
    description: "Catálogo moderno y elegante de juegos HTML5 de Sigma Company. Disfruta de la mejor colección de juegos online gratuitos y optimizados para cualquier dispositivo.",
  keywords: ["juegos", "juegos online", "juegos HTML5", "Sigma Games", "juegos gratis", "juegos premium", "jugar online"],
  authors: [{ name: "Sigma Company" }],
  openGraph: {
    title: "Sigma Games | Experiencia de Juego Premium",
    description: "Catálogo moderno y elegante de juegos HTML5 de Sigma Company. Disfruta de la mejor colección de juegos online.",
    siteName: "Sigma Games",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Sigma Games Logo",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigma Games | Experiencia de Juego Premium",
    description: "Catálogo moderno y elegante de juegos HTML5 de Sigma Company.",
    images: ["/logo.png"],
    creator: "@sigmacompany",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <AuthProvider>
          <div className="flex-grow">
            {children}
          </div>

          <GlobalChat />
          <CookieBanner />

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
                <Link href="/privacy" className="hover:text-primary transition-colors">Política de Privacidad</Link>
                <Link href="/terms" className="hover:text-primary transition-colors">Términos de Uso</Link>
                <a href="#" className="hover:text-primary transition-colors">Contacto</a>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

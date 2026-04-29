import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sigma Games | Experiencia de Juego Premium",
  description: "Catálogo moderno y elegante de juegos HTML5 de Sigma Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}

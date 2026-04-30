"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookieConsent");
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto pointer-events-auto bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 flex items-start sm:items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-xl text-primary flex-shrink-0">
                <Cookie size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Valoramos tu privacidad</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Utilizamos cookies para personalizar el contenido y los anuncios, ofrecer funciones de redes sociales y analizar el tráfico. Al continuar navegando, aceptas nuestra{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Política de Privacidad
                  </Link>{" "}
                  y{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Términos de Uso
                  </Link>.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={acceptCookies}
                className="flex-1 sm:flex-none px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(30,144,255,0.3)]"
              >
                Aceptar Cookies
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                aria-label="Cerrar aviso"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React from "react";
import { FileText } from "lucide-react";

export default function TermsOfUse() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-8">
          <div className="p-4 bg-primary/20 rounded-2xl text-primary">
            <FileText size={40} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Términos de Uso</h1>
            <p className="text-primary mt-1 font-medium">Última actualización: Abril 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y jugar en Sigma Games, aceptas estar sujeto a estos Términos de Uso, a todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, tienes prohibido usar o acceder a este sitio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Licencia de Uso</h2>
            <p>
              Se otorga permiso para jugar temporalmente los juegos alojados en la plataforma Sigma Games de manera gratuita para visualización y uso transitorio personal y no comercial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Propiedad de los Juegos</h2>
            <p>
              La mayoría de los juegos HTML5 ofrecidos en la plataforma son incrustados y pertenecen a sus respectivos desarrolladores y creadores. Sigma Games actúa como un directorio para facilitar la experiencia de juego del usuario.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Conducta del Usuario</h2>
            <p>
              Al usar el chat global o cualquier otra función social, te comprometes a no publicar contenido ofensivo, spam o material ilegal. Nos reservamos el derecho de bloquear cuentas que violen esta normativa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Modificaciones</h2>
            <p>
              Sigma Company puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. Al utilizar este sitio web, aceptas estar sujeto a la versión actual de estos Términos de Uso.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

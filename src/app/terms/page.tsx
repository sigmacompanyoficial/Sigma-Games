import React from "react";
import { FileText, Gavel, AlertTriangle, Copyright, HelpCircle } from "lucide-react";

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
            <p className="text-primary mt-1 font-medium">Última actualización: Mayo 2026</p>
          </div>
        </div>

        <div className="space-y-12 text-white/70 leading-relaxed">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-white">1. Aceptación</h2>
            </div>
            <p>
              Al acceder a Sigma Games, el usuario acepta cumplir con estos términos. El acceso a ciertos juegos premium o funciones sociales requiere la creación de una cuenta gratuita y el cumplimiento de las normas de la comunidad.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Copyright className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-white">2. Propiedad Intelectual</h2>
            </div>
            <p>
              Sigma Games es una plataforma de distribución de juegos. La mayoría de los títulos son propiedad de sus respectivos desarrolladores y se ofrecen mediante marcos de incrustación (iframes) autorizados. El diseño de la plataforma, logo y marca Sigma Games son propiedad exclusiva de Sigma Company.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-white">3. Limitación de Responsabilidad</h2>
            </div>
            <p>
              Sigma Games no se hace responsable de fallos técnicos en los servidores de terceros que alojan los juegos, ni de la pérdida de progreso local en caso de borrar la caché del navegador. El servicio se proporciona "tal cual" sin garantías explícitas.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-white">4. Normas del Chat</h2>
            </div>
            <p>
              Los usuarios se comprometen a mantener un ambiente respetuoso en el Chat Global. Está estrictamente prohibido el spam, el acoso o compartir contenido ilegal. Sigma Games se reserva el derecho de suspender permanentemente el acceso a cualquier usuario que viole estas normas.
            </p>
          </section>

          <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 text-center">
            <p className="text-white font-medium mb-2">¿Tienes preguntas?</p>
            <p className="text-sm">Contáctanos en legal@sigma-games.com para cualquier consulta relacionada con estos términos.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

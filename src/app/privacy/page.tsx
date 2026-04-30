import React from "react";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-8">
          <div className="p-4 bg-primary/20 rounded-2xl text-primary">
            <ShieldCheck size={40} />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Política de Privacidad</h1>
            <p className="text-primary mt-1 font-medium">Última actualización: Abril 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Información que Recopilamos</h2>
            <p>
              En Sigma Games recopilamos la información que proporcionas directamente al crear una cuenta, como tu dirección de correo electrónico, nombre de usuario y datos de perfil. También recopilamos información generada automáticamente durante tu uso del sitio, como estadísticas de juego, partidas recientes e interacciones con el catálogo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Uso de la Información</h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Proporcionar y mantener nuestro servicio de juegos en línea.</li>
              <li>Sincronizar el progreso de tus juegos en la nube (mediante Firebase).</li>
              <li>Personalizar tu experiencia mostrando tus juegos recientes y favoritos.</li>
              <li>Mantener clasificaciones globales de los juegos más populares.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Uso de Cookies</h2>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar la navegación, recordar tus sesiones iniciadas y con fines analíticos y publicitarios. Puedes gestionar las preferencias de cookies a través de la configuración de tu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Publicidad</h2>
            <p>
              Trabajamos con proveedores de anuncios de terceros que pueden usar cookies para mostrar publicidad relevante basándose en visitas anteriores a nuestro sitio web o a otros sitios en Internet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Seguridad de Datos</h2>
            <p>
              Toda la información se almacena de forma segura usando las infraestructuras de Google Cloud y Firebase. Empleamos medidas de seguridad comercialmente aceptables para proteger tus datos personales contra accesos no autorizados.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

import React from "react";
import { ShieldCheck, Eye, Lock, Globe, Bell } from "lucide-react";

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
            <p className="text-primary mt-1 font-medium">Última actualización: Mayo 2026</p>
          </div>
        </div>

        <div className="space-y-12 text-white/70 leading-relaxed">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-white">1. Recopilación de Información</h2>
            </div>
            <p>
              En Sigma Games, la privacidad de nuestros usuarios es prioritaria. Recopilamos información necesaria para el funcionamiento del servicio:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Datos de Cuenta:</strong> Email, nombre de usuario y avatar proporcionados mediante Firebase Auth o Google OAuth.</li>
              <li><strong>Datos de Uso:</strong> Historial de juegos recientes, favoritos y estadísticas de tiempo de juego.</li>
              <li><strong>Información Técnica:</strong> Dirección IP, tipo de navegador y dispositivo para optimizar la carga de los juegos.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-white">2. Finalidad del Tratamiento</h2>
            </div>
            <p>
              Los datos se utilizan exclusivamente para:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Sincronizar el progreso de tus juegos en múltiples dispositivos mediante Firebase Realtime Database.</li>
              <li>Personalizar el catálogo de juegos según tus preferencias.</li>
              <li>Mantener el chat global y las interacciones comunitarias.</li>
              <li>Mostrar publicidad relevante mediante socios publicitarios (Google AdSense).</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-white">3. Seguridad y Almacenamiento</h2>
            </div>
            <p>
              Toda tu información está protegida bajo los estándares de seguridad de Google Cloud Platform. Utilizamos cifrado SSL en todas las comunicaciones y no vendemos tus datos personales a terceros bajo ninguna circunstancia.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Bell className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-white">4. Derechos del Usuario</h2>
            </div>
            <p>
              Tienes derecho a acceder, rectificar o eliminar tus datos en cualquier momento. Puedes solicitar la eliminación de tu cuenta enviando un correo a soporte@sigma-games.com o desde la configuración de tu perfil.
            </p>
          </section>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-sm italic">
              Al utilizar Sigma Games, aceptas los términos de esta Política de Privacidad. Nos reservamos el derecho de actualizar este documento para reflejar cambios en nuestras prácticas o por requisitos legales.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

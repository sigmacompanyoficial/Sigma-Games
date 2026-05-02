"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, Gamepad2, AlertCircle, User, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { user, loading, loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setIsSubmitting(true);
    
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        if (!name.trim()) {
          setErrorMsg("Por favor, ingresa tu nombre.");
          setIsSubmitting(false);
          return;
        }
        await registerWithEmail(email, password, name);
        setSuccessMsg("¡Registro exitoso! Por favor verifica tu correo para continuar.");
        setIsLogin(true); // switch to login mode after register
      }
    } catch (err: any) {
      let msg = "Ocurrió un error. Verifica tus credenciales.";
      if (err.code === "auth/email-already-in-use") msg = "Este correo ya está registrado.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") msg = "Correo o contraseña incorrectos.";
      if (err.code === "auth/weak-password") msg = "La contraseña debe tener al menos 6 caracteres.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (!email) {
      setErrorMsg("Por favor, ingresa tu correo para recuperar la contraseña.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setSuccessMsg("¡Correo de recuperación enviado! Revisa tu bandeja de entrada.");
      setIsResetMode(false);
    } catch (err: any) {
      setErrorMsg("No pudimos enviar el correo. Verifica que la dirección sea correcta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await loginWithGoogle();
    } catch (err) {
      setErrorMsg("Ocurrió un error con Google.");
    }
  };

  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background relative flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6">
          <ArrowLeft size={18} />
          <span>Volver al inicio</span>
        </Link>

        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_rgba(30,144,255,0.15)]">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center shadow-lg mb-4">
              <Gamepad2 className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isResetMode ? "Recupera tu contraseña" : isLogin ? "Bienvenido de nuevo" : "Crea tu cuenta"}
            </h1>
            <p className="text-white/60">
              {isResetMode 
                ? "Ingresa tu correo y te enviaremos un enlace"
                : isLogin 
                  ? "Inicia sesión para continuar tu aventura" 
                  : "Regístrate para guardar tus juegos favoritos"}
            </p>
          </div>

          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl flex items-center gap-2 mb-6 text-sm"
            >
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-xl flex items-center gap-2 mb-6 text-sm"
            >
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {isResetMode ? (
            <form onSubmit={handleResetPassword} className="space-y-4 mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white/10 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-primary hover:bg-blue-600 active:scale-[0.98] text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(30,144,255,0.4)] hover:shadow-[0_0_30px_rgba(30,144,255,0.6)] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Enviar enlace de recuperación"
                )}
              </button>

              <p className="text-center text-sm text-white/50 mt-4">
                <button 
                  type="button"
                  onClick={() => {
                    setIsResetMode(false);
                    setErrorMsg("");
                  }} 
                  className="text-primary hover:underline font-medium"
                >
                  Volver al inicio de sesión
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre (Ej: Jugador Pro)"
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white/10 transition-all"
                  />
                </motion.div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white/10 transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white/10 transition-all"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsResetMode(true);
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="text-xs text-white/40 hover:text-white transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-primary hover:bg-blue-600 active:scale-[0.98] text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(30,144,255,0.4)] hover:shadow-[0_0_30px_rgba(30,144,255,0.6)] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  isLogin ? "Iniciar Sesión" : "Registrarse"
                )}
              </button>
            </form>
          )}

          {!isResetMode && (
            <>
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative px-4 bg-transparent backdrop-blur-3xl text-sm text-white/40">O continúa con</div>
              </div>

              <button
                onClick={handleGoogleAuth}
                type="button"
                className="w-full py-3 px-4 bg-white hover:bg-gray-100 active:scale-[0.98] text-gray-900 rounded-xl font-bold transition-all flex items-center justify-center gap-3 mb-6"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.8 15.71 17.58V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                  <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.58C14.73 18.24 13.48 18.63 12 18.63C9.14 18.63 6.71 16.7 5.83 14.12H2.15V16.98C3.96 20.58 7.68 23 12 23Z" fill="#34A853"/>
                  <path d="M5.83 14.12C5.61 13.46 5.48 12.75 5.48 12C5.48 11.25 5.61 10.54 5.83 9.88V7.02H2.15C1.41 8.5 1 10.2 1 12C1 13.8 1.41 15.5 2.15 16.98L5.83 14.12Z" fill="#FBBC05"/>
                  <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.03L19.35 3.89C17.46 2.12 14.97 1 12 1C7.68 1 3.96 3.42 2.15 7.02L5.83 9.88C6.71 7.3 9.14 5.38 12 5.38Z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              <p className="text-center text-sm text-white/50">
                {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
                <button 
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrorMsg("");
                    setSuccessMsg("");
                  }} 
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? "Regístrate" : "Inicia Sesión"}
                </button>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </main>
  );
}

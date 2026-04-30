"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { ref, push, onValue, serverTimestamp } from "firebase/database";
import { db } from "@/lib/firebase";

interface ChatMessage {
  id: string;
  text: string;
  email: string;
  timestamp: number;
}

export default function GlobalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const chatRef = ref(db, 'global_chat');
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        // Sort by timestamp
        messageList.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messageList);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const showPremiumMessage = () => {
    setToastMessage("inicia sesion para usar ociones premium");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showPremiumMessage();
      return;
    }
    
    if (!newMessage.trim()) return;

    const chatRef = ref(db, 'global_chat');
    await push(chatRef, {
      text: newMessage,
      email: user.email || 'Usuario',
      uid: user.uid,
      timestamp: serverTimestamp()
    });

    setNewMessage("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 z-50 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[60vh] bg-background border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                Chat Global
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
              {messages.length === 0 ? (
                <div className="text-center text-white/40 mt-10">
                  No hay mensajes aún. ¡Sé el primero!
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = user?.email === msg.email;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[10px] text-white/40 mb-1 px-1">
                        {msg.email.split('@')[0]}
                      </span>
                      <div
                        className={`px-3 py-2 rounded-2xl max-w-[80%] break-words text-sm ${
                          isMe
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : 'bg-white/10 text-foreground rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
              
              {/* Toast for unauthenticated users */}
              <AnimatePresence>
                {toastMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-red-500/90 text-white text-xs py-2 px-3 rounded-lg shadow-lg text-center flex items-center justify-center gap-2 backdrop-blur-sm"
                  >
                    <Lock className="w-3 h-3 flex-shrink-0" />
                    <span>{toastMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input area */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-white/10 bg-black/40 backdrop-blur-md flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    if (user) {
                      setNewMessage(e.target.value);
                    } else {
                      showPremiumMessage();
                    }
                  }}
                  onClick={() => {
                    if (!user) showPremiumMessage();
                  }}
                  readOnly={!user}
                  placeholder={user ? "Escribe un mensaje..." : "Solo usuarios registrados"}
                  className={`w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/30 ${!user ? 'cursor-not-allowed opacity-50' : ''}`}
                />
              </div>
              <button
                type={user ? "submit" : "button"}
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    showPremiumMessage();
                  }
                }}
                className={`p-2 rounded-full bg-primary text-primary-foreground transition-colors flex-shrink-0 ${!user ? 'opacity-50 cursor-not-allowed hover:bg-primary' : 'hover:bg-primary/90'}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

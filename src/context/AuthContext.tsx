"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { ref, set, get, child, update } from "firebase/database";
import { Game } from "@/data/games";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  favorites: string[];
  recentGames: string[];
  toggleFavorite: (gameId: string) => Promise<void>;
  addRecentGame: (gameId: string) => Promise<void>;
  saveGameData: (gameId: string, data: any) => Promise<void>;
  loadGameData: (gameId: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentGames, setRecentGames] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load user data from DB
        const dbRef = ref(db);
        try {
          const snapshot = await get(child(dbRef, `users/${currentUser.uid}`));
          if (snapshot.exists()) {
            const data = snapshot.val();
            setFavorites(data.favorites || []);
            setRecentGames(data.recentGames || []);
          } else {
            // Initialize empty arrays for new user
            await set(ref(db, `users/${currentUser.uid}`), {
              favorites: [],
              recentGames: []
            });
            setFavorites([]);
            setRecentGames([]);
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      } else {
        setFavorites([]);
        setRecentGames([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  }, []);

  const loginWithEmail = useCallback(async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Error signing in with Email", error);
      throw error;
    }
  }, []);

  const registerWithEmail = useCallback(async (email: string, pass: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Error registering with Email", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  }, []);

  const toggleFavorite = useCallback(async (gameId: string) => {
    if (!user) return;
    const newFavorites = favorites.includes(gameId)
      ? favorites.filter((id) => id !== gameId)
      : [...favorites, gameId];
      
    setFavorites(newFavorites);
    await update(ref(db, `users/${user.uid}`), {
      favorites: newFavorites
    });
  }, [user, favorites]);

  const addRecentGame = useCallback(async (gameId: string) => {
    if (!user) return;
    if (recentGames[0] === gameId) return; // Prevent infinite loop and unnecessary updates
    const newRecents = [gameId, ...recentGames.filter((id) => id !== gameId)].slice(0, 10);
    setRecentGames(newRecents);
    await update(ref(db, `users/${user.uid}`), {
      recentGames: newRecents
    });
  }, [user, recentGames]);

  const saveGameData = useCallback(async (gameId: string, data: any) => {
    if (!user) return;
    await set(ref(db, `users/${user.uid}/games/${gameId}`), data);
  }, [user]);

  const loadGameData = useCallback(async (gameId: string) => {
    if (!user) return null;
    const snapshot = await get(child(ref(db), `users/${user.uid}/games/${gameId}`));
    return snapshot.exists() ? snapshot.val() : null;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithEmail, registerWithEmail, logout, favorites, recentGames, toggleFavorite, addRecentGame, saveGameData, loadGameData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

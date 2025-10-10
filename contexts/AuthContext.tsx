'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import api from '@/lib/api';

interface UserProfile {
  subscriptionPlan: 'free' | 'pro' | 'team';
  subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'trialing';
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (idToken: string) => {
    try {
      const response = await api.get('/users/profile', {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      if (response.data.success) {
        setUserProfile({
          subscriptionPlan: response.data.data.user.subscriptionPlan || 'free',
          subscriptionStatus: response.data.data.user.subscriptionStatus,
        });
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUserProfile({ subscriptionPlan: 'free' });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Sync with backend
        try {
          const idToken = await firebaseUser.getIdToken();
          localStorage.setItem('authToken', idToken);
          await api.post('/auth/verify', { idToken });
          setUser(firebaseUser);
          await fetchUserProfile(idToken);
        } catch (error) {
          console.error('Failed to sync user with backend:', error);
        }
      } else {
        localStorage.removeItem('authToken');
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    localStorage.setItem('authToken', idToken);
    await api.post('/auth/verify', { idToken });
  };

  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    localStorage.setItem('authToken', idToken);
    await api.post('/auth/verify', { idToken });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const idToken = await userCredential.user.getIdToken();
    localStorage.setItem('authToken', idToken);
    await api.post('/auth/verify', { idToken });
  };

  const signOut = async () => {
    try {
      const idToken = await user?.getIdToken();
      if (idToken) {
        await api.post('/auth/signout', {}, {
          headers: { Authorization: `Bearer ${idToken}` }
        });
      }
    } catch (error) {
      console.error('Backend signout failed:', error);
    }
    localStorage.removeItem('authToken');
    await firebaseSignOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const refreshProfile = async () => {
    if (user) {
      const idToken = await user.getIdToken();
      await fetchUserProfile(idToken);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        resetPassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

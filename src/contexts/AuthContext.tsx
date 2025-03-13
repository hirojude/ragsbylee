"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { checkUserRole, UserRole } from "@/lib/firebase/admin";
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  userRole: UserRole | null;
  signInWithPhone: (phoneNumber: string) => Promise<string>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  verifyOTP: (verificationId: string, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const role = await checkUserRole(user.uid);
        setUserRole(role);
        setIsAdmin(role?.isAdmin || false);
      } else {
        setUserRole(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
      });
    }
  };

  const signInWithPhone = async (phoneNumber: string): Promise<string> => {
    try {
      setError(null);
      setupRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      return confirmationResult.verificationId;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const role = await checkUserRole(userCredential.user.uid);
      setUserRole(role);
      setIsAdmin(role?.isAdmin || false);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store user data in Firestore
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        email: userCredential.user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Check if this is the first user
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      
      if (usersSnapshot.size <= 1) { // If this is the first user
        // Make them an admin
        await setUserAsAdmin(userCredential.user.uid);
        setUserRole({ 
          isAdmin: true, 
          role: 'admin', 
          createdAt: new Date(), 
          updatedAt: new Date() 
        });
        setIsAdmin(true);
      } else {
        // Regular user setup
        setUserRole({ 
          isAdmin: false, 
          role: 'user', 
          createdAt: new Date(), 
          updatedAt: new Date() 
        });
        setIsAdmin(false);
      }
      
      return userCredential;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const verifyOTP = async (verificationId: string, otp: string) => {
    try {
      setError(null);
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await auth.signInWithCredential(credential);
      setUser(userCredential.user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
      setUser(null);
      setUserRole(null);
      setIsAdmin(false);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        userRole,
        signInWithPhone,
        signInWithEmail,
        signUpWithEmail,
        verifyOTP,
        signOut,
        error,
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

// Add type declaration for window
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
} 
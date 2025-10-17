import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { auth } from '@/lib/firebase';
import { getUserByFirebaseUid } from '@/lib/db';
import { User, UserRole } from '@shared/schema';

interface AuthContextType {
  firebaseUser: any | null;
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Use compat auth.onAuthStateChanged to match the firebase/compat initialization in firebase.ts
    const unsubscribe = (auth as any).onAuthStateChanged(async (firebaseUser: any) => {
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        // Debug info: show current auth user and uid before Firestore read
        try {
          console.debug('Auth state changed, firebaseUser.uid=', firebaseUser.uid, 'auth.currentUser=', (auth as any).currentUser);
        } catch (e) {
          // ignore
        }

        // Fetch user data from Firestore
        try {
          const userData = await getUserByFirebaseUid(firebaseUser.uid);
          setUser(userData);

          // If the user lands on an auth page or root, redirect them to their role-specific page
          try {
            const path = location || window.location.pathname;
            if (userData && (path === '/' || path.startsWith('/auth'))) {
              const role = (userData as any).role;
              if (role === 'entreprise') setLocation('/entreprise/dashboard');
              else if (role === 'particulier') setLocation('/particulier/dashboard');
              else if (role === 'bureau') setLocation('/bureau/dashboard');
            }
          } catch (e) {
            // ignore routing errors
          }
        } catch (error: any) {
          // Surface code/message to console to help debug permissions
          console.error('Error fetching user data:', error?.code ?? error, error?.message ?? error);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

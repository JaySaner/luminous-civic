import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, testConnection } from './firebase';

interface FirebaseContextType {
  user: FirebaseUser | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({ user: null, loading: true });

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Test connection on boot
    testConnection();

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, loading }}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
};

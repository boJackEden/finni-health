import { ReactNode, createContext, useEffect, useState } from 'react';
import { auth } from '../Configs/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth'; // Import the User type from firebase/auth

type AuthContextType = {
  user: User | undefined,
  setUser: (user: User) => void,
  loading: boolean
}

const InitialAuthContext = {
  user: undefined,
  setUser: () => {},
  loading: true
}

export const AuthContext = createContext<AuthContextType>(InitialAuthContext); 

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {loading === false && children}
    </AuthContext.Provider>
  );

};
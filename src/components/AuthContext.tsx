import React from 'react';
import app from '@/config/firebase';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = React.createContext({});

export const AuthProvider = (props: any) => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [pending, setPending] = React.useState(true);

  const auth = getAuth(app);

  React.useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setPending(false);
    })
  }, []);

  if(pending) {
    return (
      <>
        Loading...
      </>
    )
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {props.children}
      </AuthContext.Provider>
    )
  }
}
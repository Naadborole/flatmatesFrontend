import React, { useEffect, useState } from "react";
import app from "./firebase";
import {ReactComponent as ReactLogo} from './assets/img/loading.svg';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
        <ReactLogo  Style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
      }}/>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

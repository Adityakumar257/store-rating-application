// 📁 src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, getRole, getUser } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(getRole());
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
  const [user, setUserInfo] = useState(getUser());

  useEffect(() => {
    setRole(getRole());
    setIsLoggedIn(!!getToken());
    setUserInfo(getUser());
  }, []);

  return (
    <AuthContext.Provider value={{ role, isLoggedIn, user, setRole, setIsLoggedIn, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

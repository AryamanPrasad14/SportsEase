// auth-context.js
import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const res = await axios.get(`http://localhost:5000/api/users/${firebaseUser.uid}`);
          const userData = {
            id: firebaseUser.uid,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setCurrentUser(userData);
        } catch (err) {
          console.error("Failed to fetch user from backend", err);
        }
      } else {
        localStorage.removeItem("user");
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

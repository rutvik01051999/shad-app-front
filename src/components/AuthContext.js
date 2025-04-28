import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch("http://127.0.0.1:8000/api/status/auth", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, checkUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

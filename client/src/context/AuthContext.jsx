import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingEmail, setPendingEmail] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("productr_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (data) => {
    setUser(data);
    localStorage.setItem("productr_user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("productr_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, pendingEmail, setPendingEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
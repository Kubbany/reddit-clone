/* eslint-disable no-useless-catch */
import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setUser({ token });
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.token);
      setToken(res.token);
      setUser({ token: res.token });
      return res;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

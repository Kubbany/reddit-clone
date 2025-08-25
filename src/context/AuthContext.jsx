import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/api.js" ;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    
    useEffect(() => {
        if(token)
        {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await loginUser({email, password});
        setToken(res.access_token);
        setUser(res.user);
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("user", JSON.stringify(res.user));

        
    }

     const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { loginUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    Cookies.set("token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

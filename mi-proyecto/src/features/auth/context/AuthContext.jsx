import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { loginUser, logoutUser, getProfile } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [loading, setLoading] = useState(true);

  // Validar token y obtener perfil al cargar la app
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = Cookies.get("token");
      
      if (storedToken) {
        try {
          const profileData = await getProfile();
          setUser(profileData);
          setToken(storedToken);
        } catch (error) {
          console.error("Token inválido:", error);
          Cookies.remove("token");
          setToken(null);
          setUser(null);
        }
      }
      
      setLoading(false);
    };

    validateToken();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      Cookies.set("token", data.token, { expires: 7 }); // Expira en 7 días
      setToken(data.token);
      
      // Obtener perfil después del login
      const profileData = await getProfile();
      setUser(profileData);
      
      return { success: true, data };
    } catch (error) {
      console.error("Error en login:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || "Error al iniciar sesión" 
      };
    }
  };

  const logout = async () => {
    try {
      await logoutUser(); // Llamar al backend
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      Cookies.remove("token");
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
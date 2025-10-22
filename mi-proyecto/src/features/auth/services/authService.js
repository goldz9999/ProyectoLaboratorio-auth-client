import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://reflexoperu-v3.marketingmedico.vip/backend/public/api/",
   // Envía cookies automáticamente
});

// Interceptor para agregar el token en cada request
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Login
export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

// Registro
export const registerUser = async (data) => {
  const response = await api.post("/register", data);
  return response.data;
};

// Obtener perfil del usuario autenticado
export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.delete("/logout");
  return response.data;
};

export default api;
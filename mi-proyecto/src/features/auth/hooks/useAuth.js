// features/auth/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx"; // ← Correcto

export const useAuth = () => {
  return useContext(AuthContext);
};
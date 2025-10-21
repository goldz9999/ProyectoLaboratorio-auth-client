// router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login"; // ← Correcto
import Register from "./features/auth/pages/Register"; // ← Correcto  
import Profile from "./features/profile/pages/Profile"; // ← Correcto

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
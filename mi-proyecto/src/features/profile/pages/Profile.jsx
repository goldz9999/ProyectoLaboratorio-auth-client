// features/profile/pages/Profile.jsx
import { useAuth } from "../../auth/hooks/useAuth"; // ← Ruta correcta

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>
      {user ? (
        <>
          <p>Bienvenido, {user.name}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white mt-4 px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>No hay sesión iniciada.</p>
      )}
    </div>
  );
}
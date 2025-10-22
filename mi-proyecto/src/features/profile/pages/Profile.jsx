import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-800">
                  {user.name}
                </h1>
                <p className="text-gray-500">@{user.user_name}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg"
            >
              Cerrar Sesión
            </button>
          </div>

          <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Correo Electrónico
              </h3>
              <p className="text-lg text-gray-800">{user.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Teléfono
              </h3>
              <p className="text-lg text-gray-800">{user.phone || "No disponible"}</p>
            </div>

            {user.role && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Rol</h3>
                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold">
                  {user.role.name}
                </span>
              </div>
            )}

            {user.country && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">País</h3>
                <p className="text-lg text-gray-800">{user.country.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Información de la Cuenta
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700 font-medium">ID de Usuario</span>
              <span className="text-gray-900 font-semibold">{user.id}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700 font-medium">Nombre de Usuario</span>
              <span className="text-gray-900 font-semibold">@{user.user_name}</span>
            </div>

            {/* 👇 Nuevo: nombre y apellidos */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700 font-medium">Nombre</span>
              <span className="text-gray-900 font-semibold">{user.first_name || user.name || "No disponible"}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700 font-medium">Apellidos</span>
              <span className="text-gray-900 font-semibold">{user.last_ || "No disponible"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

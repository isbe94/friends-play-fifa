import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";

// Importa los nuevos componentes
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

// Componente para proteger rutas (solo accesibles si está logueado)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Componente para redirigir si ya está logueado
const RedirectIfLoggedIn: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* Rutas públicas (sin la barra lateral) */}
      <Route
        path="/login"
        element={
          <RedirectIfLoggedIn>
            <Login />
          </RedirectIfLoggedIn>
        }
      />

      {/* Rutas protegidas que usarán el Layout con la barra lateral */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Estas son las páginas que se renderizarán dentro del <Outlet> de Layout */}
        <Route index element={<Dashboard />} />
        <Route path="perfil" element={<div>Perfil Page</div>} />
        <Route path="tournaments" element={<div>Torneos Page</div>} />
        <Route path="matches" element={<div>Partidos Page</div>} />
        <Route path="statistics" element={<div>Estadísticas Page</div>} />
        {/* Añade aquí la ruta de calendario si la tienes */}
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* (Opcional) Una ruta "catch-all" para redirigir si no se encuentra la página */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;

import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}; 
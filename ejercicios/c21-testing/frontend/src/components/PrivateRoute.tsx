import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import type { Rol } from '../types/sesionType';
import Spinner from 'react-bootstrap/Spinner';

export function PrivateRoute({ rol }: { rol?: Rol }) {
  const { usuario, cargando } = useAuth();

  if (cargando) return <Spinner animation="border" />;

  if (!usuario) return <Navigate to="/login" replace />;

  if (rol && usuario.rol !== rol) return <Navigate to="/sin-permiso" replace />;

  return <Outlet />;
}
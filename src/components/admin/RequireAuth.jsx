import { Navigate, useLocation } from 'react-router-dom'
import { haySesion } from '../../utils/adminAuth'

// Protege las rutas del panel: si no hay sesión activa, redirige al login.
export default function RequireAuth({ children }) {
  const location = useLocation()
  if (!haySesion()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return children
}

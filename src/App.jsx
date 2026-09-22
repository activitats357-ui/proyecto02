import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import Equipo from './pages/Equipo'
import Contacto from './pages/Contacto'
import Consultas from './pages/Consultas'
import Privacidad from './pages/Privacidad'
import AvisoLegal from './pages/AvisoLegal'
import NoEncontrado from './pages/NoEncontrado'
import RequireAuth from './components/admin/RequireAuth'
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminCitas from './pages/admin/AdminCitas'
import AdminHorarios from './pages/admin/AdminHorarios'
import AdminServicios from './pages/admin/AdminServicios'
import AdminProfesionales from './pages/admin/AdminProfesionales'
import AdminPortada from './pages/admin/AdminPortada'
import AdminPrivacidad from './pages/admin/AdminPrivacidad'
import AdminUsuarios from './pages/admin/AdminUsuarios'

export default function App() {
  return (
    <Routes>
      {/* Web pública */}
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>

      {/* Panel de administración */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<AdminCitas />} />
        <Route path="horarios" element={<AdminHorarios />} />
        <Route path="servicios" element={<AdminServicios />} />
        <Route path="profesionales" element={<AdminProfesionales />} />
        <Route path="portada" element={<AdminPortada />} />
        <Route path="privacidad" element={<AdminPrivacidad />} />
        <Route path="cuentas" element={<AdminUsuarios />} />
      </Route>
    </Routes>
  )
}

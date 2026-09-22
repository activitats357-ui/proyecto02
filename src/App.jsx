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

export default function App() {
  return (
    <Routes>
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
    </Routes>
  )
}

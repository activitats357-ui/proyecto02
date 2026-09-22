// Funciones reutilizables para gestionar las solicitudes/consultas en
// localStorage. No se utiliza ninguna base de datos ni backend: toda la
// información permanece exclusivamente en el navegador del usuario.
export const CONSULTAS_KEY = 'fisioterapia_consultas'

function generarId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `consulta-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function obtenerConsultas() {
  if (typeof window === 'undefined') return []
  try {
    const item = window.localStorage.getItem(CONSULTAS_KEY)
    const consultas = item ? JSON.parse(item) : []
    if (!Array.isArray(consultas)) return []
    return consultas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } catch (error) {
    console.warn('No se pudieron leer las consultas guardadas.', error)
    return []
  }
}

export function crearConsulta(datos) {
  const consultas = obtenerConsultas()
  const nuevaConsulta = {
    id: generarId(),
    createdAt: new Date().toISOString(),
    nombre: datos.nombre,
    telefono: datos.telefono,
    email: datos.email,
    tipoSolicitud: datos.tipoSolicitud,
    tratamiento: datos.tratamiento,
    fechaPreferida: datos.fechaPreferida,
    horarioPreferido: datos.horarioPreferido,
    mensaje: datos.mensaje || '',
  }
  const actualizadas = [nuevaConsulta, ...consultas]
  guardarConsultas(actualizadas)
  return nuevaConsulta
}

export function eliminarConsulta(id) {
  const consultas = obtenerConsultas().filter((consulta) => consulta.id !== id)
  guardarConsultas(consultas)
  return consultas
}

export function eliminarTodasLasConsultas() {
  guardarConsultas([])
  return []
}

function guardarConsultas(consultas) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CONSULTAS_KEY, JSON.stringify(consultas))
  } catch (error) {
    console.warn('No se pudieron guardar las consultas.', error)
  }
}

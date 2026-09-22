// Capa de contenido editable sobre localStorage. Los valores por defecto
// provienen de los archivos de `src/data`; cuando el panel de administración
// guarda cambios, se persiste una copia completa en localStorage y las páginas
// públicas leen de aquí.
//
// NOTA: es una solución provisional. Toda la información vive únicamente en el
// navegador. Cuando se conecte un backend (Supabase), esta capa se sustituirá
// por llamadas a la base de datos manteniendo la misma interfaz de funciones.
import { servicios as serviciosDefault } from '../data/servicios'
import { profesionales as profesionalesDefault } from '../data/profesionales'
import { horarios as horariosDefault } from '../data/centro'

export const CONTENIDO_KEY = 'fisioterapia_contenido'
export const EVENTO_CONTENIDO = 'contenido-actualizado'

function clonar(valor) {
  return JSON.parse(JSON.stringify(valor))
}

function contenidoPorDefecto() {
  return {
    servicios: clonar(serviciosDefault),
    profesionales: clonar(profesionalesDefault),
    horarios: clonar(horariosDefault),
  }
}

// Lee el contenido persistido y lo combina con los valores por defecto, de
// forma que si en el futuro se añaden claves nuevas no se pierdan.
function leerContenido() {
  const base = contenidoPorDefecto()
  if (typeof window === 'undefined') return base
  try {
    const item = window.localStorage.getItem(CONTENIDO_KEY)
    if (!item) return base
    const guardado = JSON.parse(item)
    return {
      servicios: Array.isArray(guardado.servicios) ? guardado.servicios : base.servicios,
      profesionales: Array.isArray(guardado.profesionales) ? guardado.profesionales : base.profesionales,
      horarios: Array.isArray(guardado.horarios) ? guardado.horarios : base.horarios,
    }
  } catch (error) {
    console.warn('No se pudo leer el contenido guardado; se usan los valores por defecto.', error)
    return base
  }
}

function guardarContenido(contenido) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CONTENIDO_KEY, JSON.stringify(contenido))
    window.dispatchEvent(new Event(EVENTO_CONTENIDO))
  } catch (error) {
    console.warn('No se pudo guardar el contenido.', error)
  }
}

export function obtenerContenido() {
  return leerContenido()
}

export function obtenerServicios() {
  return leerContenido().servicios
}

export function obtenerProfesionales() {
  return leerContenido().profesionales
}

export function obtenerHorarios() {
  return leerContenido().horarios
}

export function guardarServicios(servicios) {
  const contenido = leerContenido()
  contenido.servicios = servicios
  guardarContenido(contenido)
  return servicios
}

export function guardarProfesionales(profesionales) {
  const contenido = leerContenido()
  contenido.profesionales = profesionales
  guardarContenido(contenido)
  return profesionales
}

export function guardarHorarios(horarios) {
  const contenido = leerContenido()
  contenido.horarios = horarios
  guardarContenido(contenido)
  return horarios
}

// Restablece TODO el contenido a los valores por defecto del código.
export function restablecerContenido() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(CONTENIDO_KEY)
    window.dispatchEvent(new Event(EVENTO_CONTENIDO))
  } catch (error) {
    console.warn('No se pudo restablecer el contenido.', error)
  }
}

export function generarId(prefijo = 'item') {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefijo}-${crypto.randomUUID()}`
  }
  return `${prefijo}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

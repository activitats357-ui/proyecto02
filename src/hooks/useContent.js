// Hook que expone el contenido editable (servicios, profesionales, horarios)
// y se re-renderiza automáticamente cuando el panel de administración guarda
// cambios o cuando cambia el localStorage en otra pestaña.
import { useSyncExternalStore } from 'react'
import {
  CONTENIDO_KEY,
  EVENTO_CONTENIDO,
  obtenerContenido,
} from '../utils/contentStore'

function suscribir(callback) {
  if (typeof window === 'undefined') return () => {}
  const alCambiarStorage = (evento) => {
    if (!evento || evento.key === null || evento.key === CONTENIDO_KEY) callback()
  }
  window.addEventListener(EVENTO_CONTENIDO, callback)
  window.addEventListener('storage', alCambiarStorage)
  return () => {
    window.removeEventListener(EVENTO_CONTENIDO, callback)
    window.removeEventListener('storage', alCambiarStorage)
  }
}

// Cache para devolver una referencia estable mientras el contenido no cambie
// (requisito de useSyncExternalStore para evitar renders infinitos).
let cacheRaw = null
let cacheValor = null

function leerSnapshot() {
  const raw = typeof window !== 'undefined' ? window.localStorage.getItem(CONTENIDO_KEY) : null
  if (raw !== cacheRaw || cacheValor === null) {
    cacheRaw = raw
    cacheValor = obtenerContenido()
  }
  return cacheValor
}

export function useContent() {
  return useSyncExternalStore(suscribir, leerSnapshot, leerSnapshot)
}

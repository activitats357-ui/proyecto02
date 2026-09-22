import { useEffect, useState, useCallback } from 'react'

/**
 * Hook genérico de persistencia en localStorage.
 * Sincroniza el estado de React con una clave de localStorage y mantiene
 * la sincronía entre pestañas mediante el evento "storage".
 */
export function useLocalStorage(key, valorInicial) {
  const [valor, setValor] = useState(() => leerStorage(key, valorInicial))

  const guardar = useCallback(
    (nuevoValor) => {
      setValor((valorPrevio) => {
        const valorAGuardar =
          typeof nuevoValor === 'function' ? nuevoValor(valorPrevio) : nuevoValor
        escribirStorage(key, valorAGuardar)
        return valorAGuardar
      })
    },
    [key],
  )

  useEffect(() => {
    const alCambiarStorage = (evento) => {
      if (evento.key === key) {
        setValor(leerStorage(key, valorInicial))
      }
    }
    window.addEventListener('storage', alCambiarStorage)
    return () => window.removeEventListener('storage', alCambiarStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [valor, guardar]
}

function leerStorage(key, valorInicial) {
  if (typeof window === 'undefined') return valorInicial
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : valorInicial
  } catch (error) {
    console.warn(`No se pudo leer la clave "${key}" de localStorage.`, error)
    return valorInicial
  }
}

function escribirStorage(key, valor) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(valor))
  } catch (error) {
    console.warn(`No se pudo escribir la clave "${key}" en localStorage.`, error)
  }
}

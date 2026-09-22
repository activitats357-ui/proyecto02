// Autenticación PROVISIONAL del panel de administración basada en localStorage.
//
// ⚠️ IMPORTANTE: esto NO es seguridad real. Al ser una aplicación estática sin
// backend, cualquier persona con conocimientos técnicos puede saltarse este
// control. Sirve únicamente para evitar el acceso casual mientras no se conecta
// un backend real (Supabase), que gestionará la autenticación de forma segura y
// la recuperación de contraseña por correo. La contraseña se guarda "hasheada"
// con una función simple, no criptográficamente segura.

export const CRED_KEY = 'fisioterapia_admin_cred'
export const SESION_KEY = 'fisioterapia_admin_sesion'

// Credenciales por defecto en la primera ejecución. Deben cambiarse desde el
// panel (sección "Cuenta") tras el primer acceso.
export const USUARIO_POR_DEFECTO = 'admin'
export const PASSWORD_POR_DEFECTO = 'admin1234'

// Hash simple (djb2). No es seguro; solo ofusca la contraseña en localStorage.
function hashSimple(texto) {
  let hash = 5381
  for (let i = 0; i < texto.length; i += 1) {
    hash = (hash * 33) ^ texto.charCodeAt(i)
  }
  // Se convierte a hexadecimal sin signo.
  return (hash >>> 0).toString(16)
}

function leerCredencial() {
  if (typeof window === 'undefined') return null
  try {
    const item = window.localStorage.getItem(CRED_KEY)
    if (!item) return null
    return JSON.parse(item)
  } catch {
    return null
  }
}

function escribirCredencial(cred) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CRED_KEY, JSON.stringify(cred))
}

// Devuelve la credencial vigente (la guardada o la de por defecto).
function credencialVigente() {
  const guardada = leerCredencial()
  if (guardada && guardada.usuario && guardada.hash) return guardada
  return {
    usuario: USUARIO_POR_DEFECTO,
    hash: hashSimple(PASSWORD_POR_DEFECTO),
    email: '',
    porDefecto: true,
  }
}

export function estaUsandoCredencialPorDefecto() {
  const guardada = leerCredencial()
  return !(guardada && guardada.usuario && guardada.hash)
}

export function obtenerDatosCuenta() {
  const cred = credencialVigente()
  return { usuario: cred.usuario, email: cred.email || '', porDefecto: Boolean(cred.porDefecto) }
}

export function iniciarSesion(usuario, password) {
  const cred = credencialVigente()
  const usuarioOk = (usuario || '').trim().toLowerCase() === cred.usuario.toLowerCase()
  const passwordOk = hashSimple(password || '') === cred.hash
  if (usuarioOk && passwordOk) {
    try {
      window.sessionStorage.setItem(SESION_KEY, String(Date.now()))
    } catch {
      /* sessionStorage puede fallar en modo privado; la sesión será efímera */
    }
    return { ok: true }
  }
  return { ok: false, error: 'Usuario o contraseña incorrectos.' }
}

export function cerrarSesion() {
  try {
    window.sessionStorage.removeItem(SESION_KEY)
  } catch {
    /* ignore */
  }
}

export function haySesion() {
  if (typeof window === 'undefined') return false
  try {
    return Boolean(window.sessionStorage.getItem(SESION_KEY))
  } catch {
    return false
  }
}

// Cambia usuario, contraseña y/o correo de recuperación. Requiere la contraseña
// actual como comprobación mínima.
export function cambiarCredencial({ passwordActual, nuevoUsuario, nuevoPassword, email }) {
  const cred = credencialVigente()
  if (hashSimple(passwordActual || '') !== cred.hash) {
    return { ok: false, error: 'La contraseña actual no es correcta.' }
  }
  const usuarioFinal = (nuevoUsuario || cred.usuario).trim()
  if (usuarioFinal.length < 3) {
    return { ok: false, error: 'El usuario debe tener al menos 3 caracteres.' }
  }
  if (nuevoPassword && nuevoPassword.length < 8) {
    return { ok: false, error: 'La nueva contraseña debe tener al menos 8 caracteres.' }
  }
  const nuevaCred = {
    usuario: usuarioFinal,
    hash: nuevoPassword ? hashSimple(nuevoPassword) : cred.hash,
    email: email !== undefined ? email.trim() : cred.email || '',
  }
  escribirCredencial(nuevaCred)
  return { ok: true }
}

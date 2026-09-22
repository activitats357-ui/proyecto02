// Autenticación PROVISIONAL del panel de administración basada en localStorage,
// con soporte para MÚLTIPLES cuentas de usuario.
//
// ⚠️ IMPORTANTE: esto NO es seguridad real. Al ser una aplicación estática sin
// backend, cualquier persona con conocimientos técnicos puede saltarse este
// control y leer los datos. Sirve para evitar el acceso casual mientras no se
// conecta un backend real (Supabase), que gestionará la autenticación de forma
// segura y la recuperación de contraseña por correo. Las contraseñas se guardan
// "hasheadas" con una función simple, no criptográficamente segura.

export const USUARIOS_KEY = 'fisioterapia_admin_usuarios'
export const SESION_KEY = 'fisioterapia_admin_sesion'
const LEGACY_CRED_KEY = 'fisioterapia_admin_cred'

// Cuenta inicial en la primera ejecución. Debe cambiarse tras el primer acceso.
export const USUARIO_POR_DEFECTO = 'admin'
export const PASSWORD_POR_DEFECTO = 'admin1234'

// Hash simple (djb2). No es seguro; solo ofusca la contraseña en localStorage.
function hashSimple(texto) {
  let hash = 5381
  for (let i = 0; i < texto.length; i += 1) {
    hash = (hash * 33) ^ texto.charCodeAt(i)
  }
  return (hash >>> 0).toString(16)
}

function nuevoId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return `user-${crypto.randomUUID()}`
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function leerCrudo() {
  if (typeof window === 'undefined') return null
  try {
    const item = window.localStorage.getItem(USUARIOS_KEY)
    if (!item) return null
    const datos = JSON.parse(item)
    return Array.isArray(datos) ? datos : null
  } catch {
    return null
  }
}

function persistir(usuarios) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios))
}

// Garantiza que exista al menos una cuenta: migra la credencial antigua de un
// solo usuario si la hubiera, o crea la cuenta por defecto.
function asegurarUsuarios() {
  const existentes = leerCrudo()
  if (existentes && existentes.length) return existentes

  let usuarios
  let legacy = null
  if (typeof window !== 'undefined') {
    try {
      const item = window.localStorage.getItem(LEGACY_CRED_KEY)
      if (item) legacy = JSON.parse(item)
    } catch {
      legacy = null
    }
  }

  if (legacy && legacy.usuario && legacy.hash) {
    usuarios = [
      { id: nuevoId(), usuario: legacy.usuario, hash: legacy.hash, email: legacy.email || '', creadoEn: new Date().toISOString() },
    ]
  } else {
    usuarios = [
      { id: nuevoId(), usuario: USUARIO_POR_DEFECTO, hash: hashSimple(PASSWORD_POR_DEFECTO), email: '', creadoEn: new Date().toISOString() },
    ]
  }
  persistir(usuarios)
  return usuarios
}

function normalizar(nombre) {
  return (nombre || '').trim().toLowerCase()
}

// --- API pública ---

export function listarUsuarios() {
  return asegurarUsuarios().map(({ id, usuario, email, creadoEn }) => ({ id, usuario, email: email || '', creadoEn }))
}

export function iniciarSesion(usuario, password) {
  const usuarios = asegurarUsuarios()
  const encontrado = usuarios.find((u) => normalizar(u.usuario) === normalizar(usuario))
  if (!encontrado || encontrado.hash !== hashSimple(password || '')) {
    return { ok: false, error: 'Usuario o contraseña incorrectos.' }
  }
  try {
    window.sessionStorage.setItem(SESION_KEY, JSON.stringify({ id: encontrado.id, usuario: encontrado.usuario }))
  } catch {
    /* sessionStorage puede fallar en modo privado; la sesión será efímera */
  }
  return { ok: true }
}

export function cerrarSesion() {
  try {
    window.sessionStorage.removeItem(SESION_KEY)
  } catch {
    /* ignore */
  }
}

export function obtenerSesion() {
  if (typeof window === 'undefined') return null
  try {
    const item = window.sessionStorage.getItem(SESION_KEY)
    return item ? JSON.parse(item) : null
  } catch {
    return null
  }
}

export function haySesion() {
  return Boolean(obtenerSesion())
}

export function obtenerUsuarioActual() {
  const sesion = obtenerSesion()
  if (!sesion) return null
  const usuario = asegurarUsuarios().find((u) => u.id === sesion.id)
  if (!usuario) return { id: sesion.id, usuario: sesion.usuario, email: '' }
  return { id: usuario.id, usuario: usuario.usuario, email: usuario.email || '' }
}

// Validación básica de correo electrónico.
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function crearUsuario({ usuario, password, email }) {
  const usuarios = asegurarUsuarios()
  const nombre = (usuario || '').trim()
  const correo = (email || '').trim()
  if (nombre.length < 3) return { ok: false, error: 'El usuario debe tener al menos 3 caracteres.' }
  if (!correo) return { ok: false, error: 'El correo es obligatorio.' }
  if (!REGEX_EMAIL.test(correo)) return { ok: false, error: 'Introduce un correo electrónico válido.' }
  if ((password || '').length < 8) return { ok: false, error: 'La contraseña debe tener al menos 8 caracteres.' }
  if (usuarios.some((u) => normalizar(u.usuario) === normalizar(nombre))) {
    return { ok: false, error: 'Ya existe una cuenta con ese usuario.' }
  }
  const nuevo = { id: nuevoId(), usuario: nombre, hash: hashSimple(password), email: correo, creadoEn: new Date().toISOString() }
  persistir([...usuarios, nuevo])
  return { ok: true }
}

export function eliminarUsuario(id) {
  const usuarios = asegurarUsuarios()
  if (usuarios.length <= 1) return { ok: false, error: 'No se puede eliminar la única cuenta existente.' }
  const sesion = obtenerSesion()
  if (sesion && sesion.id === id) {
    return { ok: false, error: 'No puedes eliminar la cuenta con la que has iniciado sesión.' }
  }
  persistir(usuarios.filter((u) => u.id !== id))
  return { ok: true }
}

export function cambiarPassword(id, nuevoPassword) {
  if ((nuevoPassword || '').length < 8) return { ok: false, error: 'La contraseña debe tener al menos 8 caracteres.' }
  const usuarios = asegurarUsuarios()
  if (!usuarios.some((u) => u.id === id)) return { ok: false, error: 'La cuenta no existe.' }
  persistir(usuarios.map((u) => (u.id === id ? { ...u, hash: hashSimple(nuevoPassword) } : u)))
  return { ok: true }
}

export function actualizarUsuario(id, { usuario, email }) {
  const usuarios = asegurarUsuarios()
  const objetivo = usuarios.find((u) => u.id === id)
  if (!objetivo) return { ok: false, error: 'La cuenta no existe.' }
  const nombre = usuario !== undefined ? usuario.trim() : objetivo.usuario
  if (nombre.length < 3) return { ok: false, error: 'El usuario debe tener al menos 3 caracteres.' }
  if (usuarios.some((u) => u.id !== id && normalizar(u.usuario) === normalizar(nombre))) {
    return { ok: false, error: 'Ya existe otra cuenta con ese usuario.' }
  }
  persistir(
    usuarios.map((u) =>
      u.id === id ? { ...u, usuario: nombre, email: email !== undefined ? email.trim() : u.email } : u,
    ),
  )
  // Si se renombró la cuenta activa, refleja el cambio en la sesión.
  const sesion = obtenerSesion()
  if (sesion && sesion.id === id && sesion.usuario !== nombre) {
    try {
      window.sessionStorage.setItem(SESION_KEY, JSON.stringify({ id, usuario: nombre }))
    } catch {
      /* ignore */
    }
  }
  return { ok: true }
}

// Para el aviso de la pantalla de login: ¿sigue existiendo la cuenta "admin"
// con la contraseña por defecto?
export function estaUsandoCredencialPorDefecto() {
  return asegurarUsuarios().some(
    (u) => normalizar(u.usuario) === USUARIO_POR_DEFECTO && u.hash === hashSimple(PASSWORD_POR_DEFECTO),
  )
}

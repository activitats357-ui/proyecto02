import { useState } from 'react'
import { UserPlus, Trash2, KeyRound, Save, AlertTriangle, ShieldCheck } from 'lucide-react'
import {
  listarUsuarios,
  crearUsuario,
  eliminarUsuario,
  cambiarPassword,
  actualizarUsuario,
  obtenerUsuarioActual,
} from '../../utils/adminAuth'
import { restablecerContenido } from '../../utils/contentStore'

const claseInput =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100'

function FilaCuenta({ cuenta, esActual, onRecargar }) {
  const [usuario, setUsuario] = useState(cuenta.usuario)
  const [email, setEmail] = useState(cuenta.email || '')
  const [mostrarPass, setMostrarPass] = useState(false)
  const [pass1, setPass1] = useState('')
  const [pass2, setPass2] = useState('')
  const [msg, setMsg] = useState(null)

  const guardarDatos = () => {
    const r = actualizarUsuario(cuenta.id, { usuario, email })
    setMsg(r.ok ? { tipo: 'ok', texto: 'Datos guardados.' } : { tipo: 'error', texto: r.error })
    if (r.ok) onRecargar()
  }

  const guardarPass = () => {
    if (pass1 !== pass2) {
      setMsg({ tipo: 'error', texto: 'Las contraseñas no coinciden.' })
      return
    }
    const r = cambiarPassword(cuenta.id, pass1)
    if (r.ok) {
      setMsg({ tipo: 'ok', texto: 'Contraseña actualizada.' })
      setPass1('')
      setPass2('')
      setMostrarPass(false)
    } else {
      setMsg({ tipo: 'error', texto: r.error })
    }
  }

  const borrar = () => {
    if (window.confirm(`¿Eliminar la cuenta "${cuenta.usuario}"?`)) {
      const r = eliminarUsuario(cuenta.id)
      if (r.ok) onRecargar()
      else setMsg({ tipo: 'error', texto: r.error })
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-softer">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="font-bold text-slate-900">{cuenta.usuario}</h3>
        {esActual && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Tu cuenta
          </span>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Usuario</span>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} className={claseInput} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Correo de recuperación
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className={claseInput}
          />
        </label>
      </div>

      {mostrarPass && (
        <div className="mt-4 grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Nueva contraseña
            </span>
            <input
              type="password"
              autoComplete="new-password"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className={claseInput}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Repetir contraseña
            </span>
            <input
              type="password"
              autoComplete="new-password"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              className={claseInput}
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={guardarPass}
              className="rounded-full bg-secondary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary-800"
            >
              Guardar contraseña
            </button>
          </div>
        </div>
      )}

      {msg && (
        <p
          className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium ${
            msg.tipo === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {msg.texto}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={guardarDatos}
          className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Guardar datos
        </button>
        <button
          type="button"
          onClick={() => setMostrarPass((v) => !v)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <KeyRound className="h-4 w-4" aria-hidden="true" />
          Cambiar contraseña
        </button>
        <button
          type="button"
          onClick={borrar}
          disabled={esActual}
          title={esActual ? 'No puedes eliminar tu propia cuenta activa' : undefined}
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(() => listarUsuarios())
  const actual = obtenerUsuarioActual()

  // Alta de nueva cuenta.
  const [nuevoUsuario, setNuevoUsuario] = useState('')
  const [nuevoEmail, setNuevoEmail] = useState('')
  const [nuevoPass, setNuevoPass] = useState('')
  const [altaMsg, setAltaMsg] = useState(null)

  const recargar = () => setUsuarios(listarUsuarios())

  const crear = (evento) => {
    evento.preventDefault()
    const r = crearUsuario({ usuario: nuevoUsuario, password: nuevoPass, email: nuevoEmail })
    if (r.ok) {
      setAltaMsg({ tipo: 'ok', texto: `Cuenta "${nuevoUsuario}" creada.` })
      setNuevoUsuario('')
      setNuevoEmail('')
      setNuevoPass('')
      recargar()
    } else {
      setAltaMsg({ tipo: 'error', texto: r.error })
    }
  }

  const restablecer = () => {
    if (
      window.confirm(
        '¿Restablecer TODO el contenido (especialidades, profesionales, horarios y portada) a los valores originales? Se perderán tus ediciones. Las citas y las cuentas NO se borran.',
      )
    ) {
      restablecerContenido()
      window.alert('Contenido restablecido a los valores originales.')
    }
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Cuentas</h2>
        <p className="text-sm text-slate-500">
          Da de alta o de baja cuentas de acceso al panel y cambia sus contraseñas.
        </p>
      </div>

      {/* Alta */}
      <form
        onSubmit={crear}
        className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-softer"
      >
        <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
          <UserPlus className="h-5 w-5 text-secondary-600" aria-hidden="true" />
          Dar de alta una cuenta
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Usuario <span className="text-red-600">*</span>
            </span>
            <input
              type="text"
              required
              value={nuevoUsuario}
              onChange={(e) => setNuevoUsuario(e.target.value)}
              placeholder="Mínimo 3 caracteres"
              className={claseInput}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Correo <span className="text-red-600">*</span>
            </span>
            <input
              type="email"
              required
              value={nuevoEmail}
              onChange={(e) => setNuevoEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className={claseInput}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contraseña <span className="text-red-600">*</span>
            </span>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={nuevoPass}
              onChange={(e) => setNuevoPass(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className={claseInput}
            />
          </label>
        </div>
        {altaMsg && (
          <p
            className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium ${
              altaMsg.tipo === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {altaMsg.texto}
          </p>
        )}
        <button
          type="submit"
          className="mt-4 flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-950"
        >
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          Crear cuenta
        </button>
      </form>

      {/* Listado */}
      <div className="space-y-4">
        {usuarios.map((cuenta) => (
          <FilaCuenta
            key={cuenta.id}
            cuenta={cuenta}
            esActual={Boolean(actual && actual.id === cuenta.id)}
            onRecargar={recargar}
          />
        ))}
      </div>

      <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
        El correo de recuperación se usará para restablecer la contraseña por correo cuando se conecte
        el backend. De momento no se envía ningún correo.
      </p>

      {/* Zona de riesgo */}
      <div className="mt-8 rounded-2xl border border-red-200 bg-red-50/50 p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-red-700">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          Zona de riesgo
        </h3>
        <p className="mt-1.5 text-sm text-slate-600">
          Restablece el contenido editable (especialidades, profesionales, horarios y portada) a los
          valores originales del sitio. Las citas y las cuentas no se ven afectadas.
        </p>
        <button
          type="button"
          onClick={restablecer}
          className="mt-3 rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
        >
          Restablecer contenido a valores originales
        </button>
      </div>
    </div>
  )
}

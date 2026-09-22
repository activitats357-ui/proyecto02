import { useState } from 'react'
import { Save, AlertTriangle } from 'lucide-react'
import { cambiarCredencial, obtenerDatosCuenta } from '../../utils/adminAuth'
import { restablecerContenido } from '../../utils/contentStore'

const claseInput =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100'

export default function AdminCuenta() {
  const datos = obtenerDatosCuenta()
  const [nuevoUsuario, setNuevoUsuario] = useState(datos.usuario)
  const [email, setEmail] = useState(datos.email)
  const [passwordActual, setPasswordActual] = useState('')
  const [nuevoPassword, setNuevoPassword] = useState('')
  const [repetir, setRepetir] = useState('')
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  const enviar = (evento) => {
    evento.preventDefault()
    setError('')
    setOk('')
    if (nuevoPassword && nuevoPassword !== repetir) {
      setError('Las contraseñas nuevas no coinciden.')
      return
    }
    const resultado = cambiarCredencial({
      passwordActual,
      nuevoUsuario,
      nuevoPassword: nuevoPassword || undefined,
      email,
    })
    if (resultado.ok) {
      setOk('Datos actualizados correctamente.')
      setPasswordActual('')
      setNuevoPassword('')
      setRepetir('')
    } else {
      setError(resultado.error)
    }
  }

  const restablecer = () => {
    if (
      window.confirm(
        '¿Restablecer TODO el contenido (especialidades, profesionales y horarios) a los valores originales? Se perderán tus ediciones. Las citas NO se borran.',
      )
    ) {
      restablecerContenido()
      window.alert('Contenido restablecido a los valores originales.')
    }
  }

  return (
    <div className="max-w-xl">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">Cuenta</h2>
        <p className="text-sm text-slate-500">Cambia tus credenciales de acceso al panel.</p>
      </div>

      <form onSubmit={enviar} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-softer">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700">Usuario</span>
          <input type="text" value={nuevoUsuario} onChange={(e) => setNuevoUsuario(e.target.value)} className={claseInput} />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700">
            Correo de recuperación
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className={claseInput}
          />
          <span className="mt-1 block text-xs text-slate-500">
            Se usará para recuperar la contraseña cuando se conecte el backend.
          </span>
        </label>

        <hr className="border-slate-100" />

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-slate-700">Contraseña actual</span>
          <input
            type="password"
            autoComplete="current-password"
            value={passwordActual}
            onChange={(e) => setPasswordActual(e.target.value)}
            className={claseInput}
          />
          <span className="mt-1 block text-xs text-slate-500">Obligatoria para confirmar cualquier cambio.</span>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Nueva contraseña</span>
            <input
              type="password"
              autoComplete="new-password"
              value={nuevoPassword}
              onChange={(e) => setNuevoPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className={claseInput}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">Repetir contraseña</span>
            <input
              type="password"
              autoComplete="new-password"
              value={repetir}
              onChange={(e) => setRepetir(e.target.value)}
              className={claseInput}
            />
          </label>
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}
        {ok && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{ok}</p>}

        <button
          type="submit"
          className="flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-950"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Guardar cambios
        </button>
      </form>

      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/50 p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-red-700">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          Zona de riesgo
        </h3>
        <p className="mt-1.5 text-sm text-slate-600">
          Restablece el contenido editable (especialidades, profesionales y horarios) a los valores
          originales del sitio. Las citas recibidas no se ven afectadas.
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

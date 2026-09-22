import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import Seo from '../../components/Seo'
import { iniciarSesion, haySesion } from '../../utils/adminAuth'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mostrarAyuda, setMostrarAyuda] = useState(false)

  // Si ya hay sesión, entra directamente al panel.
  if (haySesion()) {
    navigate('/admin', { replace: true })
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const resultado = iniciarSesion(usuario, password)
    if (resultado.ok) {
      navigate('/admin', { replace: true })
    } else {
      setError(resultado.error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12">
      <Seo title="Acceso al panel de administración" description="Área privada de administración." />
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-900 text-white">
              <LogIn className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-xl font-bold text-slate-900">Panel de administración</h1>
            <p className="mt-1 text-sm text-slate-500">Introduce tus credenciales para continuar.</p>
          </div>

          <form onSubmit={enviar} className="space-y-4" noValidate>
            <div>
              <label htmlFor="usuario" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Usuario
              </label>
              <input
                id="usuario"
                type="text"
                autoComplete="username"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-200"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Entrar
            </button>
          </form>

          <button
            type="button"
            onClick={() => setMostrarAyuda((v) => !v)}
            className="mt-4 w-full text-center text-xs font-medium text-slate-500 underline underline-offset-2 hover:text-slate-700"
          >
            ¿Has olvidado la contraseña?
          </button>

          {mostrarAyuda && (
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
              La recuperación de contraseña por correo estará disponible al conectar el backend
              (Supabase). Mientras tanto, si has olvidado la contraseña puedes restablecerla borrando
              los datos del navegador para este sitio; volverá a las credenciales iniciales.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

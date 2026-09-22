import { Cookie } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CONSENT_KEY = 'cookie_consent'

export default function CookieBanner() {
  const [consentimiento, setConsentimiento] = useLocalStorage(CONSENT_KEY, null)

  if (consentimiento) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] animate-slide-up border-t border-slate-200 bg-white/95 backdrop-blur-sm shadow-2xl"
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
    >
      <div className="container-app flex flex-col items-start gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-600">
            <Cookie className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-sm text-slate-700">
            Utilizamos cookies para mejorar tu experiencia de navegación y recordar determinadas
            preferencias.{' '}
            <Link to="/privacidad" className="font-semibold text-secondary-700 underline underline-offset-2">
              Política de privacidad
            </Link>
          </p>
        </div>
        <div className="flex w-full flex-shrink-0 gap-3 sm:w-auto">
          <button
            type="button"
            onClick={() => setConsentimiento('rejected')}
            className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 sm:flex-none"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => setConsentimiento('accepted')}
            className="flex-1 rounded-full bg-secondary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-200 sm:flex-none"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

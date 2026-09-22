import { Link } from 'react-router-dom'

const VARIANTES = {
  // CTA principal: verde turquesa (tono 700 para garantizar contraste AA con texto blanco)
  primary:
    'bg-secondary-700 text-white hover:bg-secondary-800 shadow-soft focus-visible:ring-secondary-200',
  secondary:
    'bg-white text-primary-800 hover:bg-slate-50 border border-slate-200 focus-visible:ring-primary-200',
  outline:
    'bg-transparent text-white border border-white/70 hover:bg-white/10 focus-visible:ring-white/50',
  ghost:
    'bg-transparent text-primary-800 hover:bg-slate-100 focus-visible:ring-primary-200',
}

const TAMANOS = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

/**
 * Botón reutilizable. Si recibe la prop `to`, se renderiza como Link de
 * react-router; si recibe `href`, como enlace externo; en caso contrario,
 * como <button>.
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  icon: Icon,
  ...props
}) {
  const clases = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 ${VARIANTES[variant]} ${TAMANOS[size]} ${className}`

  const contenido = (
    <>
      {children}
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={clases} {...props}>
        {contenido}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={clases} {...props}>
        {contenido}
      </a>
    )
  }

  return (
    <button type={type} className={clases} {...props}>
      {contenido}
    </button>
  )
}

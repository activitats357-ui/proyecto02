export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}) {
  const alineacion = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-4 ${alineacion} max-w-2xl`}>
      {eyebrow && (
        <span className={`badge-eyebrow ${light ? 'bg-white/10 text-secondary-200' : ''}`}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-base sm:text-lg ${light ? 'text-primary-100' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

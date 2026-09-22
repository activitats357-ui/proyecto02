import { AlertTriangle } from 'lucide-react'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import { centro } from '../data'
import { useContent } from '../hooks/useContent'

export default function Privacidad() {
  const { privacidad } = useContent()
  return (
    <>
      <Seo
        title={`Política de privacidad | ${centro.nombre} — Tegucigalpa`}
        description="Política de privacidad orientativa del centro de fisioterapia deportiva ubicado en Tegucigalpa, Honduras."
      />

      <section className="section-padding">
        <div className="container-app max-w-3xl">
          <SectionTitle align="left" eyebrow="Legal" title="Política de privacidad" />

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <p>
              Esta es una plantilla orientativa de carácter demostrativo. Debe ser revisada por un
              profesional legal y adaptada a la normativa aplicable antes de utilizarse como documento
              legal definitivo.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {privacidad.map((seccion) => (
              <div key={seccion.id || seccion.titulo}>
                <h2 className="text-lg font-bold text-slate-900">{seccion.titulo}</h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {seccion.contenido}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

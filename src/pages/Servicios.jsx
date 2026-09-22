import { Info } from 'lucide-react'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import { centro } from '../data'
import { useContent } from '../hooks/useContent'

export default function Servicios() {
  const { servicios } = useContent()
  return (
    <>
      <Seo
        title={`Servicios de fisioterapia deportiva en Tegucigalpa | ${centro.nombre}`}
        description="Catálogo de servicios de fisioterapia deportiva en Tegucigalpa: rehabilitación postoperatoria, terapia manual ortopédica, punción seca, ejercicio terapéutico y readaptación funcional."
      />

      <section className="section-padding">
        <div className="container-app">
          <SectionTitle
            eyebrow="Catálogo de servicios"
            title="Servicios de fisioterapia deportiva"
            description="Tratamientos individualizados orientados a tu recuperación funcional y a tu retorno a la actividad."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((servicio) => (
              <ServiceCard key={servicio.slug} servicio={servicio} />
            ))}
          </div>

          <div className="mt-12 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-100/60 p-5 text-sm text-slate-600">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-600" aria-hidden="true" />
            <p>
              La información de esta página es orientativa y no sustituye una valoración profesional
              individual.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

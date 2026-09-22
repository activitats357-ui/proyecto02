import { Info } from 'lucide-react'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import TeamCard from '../components/TeamCard'
import { profesionales, centro } from '../data'

export default function Equipo() {
  return (
    <>
      <Seo
        title={`Nuestro equipo de fisioterapeutas en Tegucigalpa | ${centro.nombre}`}
        description="Conoce al equipo de fisioterapeutas de nuestro centro en Tegucigalpa, especializados en rehabilitación deportiva, terapia manual ortopédica y ejercicio terapéutico."
      />

      <section className="section-padding">
        <div className="container-app">
          <SectionTitle
            eyebrow="Nuestro equipo"
            title="Profesionales especializados en tu recuperación"
            description="Un equipo orientado a la fisioterapia deportiva y a la rehabilitación musculoesquelética."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profesionales.map((profesional) => (
              <TeamCard key={profesional.id} profesional={profesional} />
            ))}
          </div>

          <div className="mt-12 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-100/60 p-5 text-sm text-slate-600">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-600" aria-hidden="true" />
            <p>Los nombres, fotografías y datos profesionales mostrados son de carácter demostrativo.</p>
          </div>
        </div>
      </section>
    </>
  )
}

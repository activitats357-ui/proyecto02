import { useState } from 'react'
import { Info } from 'lucide-react'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import ConsultationList from '../components/ConsultationList'
import { obtenerConsultas } from '../utils/consultasStorage'
import { centro } from '../data'

export default function Consultas() {
  // Inicialización perezosa: se lee localStorage una sola vez, al montar,
  // sin necesidad de un efecto adicional.
  const [consultas, setConsultas] = useState(() => obtenerConsultas())

  return (
    <>
      <Seo
        title={`Visor de consultas | ${centro.nombre} — Tegucigalpa`}
        description="Panel interno del centro de fisioterapia deportiva en Tegucigalpa: revisa las solicitudes de turno y consultas almacenadas localmente en este navegador."
      />

      <section className="section-padding">
        <div className="container-app">
          <SectionTitle
            eyebrow="Panel interno"
            title="Visor de consultas"
            description="Revisa las solicitudes de turno y consultas guardadas en este navegador."
          />

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-100/60 p-5 text-sm text-slate-600">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-600" aria-hidden="true" />
            <p>Los datos mostrados proceden exclusivamente del almacenamiento local de este navegador.</p>
          </div>

          <div className="mt-8">
            <ConsultationList consultas={consultas} onCambio={setConsultas} />
          </div>
        </div>
      </section>
    </>
  )
}

import { ArrowRight, User } from 'lucide-react'
import Seo from '../components/Seo'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import BoxCard from '../components/BoxCard'
import Button from '../components/Button'
import { diferenciales, boxes, centro } from '../data'
import { obtenerIcono } from '../utils/iconos'
import { useContent } from '../hooks/useContent'

export default function Inicio() {
  const { servicios } = useContent()
  const serviciosDestacados = servicios.slice(0, 4)

  return (
    <>
      <Seo
        title={`Fisioterapia deportiva en Tegucigalpa | ${centro.nombre}`}
        description={`${centro.descripcionBreve} Atención personalizada, rehabilitación deportiva y ejercicio terapéutico en Tegucigalpa, Honduras.`}
      />

      <Hero />

      {/* Diferenciales */}
      <section className="section-padding">
        <div className="container-app">
          <SectionTitle
            eyebrow="Por qué elegirnos"
            title="Un enfoque cercano, funcional y especializado"
            description="Acompañamos tu recuperación con un método centrado en tus objetivos, no solo en el dolor."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {diferenciales.map((diferencial) => {
              const Icono = obtenerIcono(diferencial.icono)
              return (
                <div
                  key={diferencial.titulo}
                  className="rounded-2xl border border-slate-200 p-6 transition-shadow duration-300 hover:shadow-soft"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-900 text-white">
                    <Icono className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">{diferencial.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{diferencial.descripcion}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tres boxes */}
      <section className="section-padding bg-slate-100/60">
        <div className="container-app">
          <SectionTitle
            eyebrow="Nuestros espacios"
            title="Tres espacios. Una atención completamente personalizada."
            description="Cada box está pensado para ofrecer privacidad y un trato cercano durante toda la sesión."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boxes.map((box, indice) => (
              <BoxCard key={box.numero} box={box} indice={indice} />
            ))}
          </div>
        </div>
      </section>

      {/* Servicios destacados */}
      <section className="section-padding">
        <div className="container-app">
          <SectionTitle
            eyebrow="Tratamientos"
            title="Servicios destacados"
            description="Un enfoque integral orientado a la recuperación funcional y al rendimiento deportivo."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviciosDestacados.map((servicio) => (
              <ServiceCard key={servicio.slug} servicio={servicio} compacto />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button to="/servicios" variant="secondary" size="lg" icon={ArrowRight}>
              Ver todos los servicios
            </Button>
          </div>
        </div>
      </section>

      {/* Sección con foto + texto */}
      <section className="section-padding bg-slate-100/60">
        <div className="container-app grid items-center gap-10 lg:grid-cols-2">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-200">
            <img
              src="https://images.unsplash.com/photo-1645005513713-9e2b92a687d3?fm=jpg&q=80&w=1200&auto=format&fit=crop"
              alt="Sesión de ejercicio terapéutico con acompañamiento profesional"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <SectionTitle
              align="left"
              eyebrow="Nuestro método"
              title="Acompañamiento real, de principio a fin"
              description="Desde la primera valoración hasta el retorno completo a tu actividad, trabajamos contigo en cada etapa con un plan adaptado a tus objetivos y a tu progreso."
            />
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
              <User className="h-5 w-5 text-secondary-600" aria-hidden="true" />
              Profesionales especializados en fisioterapia deportiva y rehabilitación musculoesquelética.
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section-padding bg-primary-950">
        <div className="container-app flex flex-col items-center gap-6 text-center">
          <SectionTitle
            light
            title="¿Una lesión está limitando tu actividad?"
            description="Solicita tu turno y da el primer paso hacia una recuperación acompañada y personalizada."
          />
          <Button to="/contacto" size="lg" icon={ArrowRight}>
            Solicitar turno
          </Button>
        </div>
      </section>
    </>
  )
}

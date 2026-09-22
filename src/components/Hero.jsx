import { ArrowRight, Activity } from 'lucide-react'
import Button from './Button'
import { centro } from '../data'
import { useContent } from '../hooks/useContent'
import { IMAGEN_PORTADA_POR_DEFECTO } from '../utils/contentStore'

export default function Hero() {
  const { ajustes } = useContent()
  const imagenPortada = ajustes?.imagenPortada || IMAGEN_PORTADA_POR_DEFECTO
  return (
    <section className="relative overflow-hidden bg-primary-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(45,212,191,0.35), transparent 45%), radial-gradient(circle at 85% 15%, rgba(85,144,200,0.30), transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="container-app relative grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="flex flex-col items-start gap-6 animate-slide-up">
          <span className="badge-eyebrow bg-white/10 text-secondary-200">
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
            Fisioterapia deportiva en {centro.ciudad}
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Recupera tu movimiento.
            <br className="hidden sm:block" /> Vuelve a lo que te apasiona.
          </h1>
          <p className="max-w-xl text-lg text-primary-200">
            En {centro.nombre} combinamos fisioterapia deportiva, rehabilitación funcional y ejercicio
            terapéutico para acompañarte en cada etapa de tu recuperación, con atención personalizada en{' '}
            {centro.numeroBoxes} boxes privados en {centro.ciudad}.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/contacto" size="lg" icon={ArrowRight}>
              Solicitar turno
            </Button>
            <Button to="/servicios" variant="outline" size="lg">
              Conocer nuestros servicios
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
            <img
              src={imagenPortada}
              alt="Sesión de fisioterapia deportiva: profesional aplicando terapia manual a un paciente"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-4 shadow-2xl sm:block">
            <p className="text-3xl font-extrabold text-slate-900">{centro.numeroBoxes}</p>
            <p className="text-xs font-medium text-slate-500">Boxes de atención privada</p>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import ContactForm from '../components/ContactForm'
import MapaSimulado from '../components/MapaSimulado'
import { centro, horarios } from '../data'

export default function Contacto() {
  return (
    <>
      <Seo
        title={`Contacto y turnos | ${centro.nombre}`}
        description="Solicita tu turno o realiza una consulta en nuestro centro de fisioterapia deportiva en Tegucigalpa, Honduras."
      />

      <section className="section-padding">
        <div className="container-app">
          <SectionTitle
            eyebrow="Contacto y turnos"
            title="Solicita tu turno"
            description="Completa el formulario y nos pondremos en contacto contigo para confirmar los detalles de tu solicitud."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Columna izquierda */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <div className="rounded-2xl border border-slate-200 p-6 sm:p-7">
                <h3 className="text-lg font-bold text-slate-900">Información de contacto</h3>
                <ul className="mt-5 space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-600" aria-hidden="true" />
                    <span>{centro.direccion}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-secondary-600" aria-hidden="true" />
                    <a href={`tel:${centro.telefono}`} className="hover:text-secondary-700">
                      {centro.telefonoMostrado}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-secondary-600" aria-hidden="true" />
                    <a href={`mailto:${centro.email}`} className="hover:text-secondary-700 break-all">
                      {centro.email}
                    </a>
                  </li>
                </ul>

                <div className="mt-6 border-t border-slate-200 pt-5">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Clock className="h-4 w-4 text-secondary-600" aria-hidden="true" />
                    Horario de atención
                  </h4>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                    {horarios.map((franja) => (
                      <li key={franja.dia} className="flex justify-between gap-4">
                        <span>{franja.dia}</span>
                        <span className="font-medium text-slate-800">{franja.horario}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <MapaSimulado ciudad={centro.ciudad} />

              <p className="text-xs text-slate-500">
                Los datos de contacto mostrados son ficticios y de carácter demostrativo.
              </p>
            </div>

            {/* Columna derecha: formulario */}
            <div className="order-1 rounded-2xl border border-slate-200 p-6 shadow-softer sm:p-8 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

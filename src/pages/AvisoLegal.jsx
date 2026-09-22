import { AlertTriangle } from 'lucide-react'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import { centro } from '../data'

const SECCIONES = [
  {
    titulo: '1. Información general',
    contenido:
      'En cumplimiento con la normativa aplicable, se facilita a continuación la información general de este sitio web.',
  },
  {
    titulo: '2. Titular',
    contenido: 'Titular del sitio web: [NOMBRE DEL CENTRO].',
  },
  {
    titulo: '3. Domicilio',
    contenido: 'Domicilio social: [DIRECCIÓN].',
  },
  {
    titulo: '4. Contacto',
    contenido: 'Correo electrónico de contacto: [EMAIL]. Teléfono de contacto: [TELÉFONO].',
  },
  {
    titulo: '5. Condiciones de uso',
    contenido:
      'El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de las condiciones de uso aquí descritas. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos.',
  },
  {
    titulo: '6. Propiedad intelectual',
    contenido:
      'Los contenidos de este sitio web (textos, imágenes, diseño, código fuente y demás elementos) son propiedad de [NOMBRE DEL CENTRO] o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual.',
  },
  {
    titulo: '7. Responsabilidad',
    contenido:
      'La información de este sitio web tiene carácter orientativo y no sustituye una valoración profesional individual. [NOMBRE DEL CENTRO] no se hace responsable de las decisiones tomadas exclusivamente en base a la información publicada en este sitio.',
  },
  {
    titulo: '8. Enlaces externos',
    contenido:
      'Este sitio web puede contener enlaces a sitios de terceros. [NOMBRE DEL CENTRO] no se responsabiliza del contenido ni de las prácticas de privacidad de dichos sitios externos.',
  },
  {
    titulo: '9. Legislación aplicable',
    contenido:
      'Las presentes condiciones se rigen por la legislación vigente en Honduras. Para cualquier controversia, las partes se someten a los tribunales competentes según la normativa aplicable.',
  },
]

export default function AvisoLegal() {
  return (
    <>
      <Seo
        title={`Aviso legal | ${centro.nombre} — Tegucigalpa`}
        description="Aviso legal orientativo del centro de fisioterapia deportiva ubicado en Tegucigalpa, Honduras."
      />

      <section className="section-padding">
        <div className="container-app max-w-3xl">
          <SectionTitle align="left" eyebrow="Legal" title="Aviso legal" />

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <p>
              Esta es una plantilla profesional orientativa. No se ha incluido información legal real:
              debe revisarse y completarse antes de utilizarse como documento legal definitivo.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {SECCIONES.map((seccion) => (
              <div key={seccion.titulo}>
                <h2 className="text-lg font-bold text-slate-900">{seccion.titulo}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{seccion.contenido}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

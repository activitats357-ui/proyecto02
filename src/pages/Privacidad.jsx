import { AlertTriangle } from 'lucide-react'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import { centro } from '../data'

const SECCIONES = [
  {
    titulo: '1. Responsable del tratamiento',
    contenido: `El responsable del tratamiento de los datos es [NOMBRE DEL CENTRO], con domicilio en [DIRECCIÓN], contacto: [EMAIL] / [TELÉFONO].`,
  },
  {
    titulo: '2. Datos recopilados',
    contenido:
      'A través del formulario de contacto y turnos se recopilan los siguientes datos: nombre completo, teléfono, correo electrónico, tipo de solicitud, tratamiento de interés, fecha y horario preferidos, y mensaje opcional. En esta demostración, estos datos se almacenan exclusivamente en el navegador del usuario mediante localStorage y no se envían a ningún servidor externo.',
  },
  {
    titulo: '3. Finalidad',
    contenido:
      'Los datos recopilados tienen como finalidad gestionar la solicitud de turno o consulta realizada por el usuario y permitir que el centro se ponga en contacto con él.',
  },
  {
    titulo: '4. Base jurídica',
    contenido:
      'La base jurídica del tratamiento es el consentimiento expreso del usuario, otorgado al marcar la casilla de aceptación de esta política de privacidad antes de enviar el formulario.',
  },
  {
    titulo: '5. Conservación',
    contenido:
      'En esta demostración, los datos se conservan únicamente en el navegador del usuario, mientras no se eliminen manualmente desde el visor de consultas o se borren los datos de navegación del dispositivo.',
  },
  {
    titulo: '6. Derechos',
    contenido:
      'El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad dirigiéndose a [EMAIL]. En esta demostración, el usuario puede además eliminar sus propias solicitudes directamente desde el visor de consultas (/consultas).',
  },
  {
    titulo: '7. Seguridad',
    contenido:
      'No se envía ningún dato introducido por el usuario a servidores externos. No se almacenan contraseñas, datos de pago ni información sanitaria sensible. localStorage no es un mecanismo adecuado para almacenar información sanitaria sensible en una aplicación de producción: esta aplicación debe considerarse una demo/prototipo.',
  },
  {
    titulo: '8. Contacto',
    contenido: `Para cualquier consulta relacionada con esta política de privacidad, puedes escribir a [EMAIL] o llamar al [TELÉFONO].`,
  },
  {
    titulo: '9. Cambios en la política',
    contenido:
      'Esta política de privacidad puede actualizarse periódicamente. Se recomienda revisar esta página de forma habitual para conocer cualquier cambio.',
  },
]

export default function Privacidad() {
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

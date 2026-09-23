import { Link } from 'react-router-dom'
import {
  BookOpen,
  LayoutDashboard,
  Eraser,
  AlertTriangle,
  Database,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react'
import Seo from '../components/Seo'

function Seccion({ id, titulo, icono: Icono, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
        {Icono && <Icono className="h-5 w-5 text-secondary-600" aria-hidden="true" />}
        {titulo}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  )
}

function Codigo({ children }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-slate-800">
      {children}
    </code>
  )
}

export default function Documentacion() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Seo
        title="Documentación de la web"
        description="Guía de funcionamiento del sitio y del panel de administración, y cómo eliminar los datos de muestra."
      />

      {/* Cabecera */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-900 text-white">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-lg font-bold leading-tight">Documentación de la web</h1>
              <p className="text-xs text-slate-500">Guía de funcionamiento y mantenimiento</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Ir a la web
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-1.5 rounded-full bg-primary-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-950"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Panel
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Índice */}
        <nav className="mb-8 rounded-2xl border border-slate-200 bg-white p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Contenido</p>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-secondary-700">
            <li><a href="#resumen" className="hover:underline">Resumen del sitio</a></li>
            <li><a href="#panel" className="hover:underline">Panel de administración</a></li>
            <li><a href="#datos-muestra" className="hover:underline">Cómo eliminar los datos de muestra</a></li>
            <li><a href="#reset" className="hover:underline">Restablecer o borrar todo</a></li>
            <li><a href="#limitaciones" className="hover:underline">Limitaciones actuales y próximos pasos</a></li>
          </ol>
        </nav>

        <div className="space-y-10">
          {/* 1. Resumen */}
          <Seccion id="resumen" titulo="1. Resumen del sitio" icono={BookOpen}>
            <p>
              La web es un sitio de fisioterapia con estas páginas públicas: <strong>Inicio</strong>,{' '}
              <strong>Servicios</strong>, <strong>Equipo</strong>, <strong>Contacto</strong> (con formulario
              de solicitud de turno), <strong>Política de privacidad</strong> y <strong>Aviso legal</strong>.
            </p>
            <p>
              Cuando alguien envía el formulario de contacto, la solicitud se guarda y aparece en el panel de
              administración, en el apartado <strong>Citas</strong>.
            </p>
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <p>
                <strong>Importante:</strong> de momento todos los datos (citas y contenidos editados) se
                guardan <strong>solo en el navegador</strong> donde se usan (almacenamiento local). No se
                comparten entre dispositivos ni personas, y no se envía ningún correo. Esto cambiará al
                conectar un backend (Supabase).
              </p>
            </div>
          </Seccion>

          {/* 2. Panel */}
          <Seccion id="panel" titulo="2. Panel de administración" icono={LayoutDashboard}>
            <p>
              Se accede en <Codigo>/admin</Codigo> (por ejemplo{' '}
              <Codigo>tudominio.com/admin</Codigo>). No hay ningún enlace visible en la web: se entra
              escribiendo la dirección. Credenciales iniciales: usuario <strong>admin</strong> y contraseña{' '}
              <strong>admin1234</strong> (cámbialas cuanto antes en «Cuentas»).
            </p>
            <p>Apartados disponibles:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li><strong>Citas</strong> — Ver las solicitudes recibidas en lista o calendario (mes/semana/día), cambiar su estado (pendiente, confirmada, atendida, cancelada), añadir notas internas y eliminarlas.</li>
              <li><strong>Horarios</strong> — Editar las franjas del horario de atención.</li>
              <li><strong>Especialidades</strong> — Editar los textos de cada servicio (nombre, descripciones, duración, beneficios, problemas).</li>
              <li><strong>Profesionales</strong> — Editar cada perfil (textos y foto), ocultarlo, eliminarlo o añadir nuevos.</li>
              <li><strong>Espacios</strong> — Editar título, descripción y foto de los espacios de la página de inicio.</li>
              <li><strong>Portada</strong> — Cambiar la imagen principal de la página de inicio.</li>
              <li><strong>Privacidad</strong> — Editar los textos de la política de privacidad.</li>
              <li><strong>Cuentas</strong> — Dar de alta y de baja usuarios, y cambiar contraseñas.</li>
            </ul>
            <p>
              En cada apartado, los cambios no se aplican hasta pulsar <strong>«Guardar»</strong>. Las fotos
              se pueden subir desde el dispositivo o indicar mediante una URL.
            </p>
          </Seccion>

          {/* 3. Datos de muestra */}
          <Seccion id="datos-muestra" titulo="3. Cómo eliminar los datos de muestra" icono={Eraser}>
            <p>
              La web viene con contenido de <strong>demostración</strong> (nombres y fotos de ejemplo,
              textos con marcadores como <Codigo>[EMAIL]</Codigo>, teléfono <Codigo>+504 0000-0000</Codigo>,
              etc.). Antes de publicar de forma definitiva conviene sustituirlo. Hay dos tipos:
            </p>

            <p className="font-semibold text-slate-700">A) Editable desde el panel (sin tocar código)</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li><strong>Profesionales</strong> → sustituye los nombres y fotos de ejemplo por los reales, o elimina los perfiles de muestra y crea los tuyos.</li>
              <li><strong>Especialidades</strong> → revisa y ajusta los textos de cada servicio.</li>
              <li><strong>Espacios</strong> → pon las fotos y descripciones reales de tus espacios.</li>
              <li><strong>Portada</strong> → sube la imagen real de portada.</li>
              <li><strong>Horarios</strong> → introduce tu horario real.</li>
              <li><strong>Privacidad</strong> → completa los marcadores (<Codigo>[NOMBRE DEL CENTRO]</Codigo>, <Codigo>[DIRECCIÓN]</Codigo>, <Codigo>[EMAIL]</Codigo>, <Codigo>[TELÉFONO]</Codigo>).</li>
              <li><strong>Citas</strong> → elimina las solicitudes de prueba con el botón «Eliminar» de cada una. (Para borrarlas todas de golpe, usa «Vaciar todas las consultas» en la página <Codigo>/consultas</Codigo>.)</li>
            </ul>

            <p className="font-semibold text-slate-700">B) Requiere editar el código (un desarrollador)</p>
            <p>Estos datos no se editan desde el panel; están en el código del proyecto:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Nombre del centro, dirección, teléfono, correo, ciudad y redes sociales → archivo <Codigo>src/data/centro.js</Codigo>.</li>
              <li>Avisos de «datos de carácter demostrativo» de las páginas Equipo, Contacto y Aviso legal.</li>
              <li>El texto del <strong>Aviso legal</strong> (página <Codigo>/aviso-legal</Codigo>), que aún no es editable desde el panel.</li>
              <li>Textos de los títulos para buscadores (SEO) de cada página.</li>
            </ul>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <ExternalLink className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-600" aria-hidden="true" />
              <p>
                Estos cambios de código se pueden hacer y desplegar cuando quieras. También se puede hacer
                editable desde el panel el Aviso legal y los datos del centro, si interesa.
              </p>
            </div>
          </Seccion>

          {/* 4. Reset */}
          <Seccion id="reset" titulo="4. Restablecer o borrar todo" icono={Database}>
            <p>
              <strong>Restablecer contenido</strong> (en «Cuentas» → «Zona de riesgo»): devuelve
              especialidades, profesionales, espacios, horarios, portada y privacidad al contenido{' '}
              <em>original de demostración</em>. Sirve para deshacer tus ediciones; <strong>no</strong> deja
              el contenido vacío. Las citas y las cuentas no se ven afectadas.
            </p>
            <p>
              <strong>Empezar de cero en un navegador</strong>: como todo se guarda en el almacenamiento
              local del navegador, para dejarlo totalmente limpio se pueden borrar los datos del sitio desde
              el navegador (o eliminar estas claves de <Codigo>localStorage</Codigo>):
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li><Codigo>fisioterapia_consultas</Codigo> — las citas/solicitudes.</li>
              <li><Codigo>fisioterapia_contenido</Codigo> — los contenidos editados.</li>
              <li><Codigo>fisioterapia_admin_usuarios</Codigo> — las cuentas de acceso.</li>
            </ul>
            <p>
              Tras borrarlas, la web vuelve a mostrar el contenido de demostración y el acceso vuelve a
              <Codigo>admin</Codigo> / <Codigo>admin1234</Codigo>.
            </p>
          </Seccion>

          {/* 5. Limitaciones */}
          <Seccion id="limitaciones" titulo="5. Limitaciones actuales y próximos pasos" icono={AlertTriangle}>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>El acceso al panel <strong>no es seguridad real</strong>: evita el acceso casual, pero no protege de verdad. La protección real llegará con el backend.</li>
              <li>Las <strong>citas y los contenidos</strong> viven solo en el navegador donde se usan; no se ven desde otros dispositivos.</li>
              <li>La <strong>recuperación de contraseña por correo</strong> aún no funciona (el correo de cada cuenta se guarda para cuando esté disponible).</li>
              <li>Las <strong>imágenes subidas</strong> se guardan dentro del navegador; por eso conviene usar imágenes ligeras (o URLs) y respetar los tamaños recomendados.</li>
            </ul>
            <p>
              Al conectar <strong>Supabase</strong> (backend), se resolverán estos puntos: login seguro,
              recuperación por correo, y datos compartidos entre dispositivos y personas.
            </p>
          </Seccion>
        </div>

        <p className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-400">
          Documentación interna del sitio. Página accesible solo por dirección (/documentacion).
        </p>
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import CitaCard, { PUNTO_ESTADO, ETIQUETA_ESTADO } from './CitaCard'

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]
// Orden de las franjas horarias en la vista diaria.
const ORDEN_FRANJAS = ['Mañana', 'Mediodía', 'Tarde', 'Cualquier horario']

// --- Utilidades de fecha (siempre en horario local, sin desfase UTC) ---
function aCadena(fecha) {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

function desdeCadena(cadena) {
  const [anio, mes, dia] = cadena.split('-').map(Number)
  return new Date(anio, mes - 1, dia)
}

// Lunes de la semana que contiene la fecha dada.
function lunesDe(fecha) {
  const d = new Date(fecha)
  const dia = (d.getDay() + 6) % 7 // 0 = lunes
  d.setDate(d.getDate() - dia)
  d.setHours(0, 0, 0, 0)
  return d
}

function mismaFecha(a, b) {
  return aCadena(a) === aCadena(b)
}

export default function CitasCalendario({ consultas, onEstado, onNota, onEliminar }) {
  const hoy = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [vista, setVista] = useState('mes')
  const [fechaRef, setFechaRef] = useState(hoy)
  const [diaSel, setDiaSel] = useState(aCadena(hoy))

  // Agrupa las consultas por fecha preferida (YYYY-MM-DD).
  const porFecha = useMemo(() => {
    const mapa = new Map()
    let sinFecha = 0
    for (const c of consultas) {
      if (!c.fechaPreferida) {
        sinFecha += 1
        continue
      }
      const lista = mapa.get(c.fechaPreferida) || []
      lista.push(c)
      mapa.set(c.fechaPreferida, lista)
    }
    return { mapa, sinFecha }
  }, [consultas])

  const citasDe = (cadena) => porFecha.mapa.get(cadena) || []

  const navegar = (direccion) => {
    if (vista === 'dia') {
      const dSel = desdeCadena(diaSel)
      dSel.setDate(dSel.getDate() + direccion)
      setDiaSel(aCadena(dSel))
      setFechaRef(dSel)
      return
    }
    const d = new Date(fechaRef)
    if (vista === 'mes') d.setMonth(d.getMonth() + direccion)
    else d.setDate(d.getDate() + direccion * 7)
    setFechaRef(d)
  }

  const irHoy = () => {
    setFechaRef(hoy)
    setDiaSel(aCadena(hoy))
  }

  const abrirDia = (cadena) => {
    setDiaSel(cadena)
    setFechaRef(desdeCadena(cadena))
    setVista('dia')
  }

  // Título del encabezado según la vista.
  const titulo = (() => {
    if (vista === 'mes') return `${MESES[fechaRef.getMonth()]} ${fechaRef.getFullYear()}`
    if (vista === 'semana') {
      const lunes = lunesDe(fechaRef)
      const domingo = new Date(lunes)
      domingo.setDate(lunes.getDate() + 6)
      return `${lunes.getDate()} ${MESES[lunes.getMonth()]} — ${domingo.getDate()} ${MESES[domingo.getMonth()]} ${domingo.getFullYear()}`
    }
    const d = desdeCadena(diaSel)
    return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`
  })()

  return (
    <div>
      {/* Controles */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => navegar(-1)}
            aria-label="Anterior"
            className="rounded-lg border border-slate-300 bg-white p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => navegar(1)}
            aria-label="Siguiente"
            className="rounded-lg border border-slate-300 bg-white p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={irHoy}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            Hoy
          </button>
          <span className="ml-2 text-sm font-bold capitalize text-slate-900">{titulo}</span>
        </div>

        <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
          {[
            ['mes', 'Mes'],
            ['semana', 'Semana'],
            ['dia', 'Día'],
          ].map(([clave, etiqueta]) => (
            <button
              key={clave}
              type="button"
              onClick={() => setVista(clave)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                vista === clave ? 'bg-primary-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {etiqueta}
            </button>
          ))}
        </div>
      </div>

      {porFecha.sinFecha > 0 && (
        <p className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-600">
          Hay {porFecha.sinFecha} solicitud(es) sin fecha preferida; se ven en la vista de lista, no en el calendario.
        </p>
      )}

      {vista === 'mes' && <VistaMes fecha={fechaRef} hoy={hoy} citasDe={citasDe} onDia={abrirDia} />}
      {vista === 'semana' && <VistaSemana fecha={fechaRef} hoy={hoy} citasDe={citasDe} onDia={abrirDia} />}
      {vista === 'dia' && (
        <VistaDia
          citas={citasDe(diaSel)}
          onEstado={onEstado}
          onNota={onNota}
          onEliminar={onEliminar}
        />
      )}
    </div>
  )
}

function Chip({ consulta, onClick }) {
  const estado = consulta.estado || 'pendiente'
  return (
    <button
      type="button"
      onClick={onClick}
      title={`${consulta.nombre} · ${ETIQUETA_ESTADO[estado]}`}
      className="flex w-full items-center gap-1.5 truncate rounded-md bg-slate-100 px-1.5 py-1 text-left text-xs text-slate-700 transition hover:bg-slate-200"
    >
      <span className={`h-2 w-2 flex-shrink-0 rounded-full ${PUNTO_ESTADO[estado]}`} aria-hidden="true" />
      <span className="truncate">{consulta.nombre}</span>
    </button>
  )
}

function VistaMes({ fecha, hoy, citasDe, onDia }) {
  const primero = new Date(fecha.getFullYear(), fecha.getMonth(), 1)
  const inicio = lunesDe(primero)
  const dias = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(inicio)
    d.setDate(inicio.getDate() + i)
    return d
  })

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-xs font-semibold text-slate-500">
        {DIAS_SEMANA.map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {dias.map((d) => {
          const cadena = aCadena(d)
          const citas = citasDe(cadena)
          const esOtroMes = d.getMonth() !== fecha.getMonth()
          const esHoy = mismaFecha(d, hoy)
          return (
            <button
              key={cadena}
              type="button"
              onClick={() => onDia(cadena)}
              className={`min-h-[92px] border-b border-r border-slate-100 p-1.5 text-left align-top transition hover:bg-slate-50 ${
                esOtroMes ? 'bg-slate-50/50 text-slate-400' : 'text-slate-700'
              }`}
            >
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                  esHoy ? 'bg-primary-900 text-white' : ''
                }`}
              >
                {d.getDate()}
              </span>
              <div className="mt-1 space-y-1">
                {citas.slice(0, 3).map((c) => (
                  <Chip key={c.id} consulta={c} onClick={() => onDia(cadena)} />
                ))}
                {citas.length > 3 && (
                  <span className="block px-1 text-[11px] font-medium text-slate-500">
                    +{citas.length - 3} más
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function VistaSemana({ fecha, hoy, citasDe, onDia }) {
  const lunes = lunesDe(fecha)
  const dias = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lunes)
    d.setDate(lunes.getDate() + i)
    return d
  })

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-7">
      {dias.map((d, i) => {
        const cadena = aCadena(d)
        const citas = citasDe(cadena)
        const esHoy = mismaFecha(d, hoy)
        return (
          <div
            key={cadena}
            className={`flex min-h-[140px] flex-col rounded-2xl border bg-white p-2 ${
              esHoy ? 'border-primary-300 ring-2 ring-primary-100' : 'border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => onDia(cadena)}
              className="mb-2 flex items-baseline justify-between gap-1 rounded-lg px-1 py-0.5 text-left transition hover:bg-slate-50"
            >
              <span className="text-xs font-semibold text-slate-500">{DIAS_SEMANA[i]}</span>
              <span className={`text-sm font-bold ${esHoy ? 'text-primary-900' : 'text-slate-700'}`}>
                {d.getDate()}
              </span>
            </button>
            <div className="space-y-1">
              {citas.length === 0 ? (
                <span className="px-1 text-[11px] text-slate-300">—</span>
              ) : (
                citas.map((c) => <Chip key={c.id} consulta={c} onClick={() => onDia(cadena)} />)
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function VistaDia({ citas, onEstado, onNota, onEliminar }) {
  // Agrupa por franja horaria en el orden definido; el resto va a "Sin franja".
  const grupos = useMemo(() => {
    const base = new Map(ORDEN_FRANJAS.map((f) => [f, []]))
    const otros = []
    for (const c of citas) {
      if (base.has(c.horarioPreferido)) base.get(c.horarioPreferido).push(c)
      else otros.push(c)
    }
    const resultado = ORDEN_FRANJAS.map((f) => [f, base.get(f)]).filter(([, arr]) => arr.length > 0)
    if (otros.length) resultado.push(['Sin franja', otros])
    return resultado
  }, [citas])

  if (citas.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <CalendarDays className="h-10 w-10 text-slate-300" aria-hidden="true" />
        <p className="mt-4 text-base font-semibold text-slate-700">No hay citas para este día.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {grupos.map(([franja, lista]) => (
        <div key={franja}>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
            {franja}
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
              {lista.length}
            </span>
          </h3>
          <div className="grid gap-4 lg:grid-cols-2">
            {lista.map((c) => (
              <CitaCard key={c.id} consulta={c} onEstado={onEstado} onNota={onNota} onEliminar={onEliminar} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

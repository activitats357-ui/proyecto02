import { useState } from 'react'
import { ClipboardList, Trash2 } from 'lucide-react'
import ConsultationCard from './ConsultationCard'
import Modal from './Modal'
import { eliminarConsulta, eliminarTodasLasConsultas } from '../utils/consultasStorage'

export default function ConsultationList({ consultas, onCambio }) {
  const [modalVaciarAbierto, setModalVaciarAbierto] = useState(false)

  const manejarEliminar = (id) => {
    const actualizadas = eliminarConsulta(id)
    onCambio(actualizadas)
  }

  const confirmarVaciarTodo = () => {
    const vacias = eliminarTodasLasConsultas()
    onCambio(vacias)
    setModalVaciarAbierto(false)
  }

  if (consultas.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-100/50 px-6 py-16 text-center">
        <ClipboardList className="h-10 w-10 text-slate-300" aria-hidden="true" />
        <p className="mt-4 text-base font-semibold text-slate-700">
          No hay solicitudes almacenadas en este navegador.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {consultas.length} {consultas.length === 1 ? 'solicitud almacenada' : 'solicitudes almacenadas'}
        </p>
        <button
          type="button"
          onClick={() => setModalVaciarAbierto(true)}
          className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Vaciar todas las consultas
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {consultas.map((consulta) => (
          <ConsultationCard key={consulta.id} consulta={consulta} onEliminar={manejarEliminar} />
        ))}
      </div>

      <Modal
        abierto={modalVaciarAbierto}
        onCerrar={() => setModalVaciarAbierto(false)}
        titulo="Vaciar todas las consultas"
        footer={
          <>
            <button
              type="button"
              onClick={() => setModalVaciarAbierto(false)}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirmarVaciarTodo}
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Vaciar todas
            </button>
          </>
        }
      >
        Esta acción eliminará permanentemente todas las solicitudes almacenadas en este navegador. Esta
        acción no se puede deshacer.
      </Modal>
    </div>
  )
}

import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { tiposSolicitud, tratamientosFormulario, horariosPreferidos } from '../data'
import { crearConsulta } from '../utils/consultasStorage'
import { validarFormularioContacto, formularioValoresIniciales } from '../utils/validation'

function CampoTexto({ etiqueta, name, tipo = 'text', valor, onChange, error, obligatorio, placeholder }) {
  const idCampo = `campo-${name}`
  const idError = `${idCampo}-error`

  return (
    <div>
      <label htmlFor={idCampo} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {etiqueta} {obligatorio && <span className="text-red-600">*</span>}
      </label>
      <input
        id={idCampo}
        name={name}
        type={tipo}
        value={valor}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? idError : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 ${
          error
            ? 'border-red-400 focus-visible:ring-red-100'
            : 'border-slate-300 focus-visible:ring-secondary-100'
        }`}
      />
      {error && (
        <p id={idError} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

function CampoSelect({ etiqueta, name, valor, onChange, error, obligatorio, opciones, placeholder }) {
  const idCampo = `campo-${name}`
  const idError = `${idCampo}-error`

  return (
    <div>
      <label htmlFor={idCampo} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {etiqueta} {obligatorio && <span className="text-red-600">*</span>}
      </label>
      <select
        id={idCampo}
        name={name}
        value={valor}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? idError : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-4 ${
          error
            ? 'border-red-400 focus-visible:ring-red-100'
            : 'border-slate-300 focus-visible:ring-secondary-100'
        }`}
      >
        <option value="">{placeholder}</option>
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
      {error && (
        <p id={idError} className="mt-1.5 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [valores, setValores] = useState(formularioValoresIniciales)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [confirmado, setConfirmado] = useState(false)

  const actualizarCampo = (evento) => {
    const { name, value, type, checked } = evento.target
    setValores((previos) => ({ ...previos, [name]: type === 'checkbox' ? checked : value }))
    if (errores[name]) {
      setErrores((previos) => ({ ...previos, [name]: undefined }))
    }
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    const erroresEncontrados = validarFormularioContacto(valores)
    setErrores(erroresEncontrados)

    if (Object.keys(erroresEncontrados).length > 0) return

    setEnviando(true)
    crearConsulta(valores)

    // Simulación breve de envío para dar feedback visual, sin llamadas externas.
    window.setTimeout(() => {
      setEnviando(false)
      setConfirmado(true)
      setValores(formularioValoresIniciales)
    }, 400)
  }

  const solicitarOtra = () => {
    setConfirmado(false)
    setErrores({})
  }

  if (confirmado) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-secondary-100 bg-secondary-50 px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-500 text-white">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-slate-900">Solicitud enviada correctamente.</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-600">
          Nos pondremos en contacto contigo para confirmar los detalles de tu solicitud.
        </p>
        <p className="mt-4 max-w-sm text-xs text-slate-500">
          Esta demostración almacena la solicitud únicamente en este navegador.
        </p>
        <button
          type="button"
          onClick={solicitarOtra}
          className="mt-6 rounded-full border border-secondary-300 px-5 py-2 text-sm font-semibold text-secondary-700 transition hover:bg-secondary-100"
        >
          Enviar otra solicitud
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <CampoTexto
          etiqueta="Nombre completo"
          name="nombre"
          valor={valores.nombre}
          onChange={actualizarCampo}
          error={errores.nombre}
          obligatorio
          placeholder="Tu nombre completo"
        />
        <CampoTexto
          etiqueta="Teléfono"
          name="telefono"
          tipo="tel"
          valor={valores.telefono}
          onChange={actualizarCampo}
          error={errores.telefono}
          obligatorio
          placeholder="+504 0000-0000"
        />
      </div>

      <CampoTexto
        etiqueta="Correo electrónico"
        name="email"
        tipo="email"
        valor={valores.email}
        onChange={actualizarCampo}
        error={errores.email}
        obligatorio
        placeholder="tu@email.com"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <CampoSelect
          etiqueta="Tipo de solicitud"
          name="tipoSolicitud"
          valor={valores.tipoSolicitud}
          onChange={actualizarCampo}
          error={errores.tipoSolicitud}
          obligatorio
          opciones={tiposSolicitud}
          placeholder="Selecciona una opción"
        />
        <CampoSelect
          etiqueta="Tratamiento"
          name="tratamiento"
          valor={valores.tratamiento}
          onChange={actualizarCampo}
          error={errores.tratamiento}
          obligatorio
          opciones={tratamientosFormulario}
          placeholder="Selecciona un tratamiento"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <CampoTexto
          etiqueta="Fecha preferida"
          name="fechaPreferida"
          tipo="date"
          valor={valores.fechaPreferida}
          onChange={actualizarCampo}
          error={errores.fechaPreferida}
          obligatorio
        />
        <CampoSelect
          etiqueta="Horario preferido"
          name="horarioPreferido"
          valor={valores.horarioPreferido}
          onChange={actualizarCampo}
          error={errores.horarioPreferido}
          obligatorio
          opciones={horariosPreferidos}
          placeholder="Selecciona un horario"
        />
      </div>

      <div>
        <label htmlFor="campo-mensaje" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Mensaje <span className="text-slate-500 font-normal">(opcional)</span>
        </label>
        <textarea
          id="campo-mensaje"
          name="mensaje"
          rows={4}
          value={valores.mensaje}
          onChange={actualizarCampo}
          placeholder="Cuéntanos brevemente qué necesitas..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-100"
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            name="consentimiento"
            checked={valores.consentimiento}
            onChange={actualizarCampo}
            aria-invalid={Boolean(errores.consentimiento)}
            aria-describedby={errores.consentimiento ? 'consentimiento-error' : undefined}
            className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-slate-300 text-secondary-700 focus-visible:ring-4 focus-visible:ring-secondary-100"
          />
          <span>
            He leído y acepto la{' '}
            <a href="/privacidad" className="font-semibold text-secondary-700 underline underline-offset-2">
              política de privacidad
            </a>
            . <span className="text-red-600">*</span>
          </span>
        </label>
        {errores.consentimiento && (
          <p id="consentimiento-error" className="mt-1.5 text-xs font-medium text-red-600">
            {errores.consentimiento}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary-700 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-secondary-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary-200 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {enviando ? 'Enviando…' : 'Enviar solicitud'}
        {!enviando && <Send className="h-4 w-4" aria-hidden="true" />}
      </button>
    </form>
  )
}

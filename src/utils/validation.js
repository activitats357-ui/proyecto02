// Validación del formulario de contacto/turnos. Todo el proceso ocurre en el
// frontend; no se realiza ninguna llamada a servicios externos.
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REGEX_TELEFONO = /^[+()\d\s-]{7,20}$/

export function validarFormularioContacto(valores) {
  const errores = {}

  if (!valores.nombre || valores.nombre.trim().length < 3) {
    errores.nombre = 'Introduce tu nombre completo (mínimo 3 caracteres).'
  }

  if (!valores.telefono || !REGEX_TELEFONO.test(valores.telefono.trim())) {
    errores.telefono = 'Introduce un número de teléfono válido.'
  }

  if (!valores.email || !REGEX_EMAIL.test(valores.email.trim())) {
    errores.email = 'Introduce un correo electrónico válido.'
  }

  if (!valores.tipoSolicitud) {
    errores.tipoSolicitud = 'Selecciona el tipo de solicitud.'
  }

  if (!valores.tratamiento) {
    errores.tratamiento = 'Selecciona un tratamiento.'
  }

  if (!valores.fechaPreferida) {
    errores.fechaPreferida = 'Selecciona una fecha preferida.'
  } else {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const fechaSeleccionada = new Date(`${valores.fechaPreferida}T00:00:00`)
    if (fechaSeleccionada < hoy) {
      errores.fechaPreferida = 'La fecha preferida no puede ser anterior a hoy.'
    }
  }

  if (!valores.horarioPreferido) {
    errores.horarioPreferido = 'Selecciona un horario preferido.'
  }

  if (!valores.consentimiento) {
    errores.consentimiento = 'Debes aceptar la política de privacidad para continuar.'
  }

  return errores
}

export const formularioValoresIniciales = {
  nombre: '',
  telefono: '',
  email: '',
  tipoSolicitud: '',
  tratamiento: '',
  fechaPreferida: '',
  horarioPreferido: '',
  mensaje: '',
  consentimiento: false,
}

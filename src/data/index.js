export { centro, horarios } from './centro'
export { servicios, getServicioPorSlug, tratamientosFormulario } from './servicios'
export { profesionales } from './profesionales'

export const diferenciales = [
  {
    icono: 'UserCheck',
    titulo: 'Atención personalizada',
    descripcion: 'Cada paciente recibe una valoración y un tratamiento adaptado a sus necesidades.',
  },
  {
    icono: 'DoorOpen',
    titulo: 'Tres boxes privados',
    descripcion: 'Espacios preparados para ofrecer atención individualizada.',
  },
  {
    icono: 'Compass',
    titulo: 'Enfoque funcional',
    descripcion: 'El objetivo es acompañar al paciente durante su proceso de recuperación y retorno a sus actividades.',
  },
  {
    icono: 'GraduationCap',
    titulo: 'Profesionales especializados',
    descripcion: 'Equipo orientado a fisioterapia deportiva y rehabilitación musculoesquelética.',
  },
]

export const boxes = [
  {
    numero: '01',
    nombre: 'Box 01',
    descripcion: 'Espacio privado preparado para valoraciones y sesiones de tratamiento individualizado.',
  },
  {
    numero: '02',
    nombre: 'Box 02',
    descripcion: 'Espacio privado destinado a terapia manual y trabajo de recuperación funcional.',
  },
  {
    numero: '03',
    nombre: 'Box 03',
    descripcion: 'Espacio privado orientado al ejercicio terapéutico y a la readaptación progresiva.',
  },
]

export const tiposSolicitud = [
  'Solicitar turno',
  'Realizar consulta',
  'Primera valoración',
  'Seguimiento',
]

export const horariosPreferidos = ['Mañana', 'Mediodía', 'Tarde', 'Cualquier horario']

// Catálogo de servicios. Contenido orientativo, no sustituye una valoración
// profesional individual.
export const servicios = [
  {
    slug: 'rehabilitacion-postoperatoria',
    nombre: 'Rehabilitación postoperatoria',
    icono: 'Activity',
    descripcionBreve:
      'Recuperación guiada tras una cirugía traumatológica o deportiva, respetando los tiempos biológicos de cicatrización de cada tejido.',
    descripcion:
      'Programa de recuperación estructurado en fases para pacientes que han pasado por una cirugía de rodilla, hombro, tobillo u otra articulación. Trabajamos de la mano del criterio del cirujano, respetando los plazos de cicatrización y avanzando la carga, la movilidad y el ejercicio de forma progresiva y segura.',
    duracion: '45–60 minutos',
    beneficios: [
      'Recuperación de la movilidad articular dentro de los márgenes seguros de cada fase postoperatoria',
      'Disminución de la inflamación y del dolor asociado al postoperatorio',
      'Progresión de carga y fuerza controlada, evitando complicaciones por sobreesfuerzo',
      'Seguimiento cercano del avance entre valoraciones, con ajustes al plan según la evolución',
    ],
    problemas: [
      'Postoperatorio de ligamento cruzado anterior, menisco o cartílago',
      'Postoperatorio de manguito rotador u otras cirugías de hombro',
      'Rigidez articular y pérdida de fuerza tras la inmovilización',
    ],
  },
  {
    slug: 'descarga-muscular-deportiva',
    nombre: 'Descarga muscular deportiva',
    icono: 'Hand',
    descripcionBreve:
      'Sesión de trabajo manual profundo sobre la musculatura sobrecargada por el entrenamiento o la competición.',
    descripcion:
      'Técnicas de masaje deportivo, liberación miofascial y estiramiento asistido orientadas a reducir la fatiga y la tensión acumulada tras el entrenamiento o la competición. Es una de las sesiones más solicitadas entre deportistas que entrenan con frecuencia y necesitan mantener la musculatura en condiciones óptimas semana a semana.',
    duracion: '30–45 minutos',
    beneficios: [
      'Reduce la sensación de pesadez y fatiga muscular tras cargas de entrenamiento altas',
      'Favorece la recuperación entre sesiones de entrenamiento o competiciones cercanas',
      'Mejora la percepción de flexibilidad y rango de movimiento muscular',
      'Ayuda a identificar zonas de sobrecarga antes de que deriven en una lesión',
    ],
    problemas: [
      'Piernas cargadas tras entrenamientos de volumen alto (carrera, ciclismo, fútbol)',
      'Contracturas y puntos de tensión por acumulación de entrenamientos',
      'Sensación de rigidez muscular generalizada en periodos de competición',
    ],
  },
  {
    slug: 'terapia-manual-ortopedica',
    nombre: 'Terapia manual ortopédica',
    icono: 'HandMetal',
    descripcionBreve:
      'Evaluación y tratamiento manual especializado de articulaciones y tejidos blandos con base en el razonamiento clínico ortopédico.',
    descripcion:
      'Abordaje manual especializado que combina movilizaciones articulares, técnicas de tejido blando y ejercicio de control motor, apoyado en una valoración ortopédica detallada. Se utiliza tanto para molestias puntuales como dentro de planes de tratamiento más largos para condiciones musculoesqueléticas persistentes.',
    duracion: '45–60 minutos',
    beneficios: [
      'Mejora la movilidad articular limitada por rigidez o restricciones mecánicas',
      'Reduce el dolor de origen musculoesquelético mediante técnicas manuales específicas',
      'Identifica el origen mecánico de la molestia, no solo la zona donde se percibe el dolor',
      'Se integra con ejercicio activo para mantener los resultados en el tiempo',
    ],
    problemas: [
      'Dolor lumbar o cervical de origen mecánico',
      'Restricciones de movilidad en hombro, cadera o tobillo',
      'Molestias articulares recurrentes sin causa traumática clara',
    ],
  },
  {
    slug: 'puncion-seca',
    nombre: 'Punción seca',
    icono: 'Target',
    descripcionBreve:
      'Técnica invasiva aplicada por profesionales cualificados para abordar puntos gatillo musculares específicos.',
    descripcion:
      'Técnica que utiliza agujas de fisioterapia para actuar directamente sobre puntos gatillo miofasciales: zonas de tensión muscular localizada que generan dolor referido y limitan el movimiento. Se aplica dentro de un plan de tratamiento individualizado, nunca como técnica aislada.',
    duracion: '30–45 minutos',
    beneficios: [
      'Reduce la tensión localizada en puntos gatillo musculares de difícil acceso manual',
      'Contribuye a disminuir el dolor referido asociado a la musculatura tratada',
      'Complementa y potencia el efecto de la terapia manual y el ejercicio terapéutico',
      'Resultados que suelen notarse desde las primeras sesiones en molestias localizadas',
    ],
    problemas: [
      'Puntos gatillo activos en trapecio, glúteo, gemelo u otras zonas frecuentes',
      'Dolor referido que se irradia desde un punto muscular específico',
      'Tensión muscular persistente que no mejora solo con estiramiento',
    ],
  },
  {
    slug: 'ejercicio-terapeutico',
    nombre: 'Ejercicio terapéutico',
    icono: 'Dumbbell',
    descripcionBreve:
      'Plan de ejercicios individualizado y progresivo para recuperar fuerza, estabilidad y control motor.',
    descripcion:
      'El pilar activo de la recuperación: un plan de ejercicios diseñado a partir de la valoración inicial y ajustado sesión a sesión según el progreso del paciente. Se trabaja fuerza, movilidad, estabilidad y control motor con cargas y ejercicios adaptados a cada objetivo, desde la recuperación básica hasta el retorno al rendimiento deportivo.',
    duracion: '45–60 minutos',
    beneficios: [
      'Recupera fuerza y masa muscular perdida tras una lesión o un periodo de inactividad',
      'Mejora el control motor y la estabilidad articular para prevenir recaídas',
      'Progresión medible: cada sesión parte de los resultados de la anterior',
      'Favorece la autonomía del paciente con ejercicios que puede continuar fuera del centro',
    ],
    problemas: [
      'Debilidad muscular tras una lesión, cirugía o periodo de reposo prolongado',
      'Inestabilidad articular recurrente (esguinces de repetición, por ejemplo)',
      'Necesidad de una base de fuerza antes de retomar el deporte',
    ],
  },
  {
    slug: 'readaptacion-funcional',
    nombre: 'Readaptación funcional deportiva',
    icono: 'RefreshCw',
    descripcionBreve:
      'Última fase del proceso de recuperación: puente estructurado entre el alta clínica y el retorno pleno al deporte.',
    descripcion:
      'Programa progresivo diseñado para deportistas que ya han recuperado la base de fuerza y movilidad, y necesitan reintroducir gestos específicos de su deporte —cambios de dirección, saltos, sprints, contacto— antes de volver a entrenar o competir con normalidad. Reduce el riesgo de recaída en el momento más delicado del proceso: la vuelta a la actividad.',
    duracion: '45–60 minutos',
    beneficios: [
      'Reintroduce gestos deportivos específicos de forma progresiva y controlada',
      'Reduce significativamente el riesgo de recaída al volver a la competición',
      'Evalúa criterios objetivos de rendimiento antes del alta deportiva completa',
      'Genera confianza real en la articulación o zona lesionada antes de competir de nuevo',
    ],
    problemas: [
      'Deportistas en la fase final de recuperación tras una lesión importante',
      'Necesidad de trabajar cambios de dirección, saltos o gestos de contacto de forma segura',
      'Historial de recaídas al retomar la actividad deportiva demasiado pronto',
    ],
  },
]

export const getServicioPorSlug = (slug) => servicios.find((s) => s.slug === slug)

export const tratamientosFormulario = [
  ...servicios.map((s) => s.nombre),
  'No estoy seguro/a',
]

import {
  Activity,
  Hand,
  HandMetal,
  Target,
  Dumbbell,
  Bone,
  RefreshCw,
  UserCheck,
  DoorOpen,
  Compass,
  GraduationCap,
} from 'lucide-react'

// Mapa de nombre de icono (string, usado en los datos) a componente lucide.
export const MAPA_ICONOS = {
  Activity,
  Hand,
  HandMetal,
  Target,
  Dumbbell,
  Bone,
  RefreshCw,
  UserCheck,
  DoorOpen,
  Compass,
  GraduationCap,
}

export function obtenerIcono(nombre) {
  return MAPA_ICONOS[nombre] || Activity
}

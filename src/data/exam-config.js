export const AREAS = [
  { key: 'pensamiento_matematico', label: 'Pensamiento Matemático', count: 30 },
  { key: 'cultura_digital', label: 'Cultura Digital', count: 20 },
  { key: 'conciencia_historica', label: 'Conciencia Histórica', count: 25 },
  { key: 'humanidades', label: 'Humanidades', count: 25 },
  { key: 'ciencias_naturales', label: 'Ciencias Naturales', count: 30 },
  { key: 'lengua_y_comunicacion', label: 'Lengua y Comunicación', count: 30 },
  { key: 'ciencias_sociales', label: 'Ciencias Sociales', count: 20 },
]

export const FULL_EXAM_TOTAL = 180
export const FULL_EXAM_TIME = 4 * 3600 + 30 * 60 // 4h 30min in seconds

export const PRACTICE_COUNTS = [10, 20, 30]

export const EXAM_MODES = {
  FULL: 'full',
  PRACTICE: 'practice',
}

export const EXAM_STATES = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  FINISHED: 'finished',
}

export const FEEDBACK_MODES = {
  IMMEDIATE: 'immediate',
  AT_END: 'at_end',
}

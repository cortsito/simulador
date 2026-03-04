import { AREAS, FULL_EXAM_TOTAL, FULL_EXAM_TIME } from '../data/exam-config'
import { formatTimeVerbose } from '../utils/formatTime'

export default function Home({ onStartFull, onStartPractice }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">
          Prepárate para el <span className="text-blue-400">Ceneval 286</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Practica con simulacros realistas del examen de acreditación de bachillerato.
          Elige un modo para comenzar.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={onStartFull}
          className="group text-left p-6 rounded-xl border border-gray-800 bg-gray-900 hover:border-blue-500/50 hover:bg-gray-900/80 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 text-xl">
              📝
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              Simulacro completo
            </h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            {FULL_EXAM_TOTAL} preguntas con distribución oficial. Temporizador de{' '}
            {formatTimeVerbose(FULL_EXAM_TIME)}.
          </p>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <span key={a.key} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
                {a.label} ({a.count})
              </span>
            ))}
          </div>
        </button>

        <button
          onClick={onStartPractice}
          className="group text-left p-6 rounded-xl border border-gray-800 bg-gray-900 hover:border-emerald-500/50 hover:bg-gray-900/80 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl">
              🎯
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
              Práctica por área
            </h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Elige un área temática y practica a tu ritmo. Configura la cantidad de preguntas
            y el tipo de retroalimentación.
          </p>
          <div className="text-xs text-gray-500">
            7 áreas disponibles • Sin límite de tiempo (opcional)
          </div>
        </button>
      </div>
    </div>
  )
}

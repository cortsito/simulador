import { useState } from 'react'
import { AREAS, PRACTICE_COUNTS, FEEDBACK_MODES } from '../data/exam-config'
import { useQuestionBank } from '../hooks/useQuestionBank'

export default function ExamConfig({ onStart, onBack }) {
  const { getAvailableCount } = useQuestionBank()
  const [area, setArea] = useState(AREAS[0].key)
  const [count, setCount] = useState(PRACTICE_COUNTS[0])
  const [useTimer, setUseTimer] = useState(false)
  const [feedback, setFeedback] = useState(FEEDBACK_MODES.AT_END)

  const available = getAvailableCount(area)
  const selectedArea = AREAS.find((a) => a.key === area)

  const handleStart = () => {
    const timerSeconds = useTimer ? count * 90 : null // 1.5 min per question
    onStart({
      area,
      count: Math.min(count, available),
      timer: timerSeconds,
      feedback,
    })
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="text-sm text-gray-400 hover:text-white mb-6 flex items-center gap-1 transition-colors"
      >
        ← Volver
      </button>

      <h2 className="text-2xl font-bold mb-6">Configurar práctica</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Área temática</label>
          <div className="grid gap-2">
            {AREAS.map((a) => {
              const areaCount = getAvailableCount(a.key)
              return (
                <button
                  key={a.key}
                  onClick={() => setArea(a.key)}
                  className={`text-left px-4 py-3 rounded-lg border transition-all ${
                    area === a.key
                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                      : 'border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <span className="font-medium">{a.label}</span>
                  <span className="text-xs ml-2 text-gray-500">{areaCount} preguntas</span>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cantidad de preguntas
          </label>
          <div className="flex gap-2">
            {PRACTICE_COUNTS.map((c) => (
              <button
                key={c}
                onClick={() => setCount(c)}
                disabled={c > available}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                  count === c
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : c > available
                      ? 'border-gray-800 bg-gray-900/50 text-gray-600 cursor-not-allowed'
                      : 'border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700'
                }`}
              >
                {c}
              </button>
            ))}
            <button
              onClick={() => setCount(available)}
              className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                count === available && !PRACTICE_COUNTS.includes(available)
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700'
              }`}
            >
              Todas ({available})
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={`w-10 h-6 rounded-full transition-colors relative ${
                useTimer ? 'bg-emerald-500' : 'bg-gray-700'
              }`}
              onClick={() => setUseTimer(!useTimer)}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  useTimer ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </div>
            <span className="text-sm text-gray-300">Temporizador</span>
            {useTimer && (
              <span className="text-xs text-gray-500">
                ({Math.round((Math.min(count, available) * 90) / 60)} min)
              </span>
            )}
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Retroalimentación</label>
          <div className="flex gap-2">
            <button
              onClick={() => setFeedback(FEEDBACK_MODES.IMMEDIATE)}
              className={`flex-1 py-2 px-3 rounded-lg border text-sm transition-all ${
                feedback === FEEDBACK_MODES.IMMEDIATE
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700'
              }`}
            >
              Inmediata
            </button>
            <button
              onClick={() => setFeedback(FEEDBACK_MODES.AT_END)}
              className={`flex-1 py-2 px-3 rounded-lg border text-sm transition-all ${
                feedback === FEEDBACK_MODES.AT_END
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                  : 'border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700'
              }`}
            >
              Al final
            </button>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors"
        >
          Iniciar práctica ({Math.min(count, available)} preguntas)
        </button>
      </div>
    </div>
  )
}

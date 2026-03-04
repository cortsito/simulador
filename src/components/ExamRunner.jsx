import { useState } from 'react'
import { FEEDBACK_MODES } from '../data/exam-config'
import { formatTime } from '../utils/formatTime'
import Question from './Question'

export default function ExamRunner({
  questions,
  answers,
  currentIndex,
  currentQuestion,
  marked,
  timeElapsed,
  timeLimit,
  feedbackMode,
  totalQuestions,
  answeredCount,
  onAnswer,
  onToggleMark,
  onGoTo,
  onNext,
  onPrev,
  onFinish,
}) {
  const [showNav, setShowNav] = useState(false)

  if (!currentQuestion) return null

  const isMarked = marked.has(currentIndex)
  const showFeedback =
    feedbackMode === FEEDBACK_MODES.IMMEDIATE && answers[currentIndex] !== undefined
  const timeRemaining = timeLimit ? timeLimit - timeElapsed : null
  const isLowTime = timeRemaining !== null && timeRemaining < 300 // 5 min

  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center gap-3">
          <span className="text-gray-400">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-500">
            {answeredCount} respondidas
          </span>
        </div>

        <div className="flex items-center gap-3">
          {timeLimit ? (
            <span className={`font-mono ${isLowTime ? 'text-red-400' : 'text-gray-400'}`}>
              {formatTime(Math.max(0, timeRemaining))}
            </span>
          ) : (
            <span className="font-mono text-gray-500">{formatTime(timeElapsed)}</span>
          )}
          <button
            onClick={() => setShowNav(!showNav)}
            className="px-3 py-1 rounded-lg border border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white text-xs transition-colors"
          >
            Navegación
          </button>
        </div>
      </div>

      {/* Question nav panel */}
      {showNav && (
        <div className="mb-4 p-4 rounded-xl border border-gray-800 bg-gray-900">
          <div className="flex flex-wrap gap-2">
            {questions.map((_, i) => {
              const isAnswered = answers[i] !== undefined
              const isCurrent = i === currentIndex
              const isQuestionMarked = marked.has(i)

              let bg = 'bg-gray-800 text-gray-500'
              if (isCurrent) bg = 'bg-blue-500 text-white'
              else if (isAnswered) bg = 'bg-gray-700 text-white'

              return (
                <button
                  key={i}
                  onClick={() => {
                    onGoTo(i)
                    setShowNav(false)
                  }}
                  className={`w-9 h-9 rounded-lg text-xs font-medium transition-all ${bg} ${
                    isQuestionMarked ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-gray-700 inline-block" /> Respondida
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-blue-500 inline-block" /> Actual
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded ring-2 ring-yellow-400 inline-block" /> Marcada
            </span>
          </div>
        </div>
      )}

      {/* Area label */}
      <div className="mb-3">
        <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">
          {currentQuestion.area_label}
          {currentQuestion.subarea_label && ` — ${currentQuestion.subarea_label}`}
        </span>
      </div>

      {/* Question */}
      <Question
        question={currentQuestion}
        selectedOption={answers[currentIndex]}
        onSelect={(optionIndex) => onAnswer(currentIndex, optionIndex)}
        showFeedback={showFeedback}
      />

      {/* Bottom nav */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-lg border border-gray-700 text-sm text-gray-400 hover:border-gray-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Anterior
        </button>

        <button
          onClick={() => onToggleMark(currentIndex)}
          className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
            isMarked
              ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
              : 'border-gray-700 text-gray-400 hover:border-gray-600'
          }`}
        >
          {isMarked ? '★ Marcada' : '☆ Marcar'}
        </button>

        {currentIndex < totalQuestions - 1 ? (
          <button
            onClick={onNext}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
          >
            Siguiente →
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
          >
            Terminar
          </button>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { formatTimeVerbose } from '../utils/formatTime'
import { getScoreColor, getScoreBg } from '../utils/scoring'
import { useAnkiDeck } from '../hooks/useAnkiDeck'
import QuestionReview from './QuestionReview'

export default function Results({ results, onReset }) {
  const [filter, setFilter] = useState('all') // all | incorrect | unanswered
  const { deck, addCard } = useAnkiDeck()

  const filteredQuestions = results.questions
    .map((q, i) => ({ question: q, index: i, answer: results.answers[i] }))
    .filter((item) => {
      if (filter === 'incorrect') {
        return item.answer !== undefined && item.answer !== item.question.correctIndex
      }
      if (filter === 'unanswered') {
        return item.answer === undefined
      }
      return true
    })

  const incorrectCount = results.questions.filter(
    (q, i) => results.answers[i] !== undefined && results.answers[i] !== q.correctIndex
  ).length
  const unansweredCount = results.questions.filter(
    (_, i) => results.answers[i] === undefined
  ).length

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Score header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Resultados</h2>
        <div
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border ${getScoreBg(results.percentage)}`}
        >
          <span className={`text-4xl font-bold ${getScoreColor(results.percentage)}`}>
            {results.percentage}%
          </span>
        </div>
        <p className="text-gray-400 mt-2 text-sm">
          {results.correct} de {results.total} correctas • Tiempo:{' '}
          {formatTimeVerbose(results.timeElapsed)} • Promedio:{' '}
          {formatTimeVerbose(results.averageTime)}/pregunta
        </p>
      </div>

      {/* Score by area */}
      {results.byArea.length > 1 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Desglose por área</h3>
          <div className="space-y-2">
            {results.byArea.map((area) => (
              <div
                key={area.area}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-800 bg-gray-900"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">{area.areaLabel}</span>
                    <span className={`text-sm font-medium ${getScoreColor(area.percentage)}`}>
                      {area.percentage}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${area.percentage >= 70
                          ? 'bg-emerald-400'
                          : area.percentage >= 50
                            ? 'bg-yellow-400'
                            : 'bg-red-400'
                        }`}
                      style={{ width: `${area.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500 w-16 text-right">
                  {area.correct}/{area.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter + question review */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm text-gray-400">Mostrar:</span>
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg text-xs transition-colors ${filter === 'all'
              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
              : 'text-gray-500 hover:text-gray-300'
            }`}
        >
          Todas ({results.total})
        </button>
        <button
          onClick={() => setFilter('incorrect')}
          className={`px-3 py-1 rounded-lg text-xs transition-colors ${filter === 'incorrect'
              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
              : 'text-gray-500 hover:text-gray-300'
            }`}
        >
          Incorrectas ({incorrectCount})
        </button>
        <button
          onClick={() => setFilter('unanswered')}
          className={`px-3 py-1 rounded-lg text-xs transition-colors ${filter === 'unanswered'
              ? 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
              : 'text-gray-500 hover:text-gray-300'
            }`}
        >
          Sin responder ({unansweredCount})
        </button>
      </div>

      <div className="space-y-3">
        {filteredQuestions.map((item) => (
          <QuestionReview
            key={item.index}
            question={item.question}
            questionIndex={item.index}
            userAnswer={item.answer}
            onSaveForAnki={addCard}
            isInDeck={deck.some((card) => card.id === item.question.id)}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3 justify-center">
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}

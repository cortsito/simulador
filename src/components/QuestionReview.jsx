export default function QuestionReview({ question, questionIndex, userAnswer, onSaveForAnki, isInDeck }) {
  const isCorrect = userAnswer === question.correctIndex
  const wasAnswered = userAnswer !== undefined

  return (
    <div
      className={`p-4 rounded-xl border ${!wasAnswered
          ? 'border-gray-700 bg-gray-800/30'
          : isCorrect
            ? 'border-emerald-500/30 bg-emerald-500/5'
            : 'border-red-500/30 bg-red-500/5'
        }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <span className="text-xs font-mono text-gray-500 mt-1">{questionIndex + 1}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
              {question.area_label}
            </span>
            {!wasAnswered ? (
              <span className="text-xs text-gray-500">Sin responder</span>
            ) : isCorrect ? (
              <span className="text-xs text-emerald-400">Correcta</span>
            ) : (
              <span className="text-xs text-red-400">Incorrecta</span>
            )}
          </div>
          <p className="text-sm text-gray-200 mb-3">{question.question}</p>

          <div className="space-y-1.5">
            {question.options.map((option, i) => {
              const isThisCorrect = i === question.correctIndex
              const isUserChoice = i === userAnswer

              let textColor = 'text-gray-500'
              if (isThisCorrect) textColor = 'text-emerald-400'
              else if (isUserChoice && !isThisCorrect) textColor = 'text-red-400'

              return (
                <div key={i} className={`text-sm flex items-center gap-2 ${textColor}`}>
                  <span className="w-5 text-center text-xs">
                    {isThisCorrect ? '✓' : isUserChoice ? '✗' : ' '}
                  </span>
                  <span>
                    {String.fromCharCode(65 + i)}) {option}
                  </span>
                </div>
              )
            })}
          </div>

          <p className="mt-3 text-xs text-gray-400 leading-relaxed">
            <span className="text-blue-400 font-medium">Explicación:</span> {question.explanation}
          </p>

          {onSaveForAnki && (
            <div className="mt-3">
              {isInDeck ? (
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 border border-gray-700 bg-gray-800/50 cursor-not-allowed"
                >
                  Ya guardada
                </button>
              ) : (
                <button
                  onClick={() => onSaveForAnki(question)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 border border-blue-500/30 hover:bg-blue-500/10 transition-colors"
                >
                  Guardar para Anki
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

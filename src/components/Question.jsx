export default function Question({ question, selectedOption, onSelect, showFeedback }) {
  return (
    <div>
      <p className="text-base md:text-lg text-gray-100 mb-6 leading-relaxed">
        {question.question}
      </p>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index
          const isCorrect = index === question.correctIndex
          const showResult = showFeedback && selectedOption !== undefined

          let style = 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'

          if (isSelected && !showResult) {
            style = 'border-blue-500 bg-blue-500/10'
          } else if (showResult && isCorrect) {
            style = 'border-emerald-500 bg-emerald-500/10'
          } else if (showResult && isSelected && !isCorrect) {
            style = 'border-red-500 bg-red-500/10'
          }

          return (
            <button
              key={index}
              onClick={() => !showFeedback && onSelect(index)}
              disabled={showFeedback}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${style} ${
                showFeedback ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <span className="w-7 h-7 rounded-full border border-gray-600 flex items-center justify-center text-xs font-medium shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm md:text-base">{option}</span>
              </span>
            </button>
          )
        })}
      </div>

      {showFeedback && selectedOption !== undefined && (
        <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
          <p className="text-sm text-gray-300">
            <span className="font-medium text-blue-400">Explicación: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}

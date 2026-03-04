export function calculateScore(questions, answers) {
  let correct = 0
  questions.forEach((q, i) => {
    if (answers[i] === q.correctIndex) correct++
  })
  return {
    correct,
    total: questions.length,
    percentage: questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0,
  }
}

export function calculateScoreByArea(questions, answers) {
  const byArea = {}

  questions.forEach((q, i) => {
    const area = q.area
    if (!byArea[area]) {
      byArea[area] = { area, areaLabel: q.area_label, correct: 0, total: 0 }
    }
    byArea[area].total++
    if (answers[i] === q.correctIndex) {
      byArea[area].correct++
    }
  })

  return Object.values(byArea).map((entry) => ({
    ...entry,
    percentage: entry.total > 0 ? Math.round((entry.correct / entry.total) * 100) : 0,
  }))
}

export function getScoreColor(percentage) {
  if (percentage >= 70) return 'text-emerald-400'
  if (percentage >= 50) return 'text-yellow-400'
  return 'text-red-400'
}

export function getScoreBg(percentage) {
  if (percentage >= 70) return 'bg-emerald-400/10 border-emerald-400/30'
  if (percentage >= 50) return 'bg-yellow-400/10 border-yellow-400/30'
  return 'bg-red-400/10 border-red-400/30'
}

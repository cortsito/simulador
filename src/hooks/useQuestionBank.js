import { useCallback } from 'react'
import allQuestions from '../data/questions.json'
import { shuffle } from '../utils/shuffle'

export function useQuestionBank() {
  const getQuestions = useCallback((area = null, count = null, difficulty = null) => {
    let filtered = allQuestions

    if (area) {
      filtered = filtered.filter((q) => q.area === area)
    }

    if (difficulty) {
      filtered = filtered.filter((q) => q.difficulty === difficulty)
    }

    let selected = shuffle(filtered)

    if (count && count < selected.length) {
      selected = selected.slice(0, count)
    }

    return selected.map(shuffleOptions)
  }, [])

  const getQuestionsByDistribution = useCallback((distribution) => {
    const questions = []

    for (const { area, count } of distribution) {
      const areaQuestions = allQuestions.filter((q) => q.area === area)
      const shuffled = shuffle(areaQuestions)
      const selected = shuffled.slice(0, Math.min(count, shuffled.length))
      questions.push(...selected.map(shuffleOptions))
    }

    return shuffle(questions)
  }, [])

  const getAvailableCount = useCallback((area) => {
    if (!area) return allQuestions.length
    return allQuestions.filter((q) => q.area === area).length
  }, [])

  return { getQuestions, getQuestionsByDistribution, getAvailableCount }
}

function shuffleOptions(question) {
  const indices = question.options.map((_, i) => i)
  const shuffledIndices = shuffle(indices)

  const shuffledOptions = shuffledIndices.map((i) => question.options[i])
  const correctIndex = shuffledIndices.indexOf(question.answer)

  return {
    ...question,
    options: shuffledOptions,
    correctIndex,
    originalAnswer: question.answer,
  }
}

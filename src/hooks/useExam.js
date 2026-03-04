import { useState, useCallback, useRef, useEffect } from 'react'
import { EXAM_STATES, EXAM_MODES, FULL_EXAM_TIME, AREAS } from '../data/exam-config'
import { useQuestionBank } from './useQuestionBank'
import { calculateScore, calculateScoreByArea } from '../utils/scoring'

export function useExam() {
  const { getQuestions, getQuestionsByDistribution } = useQuestionBank()

  const [examState, setExamState] = useState(EXAM_STATES.NOT_STARTED)
  const [mode, setMode] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [marked, setMarked] = useState(new Set())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timeLimit, setTimeLimit] = useState(null)
  const [feedbackMode, setFeedbackMode] = useState('at_end')
  const timerRef = useRef(null)

  useEffect(() => {
    if (examState === EXAM_STATES.IN_PROGRESS) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => {
          const next = prev + 1
          if (timeLimit && next >= timeLimit) {
            finishExam()
            return timeLimit
          }
          return next
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [examState, timeLimit])

  const startFullExam = useCallback(() => {
    const distribution = AREAS.map(({ key, count }) => ({ area: key, count }))
    const selected = getQuestionsByDistribution(distribution)
    setQuestions(selected)
    setAnswers({})
    setCurrentIndex(0)
    setMarked(new Set())
    setTimeElapsed(0)
    setTimeLimit(FULL_EXAM_TIME)
    setMode(EXAM_MODES.FULL)
    setFeedbackMode('at_end')
    setExamState(EXAM_STATES.IN_PROGRESS)
  }, [getQuestionsByDistribution])

  const startPractice = useCallback(
    ({ area, count, timer, feedback }) => {
      const selected = getQuestions(area, count)
      setQuestions(selected)
      setAnswers({})
      setCurrentIndex(0)
      setMarked(new Set())
      setTimeElapsed(0)
      setTimeLimit(timer || null)
      setMode(EXAM_MODES.PRACTICE)
      setFeedbackMode(feedback || 'at_end')
      setExamState(EXAM_STATES.IN_PROGRESS)
    },
    [getQuestions]
  )

  const answerQuestion = useCallback((questionIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }))
  }, [])

  const toggleMark = useCallback((questionIndex) => {
    setMarked((prev) => {
      const next = new Set(prev)
      if (next.has(questionIndex)) {
        next.delete(questionIndex)
      } else {
        next.add(questionIndex)
      }
      return next
    })
  }, [])

  const goToQuestion = useCallback(
    (index) => {
      if (index >= 0 && index < questions.length) {
        setCurrentIndex(index)
      }
    },
    [questions.length]
  )

  const nextQuestion = useCallback(() => {
    goToQuestion(currentIndex + 1)
  }, [currentIndex, goToQuestion])

  const prevQuestion = useCallback(() => {
    goToQuestion(currentIndex - 1)
  }, [currentIndex, goToQuestion])

  const finishExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setExamState(EXAM_STATES.FINISHED)
  }, [])

  const resetExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setExamState(EXAM_STATES.NOT_STARTED)
    setQuestions([])
    setAnswers({})
    setCurrentIndex(0)
    setMarked(new Set())
    setTimeElapsed(0)
    setTimeLimit(null)
    setMode(null)
  }, [])

  const getResults = useCallback(() => {
    const score = calculateScore(questions, answers)
    const byArea = calculateScoreByArea(questions, answers)

    return {
      ...score,
      byArea,
      timeElapsed,
      averageTime: questions.length > 0 ? Math.round(timeElapsed / questions.length) : 0,
      questions,
      answers,
      mode,
    }
  }, [questions, answers, timeElapsed, mode])

  return {
    examState,
    mode,
    questions,
    answers,
    currentIndex,
    currentQuestion: questions[currentIndex] || null,
    marked,
    timeElapsed,
    timeLimit,
    feedbackMode,
    totalQuestions: questions.length,
    answeredCount: Object.keys(answers).length,
    startFullExam,
    startPractice,
    answerQuestion,
    toggleMark,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    finishExam,
    resetExam,
    getResults,
  }
}

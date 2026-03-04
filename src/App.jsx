import { useState } from 'react'
import { EXAM_STATES } from './data/exam-config'
import { useExam } from './hooks/useExam'
import { useAnkiDeck } from './hooks/useAnkiDeck'
import Layout from './components/Layout'
import Home from './components/Home'
import ExamConfig from './components/ExamConfig'
import ExamRunner from './components/ExamRunner'
import Results from './components/Results'
import Terms from './components/Terms'
import AnkiDeck from './components/AnkiDeck'

const VIEWS = {
  HOME: 'home',
  CONFIG: 'config',
  EXAM: 'exam',
  RESULTS: 'results',
  TERMS: 'terms',
  REPASO: 'repaso',
}

export default function App() {
  const [view, setView] = useState(VIEWS.HOME)
  const [results, setResults] = useState(null)
  const exam = useExam()
  const { deckCount } = useAnkiDeck()

  const handleStartFull = () => {
    exam.startFullExam()
    setView(VIEWS.EXAM)
  }

  const handleStartPractice = () => {
    setView(VIEWS.CONFIG)
  }

  const handleConfigStart = (config) => {
    exam.startPractice(config)
    setView(VIEWS.EXAM)
  }

  const handleFinish = () => {
    exam.finishExam()
    setResults(exam.getResults())
    setView(VIEWS.RESULTS)
  }

  const handleReset = () => {
    exam.resetExam()
    setResults(null)
    setView(VIEWS.HOME)
  }

  return (
    <Layout
      onNavigateHome={() => setView(VIEWS.HOME)}
      onNavigateTerms={() => setView(VIEWS.TERMS)}
      onNavigateRepaso={() => setView(VIEWS.REPASO)}
      ankiDeckCount={deckCount}
    >
      {view === VIEWS.HOME && (
        <Home onStartFull={handleStartFull} onStartPractice={handleStartPractice} />
      )}

      {view === VIEWS.CONFIG && (
        <ExamConfig onStart={handleConfigStart} onBack={() => setView(VIEWS.HOME)} />
      )}

      {view === VIEWS.EXAM && (
        <ExamRunner
          questions={exam.questions}
          answers={exam.answers}
          currentIndex={exam.currentIndex}
          currentQuestion={exam.currentQuestion}
          marked={exam.marked}
          timeElapsed={exam.timeElapsed}
          timeLimit={exam.timeLimit}
          feedbackMode={exam.feedbackMode}
          totalQuestions={exam.totalQuestions}
          answeredCount={exam.answeredCount}
          onAnswer={exam.answerQuestion}
          onToggleMark={exam.toggleMark}
          onGoTo={exam.goToQuestion}
          onNext={exam.nextQuestion}
          onPrev={exam.prevQuestion}
          onFinish={handleFinish}
        />
      )}

      {view === VIEWS.RESULTS && results && (
        <Results results={results} onReset={handleReset} />
      )}

      {view === VIEWS.TERMS && (
        <Terms onBack={() => setView(VIEWS.HOME)} />
      )}

      {view === VIEWS.REPASO && (
        <AnkiDeck />
      )}
    </Layout>
  )
}

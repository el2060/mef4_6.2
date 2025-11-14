import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSimulatorStore } from '../store/simulatorStore'
import BeamVisualization from './BeamVisualization'

interface QuizOption {
  id: string
  text: string
  correct: boolean
  explanation?: string
}

interface Question {
  id: string
  question: string
  options: QuizOption[]
  forceId: string
}

const questions: Question[] = [
  {
    id: 'q1',
    question: 'Which of these are vertical forces acting on the beam?',
    forceId: 'weight',
    options: [
      { id: 'a', text: 'Weight (W) acting downward', correct: true },
      { id: 'b', text: 'Friction force acting horizontally', correct: false, explanation: 'Friction is horizontal, not vertical.' },
      { id: 'c', text: 'Tension acting at an angle', correct: false, explanation: 'No tension forces in this problem.' },
    ],
  },
  {
    id: 'q2',
    question: 'Where should the reaction at support B act?',
    forceId: 'reaction-b-v',
    options: [
      { id: 'a', text: 'Only vertically upward', correct: false, explanation: 'Hinges provide both components.' },
      { id: 'b', text: 'Both horizontal and vertical components', correct: true },
      { id: 'c', text: 'Only horizontally', correct: false, explanation: 'Support must resist vertical loads too.' },
    ],
  },
  {
    id: 'q3',
    question: 'What type of support is at point D?',
    forceId: 'reaction-d',
    options: [
      { id: 'a', text: 'Pin support (horizontal & vertical)', correct: false, explanation: 'Point D is a roller support.' },
      { id: 'b', text: 'Roller support (vertical only)', correct: true },
      { id: 'c', text: 'Fixed support (moment & forces)', correct: false, explanation: 'No moment resistance at D.' },
    ],
  },
  {
    id: 'q4',
    question: 'Does the hinge reaction at B have horizontal component?',
    forceId: 'reaction-b-h',
    options: [
      { id: 'a', text: 'No, hinges only provide vertical reactions', correct: false, explanation: 'Hinges provide both horizontal and vertical reaction components.' },
      { id: 'b', text: 'Yes, hinges provide both horizontal and vertical components', correct: true },
      { id: 'c', text: 'Only if there is a horizontal applied force', correct: false, explanation: 'Hinges can have horizontal reactions even without applied horizontal forces.' },
    ],
  },
]

export default function Step1IdentifyForces() {
  const { forces, identifyForce } = useSimulatorStore()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  
  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const allComplete = forces.every((f) => f.identified)
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    setShowFeedback(true)
    
    const option = currentQuestion.options.find((o) => o.id === optionId)
    if (option?.correct) {
      identifyForce(currentQuestion.forceId)
      
      // Auto-advance after a delay
      setTimeout(() => {
        if (!isLastQuestion) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setSelectedOption(null)
          setShowFeedback(false)
        }
      }, 1500)
    }
  }
  
  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    }
  }
  
  const selectedOptionData = currentQuestion.options.find((o) => o.id === selectedOption)
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <h2 className="text-2xl font-bold mb-3 text-md-text">
          Step 1: Identify Forces
        </h2>
        <p className="text-md-text/80 mb-4">
          Answer the following questions to identify all forces acting on the beam. 
          The visualization will update as you correctly identify each force.
        </p>
        
        {/* Progress indicator */}
        <div className="flex items-center space-x-2 mb-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                index < currentQuestionIndex
                  ? 'bg-md-teal'
                  : index === currentQuestionIndex
                  ? 'bg-md-blue'
                  : 'bg-md-cloud'
              }`}
            />
          ))}
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quiz Section */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="mb-4">
            <span className="text-sm font-semibold text-md-text/60 uppercase">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <h3 className="text-xl font-bold mt-2 text-md-text">
              {currentQuestion.question}
            </h3>
          </div>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === option.id
                    ? option.correct
                      ? 'border-md-teal bg-md-teal/10'
                      : 'border-md-coral bg-md-coral/10'
                    : 'border-md-border bg-md-surface hover:border-md-blue hover:bg-md-blue/5'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{option.text}</span>
                  {showFeedback && selectedOption === option.id && (
                    <span className="text-xl">
                      {option.correct ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Feedback */}
          {showFeedback && selectedOptionData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-xl ${
                selectedOptionData.correct
                  ? 'bg-md-teal/10 border border-md-teal'
                  : 'bg-md-coral/10 border border-md-coral'
              }`}
            >
              <p className={`font-semibold ${
                selectedOptionData.correct ? 'text-md-teal' : 'text-md-coral'
              }`}>
                {selectedOptionData.correct ? '✓ Correct!' : '✗ Not quite'}
              </p>
              {selectedOptionData.explanation && (
                <p className="text-sm mt-1 text-md-text/80">
                  {selectedOptionData.explanation}
                </p>
              )}
            </motion.div>
          )}
          
          {/* Skip button */}
          {!isLastQuestion && !allComplete && (
            <button
              onClick={handleNext}
              className="mt-4 text-sm text-md-blue hover:underline"
            >
              Skip this question →
            </button>
          )}
        </motion.div>
        
        {/* Visualization Section */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4 text-md-text">
            Beam Diagram
          </h3>
          <BeamVisualization highlightForce={currentQuestion.forceId} />
          
          {allComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-md-teal/10 border border-md-teal rounded-xl"
            >
              <p className="font-semibold text-md-teal text-center">
                🎉 All forces identified! Proceed to the next step.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

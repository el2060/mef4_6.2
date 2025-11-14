import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import StepIndicator from './components/StepIndicator'
import Step1IdentifyForces from './components/Step1IdentifyForces'
import Step2BalanceForces from './components/Step2BalanceForces'
import Step3BalanceMoments from './components/Step3BalanceMoments'
import CompletionSummary from './components/CompletionSummary'
import { useSimulatorStore } from './store/simulatorStore'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const { step1Complete, step2Complete, step3Complete, resetSimulation } = useSimulatorStore()

  const canProceed = (step: number) => {
    switch (step) {
      case 1:
        return step1Complete
      case 2:
        return step2Complete
      case 3:
        return step3Complete
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 3 && canProceed(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleReset = () => {
    resetSimulation()
    setCurrentStep(1)
  }

  const allStepsComplete = step1Complete && step2Complete && step3Complete

  return (
    <div className="min-h-screen bg-md-bg font-plexmono">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-3 text-md-text">
            Rigid Body Equilibrium Walk-Through
          </h1>
          <p className="text-lg text-md-text/80">
            Chapter 6.2 - Newton's First Law of Motion
          </p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {currentStep === 1 && <Step1IdentifyForces />}
            {currentStep === 2 && <Step2BalanceForces />}
            {currentStep === 3 && <Step3BalanceMoments />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="btn bg-md-surface text-md-text border border-md-border hover:bg-md-cloud disabled:opacity-50"
          >
            ← Back
          </button>

          <button
            onClick={handleReset}
            className="btn bg-md-coral text-white hover:bg-md-coral/90"
          >
            Reset All
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed(currentStep)}
              className="btn bg-md-blue text-white hover:bg-md-blueHover disabled:opacity-50"
            >
              Next →
            </button>
          ) : (
            <div className="w-[120px]" /> // Spacer
          )}
        </div>

        {/* Completion Summary Modal */}
        <AnimatePresence>
          {allStepsComplete && (
            <CompletionSummary onClose={handleReset} />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App

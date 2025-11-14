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
    <div className="min-h-screen bg-md-bg font-plexmono flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-md-text tracking-tight">
            Rigid Body Equilibrium Walk-Through
          </h1>
          <p className="text-xl md:text-2xl text-md-text/80 font-medium">
            Chapter 6.2 &mdash; Newton's First Law of Motion
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="mb-8">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-10"
          >
            {currentStep === 1 && <Step1IdentifyForces />}
            {currentStep === 2 && <Step2BalanceForces />}
            {currentStep === 3 && <Step3BalanceMoments />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-3xl mx-auto mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="btn bg-md-surface text-md-text border border-md-border hover:bg-md-cloud focus-visible:ring-2 focus-visible:ring-md-blue disabled:opacity-50 shadow-sm"
          >
             Back
          </button>

          <button
            onClick={handleReset}
            className="btn bg-md-coral text-white hover:bg-md-coral/90 focus-visible:ring-2 focus-visible:ring-md-coral shadow-sm"
          >
            Reset All
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed(currentStep)}
              className="btn bg-md-blue text-white hover:bg-md-blue-hover focus-visible:ring-2 focus-visible:ring-md-blue disabled:opacity-50 shadow-sm"
            >
              Next 
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
      <footer className="text-center py-6 text-md-text/60 text-sm">
        &copy; {new Date().getFullYear()} Rigid Body Simulator. All rights reserved.
      </footer>
    </div>
  )
}

export default App

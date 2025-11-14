import { motion } from 'framer-motion'
import { useSimulatorStore } from '../store/simulatorStore'

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { step1Complete, step2Complete, step3Complete } = useSimulatorStore()
  
  const steps = [
    { number: 1, title: 'Identify Forces', complete: step1Complete },
    { number: 2, title: 'Balance Forces', complete: step2Complete },
    { number: 3, title: 'Balance Moments', complete: step3Complete },
  ]
  
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-md-cloud rounded-full">
          <motion.div
            className="h-full bg-md-blue rounded-full shadow-md"
            initial={{ width: '0%' }}
            animate={{
              width: step3Complete ? '100%' : step2Complete ? '66%' : step1Complete ? '33%' : '0%'
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="flex flex-col items-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: step.number * 0.1 }}
              tabIndex={0}
              aria-current={currentStep === step.number ? 'step' : undefined}
              aria-label={`Step ${step.number}: ${step.title}`}
            >
              <motion.div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base border-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-md-blue outline-none ${
                  currentStep === step.number
                    ? 'bg-md-blue text-white border-md-blue scale-110 shadow-lg'
                    : step.complete
                    ? 'bg-md-teal text-white border-md-teal'
                    : 'bg-md-surface text-md-text/50 border-md-border group-hover:scale-105'
                }`}
                whileHover={{ scale: 1.12 }}
              >
                {step.complete ? '' : step.number}
              </motion.div>
              <p
                className={`mt-2 text-sm md:text-base font-semibold text-center max-w-[140px] ${
                  currentStep === step.number
                    ? 'text-md-text'
                    : 'text-md-text/60'
                }`}
              >
                {step.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

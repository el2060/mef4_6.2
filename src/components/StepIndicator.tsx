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
        <div className="absolute top-5 left-0 right-0 h-1 bg-md-cloud">
          <motion.div
            className="h-full bg-md-blue"
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
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: step.number * 0.1 }}
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                  currentStep === step.number
                    ? 'bg-md-blue text-white border-md-blue scale-110 shadow-lg'
                    : step.complete
                    ? 'bg-md-teal text-white border-md-teal'
                    : 'bg-md-surface text-md-text/50 border-md-border'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {step.complete ? '✓' : step.number}
              </motion.div>
              <p
                className={`mt-2 text-sm font-semibold text-center max-w-[120px] ${
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

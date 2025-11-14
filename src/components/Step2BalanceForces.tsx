import { motion } from 'framer-motion'
import { useSimulatorStore } from '../store/simulatorStore'
import BeamVisualization from './BeamVisualization'
import ForceSlider from './ForceSlider'

export default function Step2BalanceForces() {
  const {
    reactionBHorizontal,
    reactionBVertical,
    reactionD,
    forceBalanceX,
    forceBalanceY,
    setReactionBHorizontal,
    setReactionBVertical,
    setReactionD,
  } = useSimulatorStore()
  
  const getBalanceColor = (status: 'unbalanced' | 'almost' | 'balanced') => {
    switch (status) {
      case 'balanced':
        return 'text-md-teal'
      case 'almost':
        return 'text-md-yellowSoft'
      case 'unbalanced':
        return 'text-md-coral'
    }
  }
  
  const getBalanceIcon = (status: 'unbalanced' | 'almost' | 'balanced') => {
    switch (status) {
      case 'balanced':
        return '🟢'
      case 'almost':
        return '🟡'
      case 'unbalanced':
        return '🔴'
    }
  }
  
  const getBalanceText = (status: 'unbalanced' | 'almost' | 'balanced') => {
    switch (status) {
      case 'balanced':
        return 'Balanced'
      case 'almost':
        return 'Almost Balanced'
      case 'unbalanced':
        return 'Unbalanced'
    }
  }
  
  const bothBalanced = forceBalanceX === 'balanced' && forceBalanceY === 'balanced'
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <h2 className="text-2xl font-bold mb-3 text-md-text">
          Step 2: Balance Forces
        </h2>
        <p className="text-md-text/80 mb-4">
          Adjust the sliders to balance all forces. Watch the force indicators turn green 
          when equilibrium is achieved (ΣFx = 0, ΣFy = 0).
        </p>
        
        {/* Balance Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-md-cloud rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Horizontal (ΣFx)</span>
              <span className={`font-bold ${getBalanceColor(forceBalanceX)}`}>
                {getBalanceIcon(forceBalanceX)} {getBalanceText(forceBalanceX)}
              </span>
            </div>
          </div>
          <div className="p-4 bg-md-cloud rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Vertical (ΣFy)</span>
              <span className={`font-bold ${getBalanceColor(forceBalanceY)}`}>
                {getBalanceIcon(forceBalanceY)} {getBalanceText(forceBalanceY)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls Section */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h3 className="text-lg font-bold mb-4 text-md-text">
              Adjust Reaction Forces
            </h3>
            
            <div className="space-y-6">
              <ForceSlider
                label="Reaction at B (Horizontal)"
                value={reactionBHorizontal}
                onChange={setReactionBHorizontal}
                min={-50}
                max={50}
                unit="N"
                color="blue"
              />
              
              <ForceSlider
                label="Reaction at B (Vertical)"
                value={reactionBVertical}
                onChange={setReactionBVertical}
                min={0}
                max={150}
                unit="N"
                color="teal"
              />
              
              <ForceSlider
                label="Reaction at D"
                value={reactionD}
                onChange={setReactionD}
                min={0}
                max={150}
                unit="N"
                color="turquoise"
              />
            </div>
          </motion.div>
          
          {/* Hints */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-md-blue/5 border-md-blue"
          >
            <h4 className="font-bold mb-2 text-md-text">💡 Hints:</h4>
            <ul className="text-sm text-md-text/80 space-y-1 list-disc list-inside">
              <li>Weight = 100N downward</li>
              <li>For horizontal equilibrium: ΣFx should be close to zero</li>
              <li>For vertical equilibrium: Upward forces = Downward forces</li>
              <li>The traffic light indicators help you get close!</li>
            </ul>
          </motion.div>
        </div>
        
        {/* Visualization Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h3 className="text-lg font-bold mb-4 text-md-text">
            Force Diagram
          </h3>
          <BeamVisualization />
          
          {bothBalanced && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 bg-md-teal/10 border border-md-teal rounded-xl"
            >
              <p className="font-semibold text-md-teal text-center">
                🎉 Forces are balanced! Proceed to balance moments.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

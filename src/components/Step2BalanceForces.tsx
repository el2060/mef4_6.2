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
  
  const bothBalanced = forceBalanceX === 'balanced' && forceBalanceY === 'balanced'
  
  // Check individual equilibrium conditions
  const isHorizontalBalanced = forceBalanceX === 'balanced'
  const isVerticalBalanced = forceBalanceY === 'balanced'
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <h2 className="text-3xl font-bold mb-3 text-md-text">
          Step 2: Balance Forces
        </h2>
          <p className="text-lg text-md-text/80 mb-6">
            Adjust the reaction forces using the sliders below. All reaction arrows point in their positive direction. 
            Watch the equilibrium indicators turn green when balance is achieved.
        </p>
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
            <h3 className="text-xl font-bold mb-4 text-md-text">
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
                  helpText="Positive = →  Rightward"
              />
              
              <ForceSlider
                label="Reaction at B (Vertical)"
                value={reactionBVertical}
                onChange={setReactionBVertical}
                min={0}
                max={150}
                unit="N"
                color="teal"
                  helpText="Positive = ↑  Upward"
              />
              
              <ForceSlider
                label="Reaction at D"
                value={reactionD}
                onChange={setReactionD}
                min={0}
                max={150}
                unit="N"
                color="turquoise"
                  helpText="Positive = ↑  Upward"
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
            <h4 className="font-bold mb-2 text-md-text text-lg">💡 Hints:</h4>
              <ul className="text-base text-md-text/80 space-y-2 list-disc list-inside">
              <li>Weight = 100N downward</li>
              <li>For horizontal equilibrium: ΣFx should be close to zero</li>
                <li><strong>For vertical equilibrium:</strong> Upward forces = Downward forces</li>
                <li>Check the equilibrium indicators below the diagram!</li>
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
            <h3 className="text-2xl font-bold mb-4 text-md-text">
            Force Diagram
          </h3>
          
            {/* Enhanced FBD Container */}
            <div className="bg-gradient-to-br from-md-cloud/30 to-md-cloud/10 rounded-xl p-6 border border-md-cloud shadow-inner">
              <div className="flex justify-center">
                <BeamVisualization />
              </div>
            </div>
          
            {/* Equilibrium Indicators */}
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold text-md-text/70 mb-2">Equilibrium Check:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg border-2 transition-all ${
                  isHorizontalBalanced 
                    ? 'bg-md-teal/10 border-md-teal' 
                    : 'bg-md-cloud/50 border-md-cloud'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-md-text">ΣFx = 0</span>
                    <span className="text-xl">
                      {isHorizontalBalanced ? '✓' : '×'}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg border-2 transition-all ${
                  isVerticalBalanced 
                    ? 'bg-md-teal/10 border-md-teal' 
                    : 'bg-md-cloud/50 border-md-cloud'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-md-text">ΣFy = 0</span>
                    <span className="text-xl">
                      {isVerticalBalanced ? '✓' : '×'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          
          {bothBalanced && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-5 bg-md-teal/10 border border-md-teal rounded-xl"
            >
              <p className="font-semibold text-md-teal text-center text-lg">
                🎉 Forces are balanced! Proceed to balance moments.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

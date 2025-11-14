import { motion } from 'framer-motion'
import { useSimulatorStore } from '../store/simulatorStore'
import BeamVisualization from './BeamVisualization'
import ForceSlider from './ForceSlider'

export default function Step3BalanceMoments() {
  const {
    selectedPivot,
    massPosition,
    tiltAngle,
    momentBalance,
    setSelectedPivot,
    setMassPosition,
  } = useSimulatorStore()
  
  const pivots = [
    { id: 'B' as const, label: 'Point B (Left Support)', sub: 'Pivot for moments about B', position: 20 },
    { id: 'C' as const, label: 'Point C (Center)', sub: 'Pivot for moments about C', position: 50 },
    { id: 'D' as const, label: 'Point D (Right Support)', sub: 'Pivot for moments about D', position: 80 },
  ]
  
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
  
  const getTiltDirection = () => {
    if (tiltAngle > 0.5) return 'Rotating Clockwise ↻'
    if (tiltAngle < -0.5) return 'Rotating Counter-clockwise ↺'
    return 'Horizontal (Balanced)'
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <h2 className="text-3xl font-bold mb-3 text-md-text">
          Step 3: Balance Moments
        </h2>
        <p className="text-lg text-md-text/80 mb-4">
          Select a pivot point and adjust the mass position to achieve moment equilibrium. 
          The beam will tilt based on the net moment (ΣM = 0 for equilibrium).
        </p>
        
        {/* Balance Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-md-cloud rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Moment Balance (ΣM)</span>
              <span className={`font-bold ${getBalanceColor(momentBalance)}`}>
                {getBalanceIcon(momentBalance)} {getBalanceText(momentBalance)}
              </span>
            </div>
          </div>
          <div className="p-4 bg-md-cloud rounded-xl">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Beam Orientation</span>
              <span className={`font-bold ${Math.abs(tiltAngle) < 0.5 ? 'text-md-teal' : 'text-md-coral'}`}>
                {getTiltDirection()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls Section */}
        <div className="space-y-4">
          {/* Pivot Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4 text-md-text">
              Select Pivot Point
            </h3>
            
            <div className="space-y-2">
              {pivots.map((pivot) => (
                <button
                  key={pivot.id}
                  onClick={() => setSelectedPivot(pivot.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedPivot === pivot.id
                      ? 'border-md-blue bg-md-blue/10'
                      : 'border-md-border bg-md-surface hover:border-md-blue/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold leading-tight">{pivot.label}</span>
                      <span className="text-xs text-md-text/60 mt-0.5">{pivot.sub}</span>
                    </div>
                    {selectedPivot === pivot.id && (
                      <span className="text-md-blue text-xl">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Mass Position Slider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4 text-md-text">
              Adjust Mass Position
            </h3>
            
            <ForceSlider
              label="Mass Position along beam"
              value={massPosition}
              onChange={setMassPosition}
              min={10}
              max={90}
              unit="%"
              color="coral"
              helpText="Move the mass along the beam"
              floatingValue
            />
            <div className="flex items-center justify-between text-xs text-md-text/60 mt-2">
              <span>⚫ Mass Move ←</span>
              <span>→ Mass Move ⚫</span>
            </div>
          </motion.div>
          
          {/* Hints */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card bg-md-blue/5 border-md-blue"
          >
            <h4 className="font-bold mb-3 text-md-text text-lg">💡 Tips</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="font-semibold mb-1">Concepts</div>
                <ul className="text-base text-md-text/80 space-y-1 list-disc list-inside">
                  <li>🔘 Choose a pivot point (B, C, or D)</li>
                  <li>↔ Moment = Force × Distance</li>
                  <li>↻ Clockwise = Positive</li>
                  <li>↺ Counterclockwise = Negative</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-1">Goal</div>
                <ul className="text-base text-md-text/80 space-y-1 list-disc list-inside">
                  <li>🎯 Adjust mass until the beam becomes horizontal</li>
                </ul>
              </div>
            </div>
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
            Beam with Tilt Animation
          </h3>
          <div className="bg-gradient-to-br from-md-cloud/30 to-md-cloud/10 rounded-xl p-6 border border-md-cloud shadow-inner">
            <div className="flex justify-center">
              <BeamVisualization showTilt />
            </div>
          </div>
          <div className="mt-4 text-sm text-md-text/70">
            {Math.abs(tiltAngle) < 0.5 ? 'Beam is horizontal (balanced)' : tiltAngle > 0 ? 'Beam is tilting clockwise' : 'Beam is tilting counterclockwise'}
          </div>
          
          {momentBalance === 'balanced' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-5 bg-md-teal/10 border border-md-teal rounded-xl"
            >
              <p className="font-semibold text-md-teal text-center text-lg">
                🎉 Moments are balanced! You've achieved complete equilibrium!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { useSimulatorStore } from '../store/simulatorStore'
import BeamVisualization from './BeamVisualization'

interface ForceInfo {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

const forcesList: ForceInfo[] = [
  {
    id: 'weight',
    name: 'Weight (W)',
    description: '100N downward force from the mass on the beam',
    icon: '⬇️',
    color: 'bg-md-coral/20 border-md-coral',
  },
  {
    id: 'reaction-b-v',
    name: 'Reaction at B (Vertical)',
    description: 'Vertical component of the hinge reaction at support B',
    icon: '⬆️',
    color: 'bg-md-blue/20 border-md-blue',
  },
  {
    id: 'reaction-b-h',
    name: 'Reaction at B (Horizontal)',
    description: 'Horizontal component of the hinge reaction at support B',
    icon: '➡️',
    color: 'bg-md-blue/20 border-md-blue',
  },
  {
    id: 'reaction-d',
    name: 'Reaction at D',
    description: 'Vertical reaction from the roller support at point D',
    icon: '⬆️',
    color: 'bg-md-teal/20 border-md-teal',
  },
]

export default function Step1IdentifyForces() {
  const { forces, identifyForce } = useSimulatorStore()
  
  const allComplete = forces.every((f) => f.identified)
  
  const handleForceClick = (forceId: string) => {
    const force = forces.find((f) => f.id === forceId)
    if (!force?.identified) {
      identifyForce(forceId)
    }
  }
  
  const isForceIdentified = (forceId: string) => {
    return forces.find((f) => f.id === forceId)?.identified || false
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-6"
      >
        <h2 className="text-3xl font-bold mb-3 text-md-text">
          Step 1: Identify Forces
        </h2>
        <p className="text-lg text-md-text/80 mb-4">
          Click on each force card below to identify the forces acting on the beam. 
          The visualization will highlight and reveal each force as you identify it.
        </p>
        
        {/* Progress indicator */}
        <div className="flex items-center space-x-2 mb-4">
          {forcesList.map((force, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                isForceIdentified(force.id)
                  ? 'bg-md-teal'
                  : 'bg-md-cloud'
              }`}
            />
          ))}
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Force Cards */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4 text-md-text">
              Forces Acting on the Beam
            </h3>
            
            <div className="space-y-3">
              {forcesList.map((force) => {
                const identified = isForceIdentified(force.id)
                return (
                  <motion.button
                    key={force.id}
                    onClick={() => handleForceClick(force.id)}
                    disabled={identified}
                    whileHover={!identified ? { scale: 1.02 } : {}}
                    whileTap={!identified ? { scale: 0.98 } : {}}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      identified
                        ? `${force.color} border-2 cursor-default`
                        : 'border-md-border bg-md-surface hover:border-md-blue hover:shadow-md cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{force.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-md-text text-lg">{force.name}</span>
                          {identified && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-md-teal text-2xl"
                            >
                              ✓
                            </motion.span>
                          )}
                        </div>
                        <p className="text-base text-md-text/70">{force.description}</p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
          
          {/* Hints */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-md-blue/5 border-md-blue"
          >
            <h4 className="font-bold mb-2 text-md-text text-lg">💡 Tips:</h4>
            <ul className="text-base text-md-text/80 space-y-1 list-disc list-inside">
              <li>Click each force card to identify it on the diagram</li>
              <li>Watch the beam diagram update as you identify forces</li>
              <li>Hinges (like at B) provide both horizontal and vertical reactions</li>
              <li>Rollers (like at D) only provide vertical reactions</li>
              <li>The weight acts downward at the mass location</li>
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
          <h3 className="text-xl font-bold mb-4 text-md-text">
            Free Body Diagram
          </h3>
          <BeamVisualization />
          
          <div className="mt-4 p-3 bg-md-cloud/50 rounded-lg">
            <p className="text-base text-md-text/70 text-center">
              <strong>Legend:</strong> Gray arrows = not yet identified • Colored arrows = identified
            </p>
          </div>
          
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
        </motion.div>
      </div>
    </div>
  )
}

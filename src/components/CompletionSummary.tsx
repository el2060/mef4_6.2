import { motion } from 'framer-motion'

interface CompletionSummaryProps {
  onClose: () => void
}

export default function CompletionSummary({ onClose }: CompletionSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="card max-w-2xl w-full bg-md-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-md-teal rounded-full flex items-center justify-center"
          >
            <span className="text-4xl">🎉</span>
          </motion.div>
          
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-4 text-md-text"
          >
            Equilibrium Achieved!
          </motion.h2>
          
          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-md-text/80 mb-6"
          >
            Your configuration satisfies all equilibrium conditions.
          </motion.p>
          
          {/* Summary Points */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-md-cloud/50 rounded-xl p-6 mb-6 text-left"
          >
            <h3 className="font-bold mb-3 text-md-text">You achieved balance by:</h3>
            <ul className="space-y-2 text-md-text/80">
              <li className="flex items-start">
                <span className="text-md-teal mr-2 text-xl">✓</span>
                <span>Identifying all forces acting on the rigid body</span>
              </li>
              <li className="flex items-start">
                <span className="text-md-teal mr-2 text-xl">✓</span>
                <span>Adjusting reaction force values to satisfy ΣFx = 0 and ΣFy = 0</span>
              </li>
              <li className="flex items-start">
                <span className="text-md-teal mr-2 text-xl">✓</span>
                <span>Setting the mass position to neutralize moments (ΣM = 0)</span>
              </li>
              <li className="flex items-start">
                <span className="text-md-teal mr-2 text-xl">✓</span>
                <span>Choosing an appropriate pivot point for analysis</span>
              </li>
            </ul>
          </motion.div>
          
          {/* Key Concepts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-md-blue/10 border border-md-blue rounded-xl p-4 mb-6 text-left"
          >
            <h4 className="font-bold mb-2 text-md-text">🔑 Key Concepts Learned:</h4>
            <ul className="text-sm text-md-text/80 space-y-1">
              <li>• <strong>Force Equilibrium:</strong> Sum of all forces in each direction must be zero</li>
              <li>• <strong>Moment Equilibrium:</strong> Sum of all moments about any point must be zero</li>
              <li>• <strong>Free Body Diagram:</strong> Visual representation of all forces on a body</li>
              <li>• <strong>Support Reactions:</strong> Forces exerted by supports (hinges, rollers, etc.)</li>
            </ul>
          </motion.div>
          
          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={onClose}
              className="btn bg-md-blue text-white hover:bg-md-blueHover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={onClose}
              className="btn bg-md-surface text-md-text border border-md-border hover:bg-md-cloud"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

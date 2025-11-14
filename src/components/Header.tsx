import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-md-surface border-b border-md-borderSubtle sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-md-blue rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-md-text">
                Physics Simulator
              </h1>
              <p className="text-sm text-md-text/70">
                MEF 6.2 - Rigid Body Equilibrium
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-md-teal/10 text-md-teal rounded-pill text-xs font-semibold uppercase">
              Interactive
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

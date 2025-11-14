import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-md-surface border-b border-md-borderSubtle sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-md-blue rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform">
              <span className="text-white font-bold text-2xl" aria-label="Physics Logo"></span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-md-text tracking-tight">
                Physics Simulator
              </h1>
              <p className="text-sm md:text-base text-md-text/70 font-medium">
                MEF 6.2 &mdash; Rigid Body Equilibrium
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-md-teal/10 text-md-teal rounded-full text-xs md:text-sm font-semibold uppercase shadow-sm">
              Interactive
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

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
            <img 
              src="https://www.np.edu.sg/images/default-source/default-album/img-logo.png?sfvrsn=764583a6_19" 
              alt="NP Logo" 
              className="h-12 w-auto object-contain"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-md-text tracking-tight">
                Newton's First Law of Motion
              </h1>
              <p className="text-sm md:text-base text-md-text/70 font-medium">
                Chapter 6.2 (Equilibrium of a Rigid Body)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-md-cloud text-md-text/70 rounded-full text-xs md:text-sm font-medium shadow-sm">
              Updated as at {new Date().toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

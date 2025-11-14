import { motion } from 'framer-motion'

interface ForceSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  unit: string
  color?: 'blue' | 'teal' | 'turquoise' | 'coral'
}

export default function ForceSlider({
  label,
  value,
  onChange,
  min,
  max,
  unit,
  color = 'blue',
}: ForceSliderProps) {
  const colorClasses = {
    blue: 'accent-md-blue',
    teal: 'accent-md-teal',
    turquoise: 'accent-md-turquoise',
    coral: 'accent-md-coral',
  }
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-md-text" title={`Adjust the ${label} value`}>{label}</label>
        <motion.span
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-lg font-bold text-md-blue px-3 py-1 bg-md-blue/10 rounded-lg shadow-sm"
        >
          {value.toFixed(0)} {unit}
        </motion.span>
      </div>

      <div className="relative group">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full h-4 rounded-lg appearance-none cursor-pointer bg-md-cloud ${colorClasses[color]} focus-visible:ring-2 focus-visible:ring-md-blue`}
          style={{
            background: `linear-gradient(to right, 
              var(--md-${color}) 0%, 
              var(--md-${color}) ${((value - min) / (max - min)) * 100}%, 
              var(--md-cloud) ${((value - min) / (max - min)) * 100}%, 
              var(--md-cloud) 100%)`
          }}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
        <span className="absolute left-1/2 -top-7 -translate-x-1/2 bg-md-blue text-white text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Drag to adjust value
        </span>
      </div>

      <div className="flex justify-between text-xs text-md-text/50">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}

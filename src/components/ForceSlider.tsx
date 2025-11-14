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
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-md-text">{label}</label>
        <motion.span
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-lg font-bold text-md-blue px-3 py-1 bg-md-blue/10 rounded-lg"
        >
          {value.toFixed(0)} {unit}
        </motion.span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-3 rounded-lg appearance-none cursor-pointer bg-md-cloud ${colorClasses[color]}`}
        style={{
          background: `linear-gradient(to right, 
            var(--md-${color}) 0%, 
            var(--md-${color}) ${((value - min) / (max - min)) * 100}%, 
            var(--md-cloud) ${((value - min) / (max - min)) * 100}%, 
            var(--md-cloud) 100%)`
        }}
      />
      
      <div className="flex justify-between text-xs text-md-text/50">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}

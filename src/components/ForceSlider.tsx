import { motion } from 'framer-motion'

interface ForceSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  unit: string
  color?: 'blue' | 'teal' | 'turquoise' | 'coral'
    helpText?: string
  floatingValue?: boolean
}

export default function ForceSlider({
  label,
  value,
  onChange,
  min,
  max,
  unit,
  color = 'blue',
    helpText,
  floatingValue = false,
}: ForceSliderProps) {
  const colorClasses = {
    blue: 'accent-md-blue',
    teal: 'accent-md-teal',
    turquoise: 'accent-md-turquoise',
    coral: 'accent-md-coral',
  }
  
  const percent = ((value - min) / (max - min)) * 100
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label className="text-base font-semibold text-md-text" title={`Adjust the ${label} value`}>
              {label}
            </label>
            {helpText && (
              <span className="text-xs text-md-text/60 mt-0.5 font-medium">
                {helpText}
              </span>
            )}
          </div>
        {!floatingValue && (
          <motion.span
            key={value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-xl font-bold text-md-blue px-4 py-1.5 bg-md-blue/15 rounded-lg shadow-md border border-md-blue/20"
          >
            {value.toFixed(0)} {unit}
          </motion.span>
        )}
      </div>

      <div className="relative group">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
            className={`w-full h-5 rounded-full appearance-none cursor-pointer bg-md-cloud ${colorClasses[color]} focus-visible:ring-2 focus-visible:ring-md-blue transition-all`}
          style={{
            background: `linear-gradient(to right, 
              var(--md-${color}) 0%, 
              var(--md-${color}) ${((value - min) / (max - min)) * 100}%, 
              #eeeeee ${((value - min) / (max - min)) * 100}%, 
              #eeeeee 100%)`
          }}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
        {floatingValue && (
          <motion.span
            key={`bubble-${value}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-8 translate-x-[-50%] text-xs font-semibold text-white bg-md-blue px-2 py-1 rounded shadow-md"
            style={{ left: `calc(${percent}% )` }}
          >
            {value.toFixed(0)} {unit}
          </motion.span>
        )}
          <span className="absolute left-1/2 -top-8 -translate-x-1/2 bg-md-text text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
          Drag to adjust value
        </span>
      </div>

      <div className="flex justify-between text-xs text-md-text/60 font-medium">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}

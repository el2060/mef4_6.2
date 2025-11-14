import { motion } from 'framer-motion'
import { useSimulatorStore } from '../store/simulatorStore'

interface BeamVisualizationProps {
  highlightForce?: string
  showTilt?: boolean
}

export default function BeamVisualization({ highlightForce, showTilt = false }: BeamVisualizationProps) {
  const {
    forces,
    reactionBHorizontal,
    reactionBVertical,
    reactionD,
    massPosition,
    tiltAngle,
    selectedPivot,
  } = useSimulatorStore()
  
  // SVG dimensions - increased for better readability
  const width = 800
  const height = 500
  const beamY = height / 2
  const beamLength = 700
  const beamStart = 50
  
  // Calculate tilt transform
  const tiltTransform = showTilt && tiltAngle !== 0
    ? `rotate(${tiltAngle}, ${width / 2}, ${beamY})`
    : ''
  
  // Get arrow color based on identification or highlight
  const getArrowColor = (forceId: string) => {
    const force = forces.find((f) => f.id === forceId)
    if (highlightForce === forceId) return '#FFE100' // Yellow highlight
    if (!force?.identified) return '#D3D3D3' // Gray if not identified
    
    // Color by type
    if (forceId === 'weight') return '#FF6E6C' // Coral
    if (forceId.includes('reaction-b')) return '#007AFF' // Blue
    if (forceId === 'reaction-d') return '#21AD93' // Teal
    return '#007AFF'
  }
  
  // Calculate positions along beam
  const getXPosition = (percent: number) => beamStart + (beamLength * percent / 100)
  
  const weightX = getXPosition(massPosition)
  const supportBX = getXPosition(20)
  const supportDX = getXPosition(80)
  
  // Arrow scaling based on magnitude
  const scaleArrow = (magnitude: number, max: number = 100) => {
    return Math.max(20, Math.min(120, (magnitude / max) * 80))
  }
  
  return (
    <div className="relative bg-md-cloud/30 rounded-xl p-4 overflow-hidden">
      <svg
        width="100%"
        height="400"
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
      >
        {/* Grid background (optional) */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#E5E5E5" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid)" opacity="0.3" />
        
        {/* Main beam group (with tilt) */}
        <g transform={tiltTransform}>
          {/* Beam */}
          <motion.rect
            x={beamStart}
            y={beamY - 8}
            width={beamLength}
            height={16}
            fill="#383838"
            rx={4}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: `${beamStart}px ${beamY}px` }}
          />
          
          {/* Support markers */}
          {/* Support B (Hinge) */}
          <g transform={`translate(${supportBX}, ${beamY + 20})`}>
            <motion.circle
              r={14}
              fill={selectedPivot === 'B' ? '#007AFF' : '#666'}
              stroke="#fff"
              strokeWidth={3}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            />
            <text y={40} textAnchor="middle" fill="#383838" fontSize="22" fontWeight="bold">
              B
            </text>
          </g>
          
          {/* Support D (Roller) */}
          <g transform={`translate(${supportDX}, ${beamY + 20})`}>
            <motion.rect
              x={-12}
              y={-6}
              width={24}
              height={12}
              fill={selectedPivot === 'D' ? '#21AD93' : '#666'}
              stroke="#fff"
              strokeWidth={2}
              rx={3}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            />
            <text y={40} textAnchor="middle" fill="#383838" fontSize="22" fontWeight="bold">
              D
            </text>
          </g>
          
          {/* Center point C */}
          <g transform={`translate(${getXPosition(50)}, ${beamY})`}>
            <motion.circle
              r={8}
              fill={selectedPivot === 'C' ? '#FFE100' : '#999'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            />
            <text y={-20} textAnchor="middle" fill="#383838" fontSize="20" fontWeight="bold">
              C
            </text>
          </g>
          
          {/* Weight (downward arrow) */}
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <defs>
              <marker
                id="arrowhead-down"
                markerWidth="10"
                markerHeight="10"
                refX="5"
                refY="5"
                orient="auto"
              >
                <polygon points="0 0, 10 5, 0 10" fill={getArrowColor('weight')} />
              </marker>
            </defs>
            <line
              x1={weightX}
              y1={beamY - 20}
              x2={weightX}
              y2={beamY - 20 - scaleArrow(100)}
              stroke={getArrowColor('weight')}
              strokeWidth="5"
              markerEnd="url(#arrowhead-down)"
            />
            <text
              x={weightX + 15}
              y={beamY - 70}
              fill={getArrowColor('weight')}
              fontSize="22"
              fontWeight="bold"
            >
              W = 100N
            </text>
          </motion.g>
          
          {/* Reaction at B - Vertical (upward) */}
          {forces.find((f) => f.id === 'reaction-b-v')?.identified && (
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <defs>
                <marker
                  id="arrowhead-up-b"
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <polygon points="0 10, 10 5, 0 0" fill={getArrowColor('reaction-b-v')} />
                </marker>
              </defs>
              <motion.line
                x1={supportBX - 15}
                y1={beamY + 40}
                x2={supportBX - 15}
                y2={beamY + 40 + scaleArrow(reactionBVertical)}
                stroke={getArrowColor('reaction-b-v')}
                strokeWidth="5"
                markerEnd="url(#arrowhead-up-b)"
                animate={{ y2: beamY + 40 + scaleArrow(reactionBVertical) }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={supportBX - 60}
                y={beamY + 100}
                fill={getArrowColor('reaction-b-v')}
                fontSize="20"
                fontWeight="bold"
              >
                Rb,v
              </text>
            </motion.g>
          )}
          
          {/* Reaction at B - Horizontal (right) */}
          {forces.find((f) => f.id === 'reaction-b-h')?.identified && Math.abs(reactionBHorizontal) > 2 && (
            <motion.g
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <defs>
                <marker
                  id="arrowhead-right"
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 5, 0 10"
                    fill={getArrowColor('reaction-b-h')}
                  />
                </marker>
              </defs>
              <motion.line
                x1={supportBX}
                y1={beamY - 30}
                x2={supportBX + (reactionBHorizontal > 0 ? 1 : -1) * scaleArrow(Math.abs(reactionBHorizontal), 50)}
                y2={beamY - 30}
                stroke={getArrowColor('reaction-b-h')}
                strokeWidth="5"
                markerEnd="url(#arrowhead-right)"
                animate={{
                  x2: supportBX + (reactionBHorizontal > 0 ? 1 : -1) * scaleArrow(Math.abs(reactionBHorizontal), 50)
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.g>
          )}
          
          {/* Reaction at D (upward) */}
          {forces.find((f) => f.id === 'reaction-d')?.identified && (
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <defs>
                <marker
                  id="arrowhead-up-d"
                  markerWidth="10"
                  markerHeight="10"
                  refX="5"
                  refY="5"
                  orient="auto"
                >
                  <polygon points="0 10, 10 5, 0 0" fill={getArrowColor('reaction-d')} />
                </marker>
              </defs>
              <motion.line
                x1={supportDX + 15}
                y1={beamY + 40}
                x2={supportDX + 15}
                y2={beamY + 40 + scaleArrow(reactionD)}
                stroke={getArrowColor('reaction-d')}
                strokeWidth="5"
                markerEnd="url(#arrowhead-up-d)"
                animate={{ y2: beamY + 40 + scaleArrow(reactionD) }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={supportDX + 30}
                y={beamY + 100}
                fill={getArrowColor('reaction-d')}
                fontSize="20"
                fontWeight="bold"
              >
                Rd
              </text>
            </motion.g>
          )}
          
          {/* Mass indicator */}
          <motion.circle
            cx={weightX}
            cy={beamY}
            r={8}
            fill="#FF6E6C"
            stroke="#fff"
            strokeWidth={2}
            animate={{ cx: weightX }}
            transition={{ duration: 0.3 }}
          />
        </g>
        
        {/* Tilt indicator */}
        {showTilt && Math.abs(tiltAngle) > 0.5 && (
          <motion.text
            x={width / 2}
            y={40}
            textAnchor="middle"
            fill={tiltAngle > 0 ? '#FF6E6C' : '#007AFF'}
            fontSize="24"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {tiltAngle > 0 ? '↻ Clockwise' : '↺ Counter-clockwise'}
          </motion.text>
        )}
      </svg>
    </div>
  )
}

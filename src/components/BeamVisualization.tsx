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
  const width = 1000
  const height = 700 // Increased height for better spacing
  const beamY = height / 2 - 50 // Moved beam higher to allow space below
  const beamLength = 900
  const beamStart = 50
  const arrowSpacing = 70 // Vertical spacing between beam and arrows
  
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
          <g transform={`translate(${supportBX}, ${beamY + 25})`}>
            <motion.circle
                r={20}
                fill={selectedPivot === 'B' ? '#007AFF' : '#4A4A4A'}
              stroke="#fff"
                strokeWidth={3.5}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.25))' }}
            />
            <text 
                y={-38} 
              textAnchor="middle" 
                fill="#2A2A2A" 
                fontSize="26" 
              fontWeight="bold"
              style={{ 
                filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))',
                textShadow: '0 0 3px white'
              }}
            >
              B
            </text>
          </g>
          
          {/* Support D (Roller) */}
          <g transform={`translate(${supportDX}, ${beamY + 25})`}>
            <motion.rect
                x={-18}
                y={-9}
                width={36}
                height={18}
                fill={selectedPivot === 'D' ? '#21AD93' : '#4A4A4A'}
              stroke="#fff"
                strokeWidth={2.5}
              rx={3}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.25))' }}
            />
            <text 
                y={-38} 
              textAnchor="middle" 
                fill="#2A2A2A" 
                fontSize="26" 
              fontWeight="bold"
              style={{ 
                filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))',
                textShadow: '0 0 3px white'
              }}
            >
              D
            </text>
          </g>
          
          {/* Center point C */}
          <g transform={`translate(${getXPosition(50)}, ${beamY})`}>
            <motion.circle
              r={12}
              fill={selectedPivot === 'C' ? '#FFE100' : '#999'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            />
            <text 
              y={45} 
              textAnchor="middle" 
              fill="#383838" 
              fontSize="28" 
              fontWeight="bold"
              style={{ 
                filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))',
                textShadow: '0 0 3px white'
              }}
            >
              C
            </text>
          </g>
          
          {/* Weight (downward arrow) - Snap Zone: Centered above beam */}
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
                y1={beamY - 35}
              x2={weightX}
                y2={beamY - 35 - scaleArrow(100)}
              stroke={getArrowColor('weight')}
              strokeWidth="6"
              markerEnd="url(#arrowhead-down)"
            />
            <text
              x={weightX + 30}
              y={beamY - 140}
              fill={getArrowColor('weight')}
              fontSize="32"
              fontWeight="bold"
              style={{ 
                filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))'
              }}
            >
              W = 100N
            </text>
              {/* Arrow label below */}
              <text
                x={weightX}
                y={beamY - 15}
                textAnchor="middle"
                fill={getArrowColor('weight')}
                fontSize="14"
                fontWeight="600"
                style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.2))' }}
              >
                Weight
              </text>
          </motion.g>
          
          {/* Reaction at B - Vertical (upward) - Snap Zone: Below beam, left of support */}
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
                x1={supportBX - 40}
                y1={beamY + arrowSpacing}
                x2={supportBX - 40}
                y2={beamY + arrowSpacing + scaleArrow(Math.abs(reactionBVertical))}
                stroke={getArrowColor('reaction-b-v')}
                strokeWidth="6"
                markerEnd="url(#arrowhead-up-b)"
                animate={{ y2: beamY + arrowSpacing + scaleArrow(Math.abs(reactionBVertical)) }}
                transition={{ duration: 0.3 }}
              />
              <text
             x={supportBX - 40}
             y={beamY + arrowSpacing + 180}
                fill={getArrowColor('reaction-b-v')}
             fontSize="16"
             fontWeight="600"
             textAnchor="middle"
                style={{ 
                  filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))'
                }}
              >
                Rb,v
              </text>
            </motion.g>
          )}
          
          {/* Reaction at B - Horizontal (right) */}
          {forces.find((f) => f.id === 'reaction-b-h')?.identified && Math.abs(reactionBHorizontal) > 1 && (
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
                  y1={beamY - 40}
                x2={supportBX + (reactionBHorizontal > 0 ? 1 : -1) * scaleArrow(Math.abs(reactionBHorizontal), 50)}
                  y2={beamY - 40}
                stroke={getArrowColor('reaction-b-h')}
                  strokeWidth="6"
                markerEnd="url(#arrowhead-right)"
                animate={{
                  x2: supportBX + (reactionBHorizontal > 0 ? 1 : -1) * scaleArrow(Math.abs(reactionBHorizontal), 50)
                }}
                transition={{ duration: 0.3 }}
              />
                <text
                  x={supportBX + (reactionBHorizontal > 0 ? 35 : -35)}
                  y={beamY - 48}
                  textAnchor="middle"
                  fill={getArrowColor('reaction-b-h')}
                  fontSize="14"
                  fontWeight="600"
                  style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.2))' }}
                >
                  Rb,h
                </text>
            </motion.g>
          )}
          
          {/* Reaction at D (upward) - Snap Zone: Below beam, right of support */}
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
                x1={supportDX + 40}
                y1={beamY + arrowSpacing}
                x2={supportDX + 40}
                y2={beamY + arrowSpacing + scaleArrow(Math.abs(reactionD))}
                stroke={getArrowColor('reaction-d')}
                strokeWidth="6"
                markerEnd="url(#arrowhead-up-d)"
                animate={{ y2: beamY + arrowSpacing + scaleArrow(Math.abs(reactionD)) }}
                transition={{ duration: 0.3 }}
              />
              <text
             x={supportDX + 40}
             y={beamY + arrowSpacing + 180}
                fill={getArrowColor('reaction-d')}
             fontSize="16"
             fontWeight="600"
             textAnchor="middle"
                style={{ 
                  filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))'
                }}
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
            y={50}
            textAnchor="middle"
            fill={tiltAngle > 0 ? '#FF6E6C' : '#007AFF'}
            fontSize="32"
            fontWeight="bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))',
              textShadow: '0 0 4px white'
            }}
          >
            {tiltAngle > 0 ? '↻ Clockwise' : '↺ Counter-clockwise'}
          </motion.text>
        )}
      </svg>
    </div>
  )
}

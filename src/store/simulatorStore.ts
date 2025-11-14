import { create } from 'zustand'

export interface Force {
  id: string
  name: string
  type: 'vertical' | 'horizontal' | 'reaction'
  direction: 'up' | 'down' | 'left' | 'right'
  magnitude: number
  position: number // Position along the beam (0-100%)
  identified: boolean
}

interface SimulatorState {
  // Step 1: Identify Forces
  forces: Force[]
  step1Complete: boolean
  
  // Step 2: Balance Forces
  reactionBHorizontal: number
  reactionBVertical: number
  reactionD: number
  forceBalanceX: 'unbalanced' | 'almost' | 'balanced'
  forceBalanceY: 'unbalanced' | 'almost' | 'balanced'
  step2Complete: boolean
  
  // Step 3: Balance Moments
  selectedPivot: 'B' | 'D' | 'C' | null
  massPosition: number
  tiltAngle: number // -10 to +10 degrees
  momentBalance: 'unbalanced' | 'almost' | 'balanced'
  step3Complete: boolean
  
  // Actions
  identifyForce: (forceId: string) => void
  setReactionBHorizontal: (value: number) => void
  setReactionBVertical: (value: number) => void
  setReactionD: (value: number) => void
  setSelectedPivot: (pivot: 'B' | 'D' | 'C') => void
  setMassPosition: (position: number) => void
  checkForceBalance: () => void
  checkMomentBalance: () => void
  resetSimulation: () => void
}

const initialForces: Force[] = [
  {
    id: 'weight',
    name: 'Weight (W)',
    type: 'vertical',
    direction: 'down',
    magnitude: 100,
    position: 40,
    identified: false,
  },
  {
    id: 'reaction-b-v',
    name: 'Reaction at B (Vertical)',
    type: 'reaction',
    direction: 'up',
    magnitude: 0,
    position: 20,
    identified: false,
  },
  {
    id: 'reaction-b-h',
    name: 'Reaction at B (Horizontal)',
    type: 'reaction',
    direction: 'right',
    magnitude: 0,
    position: 20,
    identified: false,
  },
  {
    id: 'reaction-d',
    name: 'Reaction at D',
    type: 'vertical',
    direction: 'up',
    magnitude: 0,
    position: 80,
    identified: false,
  },
]

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  // Initial state
  forces: initialForces,
  step1Complete: false,
  
  reactionBHorizontal: 0,
  reactionBVertical: 50,
  reactionD: 50,
  forceBalanceX: 'balanced',
  forceBalanceY: 'unbalanced',
  step2Complete: false,
  
  selectedPivot: null,
  massPosition: 40,
  tiltAngle: 0,
  momentBalance: 'unbalanced',
  step3Complete: false,
  
  // Actions
  identifyForce: (forceId: string) => {
    set((state) => ({
      forces: state.forces.map((force) =>
        force.id === forceId ? { ...force, identified: true } : force
      ),
    }))
    
    // Check if all forces are identified
    const allIdentified = get().forces.every((f) => f.identified)
    if (allIdentified) {
      set({ step1Complete: true })
    }
  },
  
  setReactionBHorizontal: (value: number) => {
    set({ reactionBHorizontal: value })
    get().checkForceBalance()
  },
  
  setReactionBVertical: (value: number) => {
    set({ reactionBVertical: value })
    get().checkForceBalance()
  },
  
  setReactionD: (value: number) => {
    set({ reactionD: value })
    get().checkForceBalance()
  },
  
  checkForceBalance: () => {
    const state = get()
    const { reactionBHorizontal, reactionBVertical, reactionD } = state
    
    // Check horizontal balance (should be 0 for no horizontal forces)
    const xBalance = Math.abs(reactionBHorizontal)
    let forceBalanceX: 'unbalanced' | 'almost' | 'balanced'
    if (xBalance < 5) forceBalanceX = 'balanced'
    else if (xBalance < 15) forceBalanceX = 'almost'
    else forceBalanceX = 'unbalanced'
    
    // Check vertical balance (reactions should sum to weight = 100)
    const yBalance = Math.abs((reactionBVertical + reactionD) - 100)
    let forceBalanceY: 'unbalanced' | 'almost' | 'balanced'
    if (yBalance < 5) forceBalanceY = 'balanced'
    else if (yBalance < 15) forceBalanceY = 'almost'
    else forceBalanceY = 'unbalanced'
    
    const step2Complete = forceBalanceX === 'balanced' && forceBalanceY === 'balanced'
    
    set({ forceBalanceX, forceBalanceY, step2Complete })
  },
  
  setSelectedPivot: (pivot: 'B' | 'D' | 'C') => {
    set({ selectedPivot: pivot })
    get().checkMomentBalance()
  },
  
  setMassPosition: (position: number) => {
    set({ massPosition: position })
    get().checkMomentBalance()
  },
  
  checkMomentBalance: () => {
    const state = get()
    const { massPosition, selectedPivot, reactionBVertical, reactionD } = state
    
    if (!selectedPivot) {
      set({ tiltAngle: 0, momentBalance: 'unbalanced' })
      return
    }
    
    // Simplified moment calculation
    // Pivot positions: B=20, C=50, D=80
    const pivotPositions = { B: 20, C: 50, D: 80 }
    const pivotPos = pivotPositions[selectedPivot]
    
    // Calculate moment about pivot
    const weightMoment = 100 * (massPosition - pivotPos) // Weight creates moment
    
    let reactionMoment = 0
    if (selectedPivot === 'B') {
      reactionMoment = reactionD * (80 - 20) // Reaction D creates counter moment
    } else if (selectedPivot === 'D') {
      reactionMoment = -reactionBVertical * (80 - 20) // Reaction B creates counter moment
    } else if (selectedPivot === 'C') {
      reactionMoment = reactionD * (80 - 50) - reactionBVertical * (50 - 20)
    }
    
    const netMoment = weightMoment + reactionMoment
    
    // Calculate tilt angle (-10 to +10 degrees)
    const tiltAngle = Math.max(-10, Math.min(10, netMoment / 100))
    
    // Determine balance status
    let momentBalance: 'unbalanced' | 'almost' | 'balanced'
    if (Math.abs(netMoment) < 50) momentBalance = 'balanced'
    else if (Math.abs(netMoment) < 150) momentBalance = 'almost'
    else momentBalance = 'unbalanced'
    
    const step3Complete = momentBalance === 'balanced'
    
    set({ tiltAngle, momentBalance, step3Complete })
  },
  
  resetSimulation: () => {
    set({
      forces: initialForces,
      step1Complete: false,
      reactionBHorizontal: 0,
      reactionBVertical: 50,
      reactionD: 50,
      forceBalanceX: 'balanced',
      forceBalanceY: 'unbalanced',
      step2Complete: false,
      selectedPivot: null,
      massPosition: 40,
      tiltAngle: 0,
      momentBalance: 'unbalanced',
      step3Complete: false,
    })
  },
}))

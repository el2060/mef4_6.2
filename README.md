# Rigid Body Equilibrium Simulator

An interactive physics simulator for teaching **Newton's First Law of Motion** and **Equilibrium of Rigid Bodies** (MEF Chapter 6.2).

Built with **Vite**, **React**, **TypeScript**, and **Framer Motion**, following the MotherDuck-inspired design system.

## 🎯 Features

### Step 1: Identify Forces
- Interactive multiple-choice questions to identify forces on the beam
- Real-time visualization updates as forces are identified
- Educational feedback for incorrect answers
- Progress tracking across questions

### Step 2: Balance Forces
- Adjustable sliders for reaction forces
- Traffic-light indicators (🔴 Unbalanced, 🟡 Almost, 🟢 Balanced)
- Real-time force diagram updates
- Visual feedback for horizontal (ΣFx = 0) and vertical (ΣFy = 0) equilibrium

### Step 3: Balance Moments
- Selectable pivot points (B, C, or D)
- Mass position adjustment slider
- Beam tilt animation showing moment imbalance
- Visual indicators for rotational equilibrium (ΣM = 0)

### Completion Summary
- Comprehensive achievement summary
- Educational recap of key concepts
- Option to reset and try again

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🎨 Design System

This project follows the **MotherDuck-inspired design system** with:

- **Typography**: IBM Plex Mono (400, 600, 700)
- **Color Palette**: Warm neutrals with bold accents
  - Background: `#F4EFEA` (warm off-white)
  - Primary Blue: `#007AFF`
  - Teal: `#21AD93`
  - Coral: `#FF6E6C`
  - Yellow: `#FFE100`
- **Spacing**: 8px base unit
- **Borders**: 16px radius for cards, 12px for inputs
- **Shadows**: Subtle elevation with `rgba(44,51,91,0.07)`
- **Motion**: 200-300ms transitions with pleasant easing

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx              # App header with branding
│   ├── StepIndicator.tsx       # Progress indicator
│   ├── Step1IdentifyForces.tsx # Force identification quiz
│   ├── Step2BalanceForces.tsx  # Force balance interface
│   ├── Step3BalanceMoments.tsx # Moment balance interface
│   ├── BeamVisualization.tsx   # SVG beam diagram
│   ├── ForceSlider.tsx         # Reusable slider component
│   └── CompletionSummary.tsx   # Success modal
├── store/
│   └── simulatorStore.ts       # Zustand state management
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Global styles + Tailwind

```

## 🧠 State Management

Uses **Zustand** for lightweight, reactive state management:

- Force identification tracking
- Force balance calculations
- Moment balance computations
- Step completion status
- All UI interactions

## 🎓 Educational Concepts

### Equilibrium Conditions
1. **ΣFx = 0** - Sum of horizontal forces equals zero
2. **ΣFy = 0** - Sum of vertical forces equals zero
3. **ΣM = 0** - Sum of moments about any point equals zero

### Support Types
- **Hinge (Point B)**: Provides horizontal and vertical reactions
- **Roller (Point D)**: Provides only vertical reaction

### Key Learning Outcomes
- Understanding Free Body Diagrams (FBDs)
- Recognizing different types of forces and reactions
- Applying equilibrium equations
- Moment calculation about different pivot points

## 🛠 Technologies

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management

## 📝 Customization

### Adjusting Force Values
Edit `src/store/simulatorStore.ts`:
```typescript
const initialForces: Force[] = [
  {
    id: 'weight',
    magnitude: 100, // Change weight value
    position: 40,   // Change position (0-100%)
    // ...
  }
]
```

### Adding New Questions
Edit `src/components/Step1IdentifyForces.tsx`:
```typescript
const questions: Question[] = [
  // Add new questions here
]
```

### Modifying Tolerances
Adjust balance sensitivity in `checkForceBalance()` and `checkMomentBalance()` methods in the store.

## 📄 License

MIT License - feel free to use for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues, please open an issue on the GitHub repository.

---

Built with ❤️ for physics education

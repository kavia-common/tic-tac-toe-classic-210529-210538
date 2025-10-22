# Tic Tac Toe - Ocean Professional

A modern, feature-rich Tic Tac Toe application built with React, TypeScript, and Vite. Play against a friend or challenge an AI bot with three difficulty levels.

## Features

### Game Modes
- **Player vs Player (PvP)**: Play against a friend on the same device
- **Player vs Bot**: Challenge an AI opponent with three difficulty levels

### AI Difficulty Levels
- **Easy**: Random move selection - perfect for beginners
- **Medium**: Basic heuristics (win/block/center/corner strategy)
- **Hard**: Minimax algorithm with alpha-beta pruning - unbeatable

### User Interface
- Clean, modern design following Ocean Professional theme
- Smooth animations and transitions
- Responsive layout (works on mobile, tablet, and desktop)
- Clear status messages and game feedback
- Accessible controls with keyboard navigation support

### Compliance Features
- Comprehensive audit logging (console and localStorage)
- Input validation on all user actions
- Error handling with user-friendly messages
- JSDoc documentation for all public functions
- TypeScript for type safety

## Project Structure

```
src/
├── components/          # React components
│   ├── GameBoard.tsx   # 3x3 game grid
│   ├── Controls.tsx    # Game mode, difficulty, reset controls
│   └── StatusBar.tsx   # Status messages and current player
├── services/           # Business logic
│   ├── game.ts        # Core game logic (moves, win detection)
│   └── ai.ts          # AI strategies (easy/medium/hard)
├── utils/             # Utilities
│   └── audit.ts       # Audit logging functionality
├── styles/            # CSS modules
│   ├── global.css     # Global styles and theme variables
│   ├── App.css        # App component styles
│   ├── GameBoard.css  # Game board styles
│   ├── Controls.css   # Controls styles
│   └── StatusBar.css  # Status bar styles
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd tic_tac_toe_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## How to Play

1. **Choose Game Mode**:
   - Select "Player vs Player" to play with a friend
   - Select "Player vs Bot" to play against AI

2. **Select Difficulty** (Bot mode only):
   - Easy: Good for practice
   - Medium: Balanced challenge
   - Hard: Maximum difficulty

3. **Make Moves**:
   - Click on any empty cell to place your marker (X or O)
   - Players alternate turns
   - First to get 3 in a row wins!

4. **Reset**: Click "Reset Game" to start a new game

## Architecture

### State Management
- React useState for local component state
- Single source of truth for game state
- Immutable state updates

### AI Implementation

#### Easy Difficulty
- Randomly selects from available cells
- No strategic thinking

#### Medium Difficulty
- Checks for winning moves
- Blocks opponent winning moves
- Prefers center, then corners, then edges
- Good balance of challenge and beatable gameplay

#### Hard Difficulty
- Implements minimax algorithm with alpha-beta pruning
- Explores all possible game states
- Always chooses optimal move
- Practically unbeatable when playing optimally

### Audit Trail
All user actions are logged with:
- Action type (MOVE_MADE, GAME_RESET, etc.)
- Timestamp (ISO 8601 format)
- Relevant details (player, position, game state)
- Storage in console and localStorage

Access audit logs via browser console:
```javascript
// View all logs
JSON.parse(localStorage.getItem('tic_tac_toe_audit_log'))

// Clear logs
localStorage.removeItem('tic_tac_toe_audit_log')
```

## Validation & Error Handling

### Input Validation
- Cell index range validation (0-8)
- Empty cell verification before move
- Game state validation (only allow moves during active game)
- Turn validation (prevent moves during AI thinking)

### Error Handling
- Try-catch blocks around all critical operations
- User-friendly error messages
- Graceful degradation on localStorage errors
- Console error logging for debugging

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible indicators
- High contrast colors for readability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lightweight bundle size
- Fast rendering with React
- Optimized minimax with alpha-beta pruning
- Minimal re-renders with proper state management

## Testing

### Manual Testing Checklist
- [ ] Can start a new game
- [ ] Can place X and O alternately
- [ ] Win detection works for all combinations
- [ ] Draw detection works when board is full
- [ ] Reset button clears the board
- [ ] Mode switching resets the game
- [ ] Difficulty switching resets the game
- [ ] AI makes valid moves in bot mode
- [ ] Easy AI is beatable
- [ ] Hard AI is challenging/unbeatable
- [ ] Responsive on mobile devices
- [ ] Keyboard navigation works
- [ ] Audit logs are generated

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **CSS3**: Styling with custom properties
- **ESLint**: Code quality

## Theme: Ocean Professional

### Color Palette
- Primary: `#2563EB` (Blue)
- Secondary: `#F59E0B` (Amber)
- Success: `#F59E0B` (Amber)
- Error: `#EF4444` (Red)
- Background: `#f9fafb` (Light Gray)
- Surface: `#ffffff` (White)
- Text: `#111827` (Dark Gray)

### Design Principles
- Clean and minimalist
- Subtle shadows and depth
- Rounded corners
- Smooth transitions
- Gradient accents

## License

This project is built for educational and demonstration purposes.

## Contributing

This is a standalone project. For questions or issues, please refer to the project documentation.

## Changelog

### Version 1.0.0 (Initial Release)
- ✅ Player vs Player mode
- ✅ Player vs Bot mode with 3 difficulty levels
- ✅ Win/Draw detection
- ✅ Responsive design
- ✅ Audit logging
- ✅ TypeScript support
- ✅ Comprehensive documentation
- ✅ Ocean Professional theme
- ✅ Accessibility features

---

**Built with ❤️ using React + TypeScript + Vite**

# Tic Tac Toe Classic - Project Overview

A complete Tic Tac Toe application featuring player vs player and player vs AI gameplay with three difficulty levels.

## Project Structure

```
tic-tac-toe-classic-210529-210538/
├── tic_tac_toe_frontend/    # React + TypeScript frontend application
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── services/        # Game logic and AI
│   │   ├── styles/          # CSS styling
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── types.ts         # TypeScript definitions
│   ├── index.html           # HTML template
│   ├── package.json         # Dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── README.md            # Detailed documentation
└── README.md                # This file
```

## Features

### Gameplay
- **Player vs Player**: Local multiplayer on the same device
- **Player vs Bot**: AI opponent with three difficulty levels
  - **Easy**: Random moves
  - **Medium**: Strategic heuristics (win, block, center, corner)
  - **Hard**: Minimax algorithm with alpha-beta pruning (unbeatable)

### User Interface
- Modern, clean design with Ocean Professional theme
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Clear status messages
- Accessible controls

### Technical Features
- Built with React 18 + TypeScript
- Vite for fast development and optimized builds
- Comprehensive audit logging
- Input validation and error handling
- JSDoc documentation for all public functions
- Type-safe codebase

## Quick Start

1. Navigate to the frontend directory:
```bash
cd tic_tac_toe_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser to `http://localhost:3000`

## Running Application

The application is accessible at:
- **Development**: http://localhost:3000
- **Production URL**: (provided after deployment)

## Build

To create a production build:
```bash
cd tic_tac_toe_frontend
npm run build
```

Build output will be in `tic_tac_toe_frontend/dist/`

## Architecture

### Frontend (tic_tac_toe_frontend)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: CSS3 with custom properties (CSS variables)
- **State Management**: React useState hooks
- **AI Implementation**: 
  - Easy: Random selection
  - Medium: Rule-based heuristics
  - Hard: Minimax with alpha-beta pruning

### Game Logic
- Win detection across all 8 possible combinations
- Draw detection when board is full
- Move validation (range check, empty cell verification)
- Turn management with automatic AI moves

### Audit System
- Console logging for all user actions
- localStorage persistence for audit trail
- Timestamps in ISO 8601 format
- Action types, details, and metadata

## Compliance Features

### GxP Standards Implementation
- **Audit Trail**: All game actions logged with timestamps
- **Validation**: Input validation on all user interactions
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Documentation**: JSDoc for all public functions
- **Type Safety**: Full TypeScript coverage
- **Traceability**: Requirement IDs in all source files

### Code Quality
- ESLint configuration for code consistency
- TypeScript strict mode enabled
- Proper separation of concerns
- Clear component boundaries
- Reusable utility functions

## Testing

### Manual Test Scenarios
1. **Basic Gameplay**
   - Click cells to place X and O
   - Verify turn alternation
   - Check win detection (rows, columns, diagonals)
   - Verify draw detection

2. **AI Modes**
   - Test Easy difficulty (beatable)
   - Test Medium difficulty (strategic)
   - Test Hard difficulty (challenging)

3. **Controls**
   - Switch between PvP and Bot modes
   - Change difficulty levels
   - Reset game

4. **Responsiveness**
   - Test on mobile viewport
   - Test on tablet viewport
   - Test on desktop viewport

## Theme: Ocean Professional

### Color Scheme
- Primary: Blue (#2563EB)
- Secondary: Amber (#F59E0B)
- Error: Red (#EF4444)
- Background: Light Gray (#f9fafb)
- Surface: White (#ffffff)
- Text: Dark Gray (#111827)

### Design Style
- Modern and minimalist
- Rounded corners (0.5rem - 0.75rem)
- Subtle shadows for depth
- Smooth transitions (150ms - 250ms)
- Gradient accents

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Fast initial load with Vite
- Minimal bundle size (~200KB)
- Optimized React rendering
- Efficient AI calculations with pruning

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- High contrast colors

## Development Notes

### Hot Module Replacement (HMR)
- Vite provides instant HMR during development
- Changes reflect immediately in the browser
- No manual refresh needed

### TypeScript
- Strict mode enabled
- Full type coverage
- Compile-time error detection

### Code Organization
- Components: UI presentation layer
- Services: Business logic and AI
- Utils: Helper functions and audit
- Styles: Scoped CSS per component
- Types: Centralized type definitions

## Future Enhancements (Potential)

- Online multiplayer support
- Game history and replay
- Statistics tracking
- Player profiles
- Customizable themes
- Sound effects
- Undo/redo moves
- Hint system
- Tournament mode

## Version

**Current Version**: 1.0.0

## License

Educational and demonstration purposes.

---

For detailed frontend documentation, see `tic_tac_toe_frontend/README.md`

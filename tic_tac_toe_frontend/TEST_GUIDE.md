# Testing Guide for Tic Tac Toe Application

This document provides guidance for implementing tests for the Tic Tac Toe application.

## Test Structure (Recommended)

```
tic_tac_toe_frontend/
├── src/
│   ├── __tests__/              # Test files
│   │   ├── services/
│   │   │   ├── game.test.ts    # Game logic tests
│   │   │   └── ai.test.ts      # AI algorithm tests
│   │   ├── utils/
│   │   │   └── audit.test.ts   # Audit utility tests
│   │   └── components/
│   │       ├── GameBoard.test.tsx
│   │       ├── Controls.test.tsx
│   │       └── StatusBar.test.tsx
│   └── setupTests.ts           # Test configuration
```

## Recommended Test Framework

- **Vitest**: Fast, Vite-native test runner
- **React Testing Library**: Component testing
- **@testing-library/user-event**: User interaction simulation

### Installation (when ready to add tests)
```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## Test Coverage Goals

### Unit Tests (Target: >80% coverage)

#### 1. Game Service Tests (`src/services/game.test.ts`)

```typescript
// Test: createInitialGameState
- Should create board with 9 null cells
- Should set currentPlayer to 'X'
- Should set status to 'playing'
- Should initialize empty moveHistory

// Test: isValidMove
- Should return true for empty cell with valid index
- Should return false for occupied cell
- Should return false for index < 0
- Should return false for index > 8

// Test: checkWinner
- Should detect horizontal wins (rows 0, 1, 2)
- Should detect vertical wins (columns 0, 1, 2)
- Should detect diagonal wins (both diagonals)
- Should return null when no winner

// Test: isBoardFull
- Should return true when all cells filled
- Should return false when at least one cell empty

// Test: makeMove
- Should place marker on empty cell
- Should switch currentPlayer after move
- Should detect win and update status
- Should detect draw and update status
- Should throw error for invalid move
- Should throw error when game is over
- Should add move to moveHistory

// Test: resetGame
- Should clear board
- Should reset to player 'X'
- Should set status to 'playing'
- Should preserve mode and difficulty
- Should clear moveHistory

// Test: getEmptyCells
- Should return all indices for empty board
- Should return empty array for full board
- Should return correct indices for partially filled board
```

#### 2. AI Service Tests (`src/services/ai.test.ts`)

```typescript
// Test: calculateAIMove (Easy)
- Should return valid empty cell index
- Should only choose from available cells
- Should throw error when no empty cells

// Test: calculateAIMove (Medium)
- Should take winning move when available
- Should block opponent winning move
- Should prefer center when available
- Should prefer corners when center taken
- Should take edges as last resort

// Test: calculateAIMove (Hard)
- Should never lose (test multiple games)
- Should win when possible
- Should force draw against perfect play
- Should handle edge cases (corner first, center first)

// Test: Edge cases
- Should handle board with one empty cell
- Should handle board with two empty cells
- Should work for both X and O players
```

#### 3. Audit Utility Tests (`src/utils/audit.test.ts`)

```typescript
// Test: logAction
- Should log to console
- Should save to localStorage
- Should include timestamp in ISO format
- Should handle localStorage errors gracefully
- Should limit logs to MAX_LOGS

// Test: getAuditLogs
- Should return empty array when no logs
- Should return parsed logs from localStorage
- Should handle invalid JSON gracefully

// Test: clearAuditLogs
- Should remove logs from localStorage
- Should log the clear action
- Should handle errors gracefully

// Test: exportAuditLogs
- Should return JSON string of all logs
- Should log the export action
- Should format JSON with proper indentation
```

### Component Tests

#### 4. GameBoard Component Tests (`src/components/GameBoard.test.tsx`)

```typescript
// Test: Rendering
- Should render 9 cells
- Should display correct markers (X, O, or empty)
- Should apply correct CSS classes for filled cells

// Test: User Interaction
- Should call onCellClick when empty cell clicked
- Should not call onCellClick when filled cell clicked
- Should not call onCellClick when disabled
- Should show cursor pointer for clickable cells

// Test: Accessibility
- Should have proper aria-labels
- Should mark filled cells as disabled
- Should be keyboard navigable
```

#### 5. Controls Component Tests (`src/components/Controls.test.tsx`)

```typescript
// Test: Rendering
- Should display mode selector
- Should display difficulty selector only in vsBot mode
- Should display reset button

// Test: User Interaction
- Should call onModeChange when mode changes
- Should call onDifficultyChange when difficulty changes
- Should call onReset when reset button clicked

// Test: Conditional Rendering
- Should hide difficulty selector in PvP mode
- Should show difficulty selector in vsBot mode
```

#### 6. StatusBar Component Tests (`src/components/StatusBar.test.tsx`)

```typescript
// Test: Status Messages
- Should display "Current player: X" during X turn
- Should display "Current player: O" during O turn
- Should display "X wins!" when X wins
- Should display "O wins!" when O wins
- Should display "It's a draw!" on draw
- Should display "Bot is thinking..." during AI turn

// Test: Styling
- Should apply correct CSS class for each status
- Should display game mode information
```

### Integration Tests

#### 7. Full Game Flow Tests

```typescript
// Test: Complete PvP Game
- Should allow alternating moves
- Should detect win after 3 in a row
- Should prevent moves after game over
- Should reset correctly

// Test: Complete Bot Game (Easy)
- Should allow human move
- Should trigger AI move automatically
- Should complete game to end

// Test: Complete Bot Game (Hard)
- Should never allow human to win with optimal play
- Should result in AI win or draw

// Test: Mode Switching
- Should reset game when switching modes
- Should update UI appropriately

// Test: Difficulty Switching
- Should reset game when changing difficulty
- Should use new difficulty for AI moves
```

### Manual Test Scenarios

1. **Basic Gameplay**
   - [ ] Place markers by clicking cells
   - [ ] Markers alternate between X and O
   - [ ] Win detection works for all 8 combinations
   - [ ] Draw detection works when board fills
   - [ ] Cannot click occupied cells
   - [ ] Cannot move after game ends

2. **AI Easy Mode**
   - [ ] AI makes random moves
   - [ ] Human can win easily
   - [ ] AI never makes invalid moves

3. **AI Medium Mode**
   - [ ] AI blocks winning moves
   - [ ] AI takes winning moves
   - [ ] AI prefers center and corners
   - [ ] Provides reasonable challenge

4. **AI Hard Mode**
   - [ ] Very difficult to beat
   - [ ] Never makes obvious mistakes
   - [ ] Forces draw or wins

5. **Controls**
   - [ ] Mode selector switches between PvP and Bot
   - [ ] Difficulty selector appears only in Bot mode
   - [ ] Reset button clears board and starts new game
   - [ ] Switching mode/difficulty resets game

6. **Responsive Design**
   - [ ] Works on mobile (320px+)
   - [ ] Works on tablet (768px+)
   - [ ] Works on desktop (1024px+)
   - [ ] Touch interactions work on mobile

7. **Accessibility**
   - [ ] Can navigate with keyboard
   - [ ] Focus indicators visible
   - [ ] Screen reader announcements work

8. **Audit Trail**
   - [ ] Actions logged to console
   - [ ] Actions saved to localStorage
   - [ ] Can export audit logs
   - [ ] Can clear audit logs

## Running Tests (Once Implemented)

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with coverage
```bash
npm test -- --coverage
```

### Open test UI
```bash
npm test -- --ui
```

## Test Coverage Thresholds (Recommended)

```json
{
  "test": {
    "coverage": {
      "lines": 80,
      "functions": 80,
      "branches": 75,
      "statements": 80
    }
  }
}
```

## Best Practices

1. **Test Behavior, Not Implementation**
   - Test what the user sees and does
   - Avoid testing internal state directly
   - Focus on public APIs

2. **Arrange-Act-Assert Pattern**
   - Arrange: Set up test data
   - Act: Execute the code
   - Assert: Verify the result

3. **Descriptive Test Names**
   - Use "should" statements
   - Be specific about expected behavior
   - Include the condition being tested

4. **Independent Tests**
   - Each test should run in isolation
   - Don't depend on test execution order
   - Clean up after each test

5. **Mock External Dependencies**
   - Mock localStorage
   - Mock timers for AI delays
   - Mock random functions for predictable tests

## Example Test Implementation

```typescript
// src/services/__tests__/game.test.ts
import { describe, it, expect } from 'vitest';
import { makeMove, createInitialGameState } from '../game';

describe('makeMove', () => {
  it('should place marker on empty cell', () => {
    const state = createInitialGameState();
    const newState = makeMove(state, 0);
    
    expect(newState.board[0]).toBe('X');
    expect(newState.currentPlayer).toBe('O');
  });

  it('should throw error for occupied cell', () => {
    const state = createInitialGameState();
    const stateWithMove = makeMove(state, 0);
    
    expect(() => makeMove(stateWithMove, 0)).toThrow('Invalid move');
  });
});
```

---

**Note**: This guide provides a roadmap for future test implementation. The application is currently test-ready with proper separation of concerns and testable functions.

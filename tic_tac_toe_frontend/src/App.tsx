// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-008
// User Story: Create main application component
// Acceptance Criteria: Integrate all components, manage state, handle AI turns
// GxP Impact: NO - Main application component
// Risk Level: LOW
// ============================================================================

import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import StatusBar from './components/StatusBar';
import { GameState, GameMode, Difficulty } from './types';
import { createInitialGameState, makeMove, resetGame } from './services/game';
import { calculateAIMove } from './services/ai';
import { logAction } from './utils/audit';
import './styles/App.css';

// PUBLIC_INTERFACE
/**
 * App component - Main application entry point
 * 
 * Purpose: Coordinate game flow, state management, and AI turns
 * GxP Critical: No
 */
function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [isAIThinking, setIsAIThinking] = useState(false);

  /**
   * Effect: Handle AI turns automatically
   * Triggers when it's AI's turn (O player in vsBot mode)
   */
  useEffect(() => {
    // Only process AI turn if:
    // 1. Game is in vsBot mode
    // 2. Current player is O (AI)
    // 3. Game is still playing
    // 4. AI is not already thinking
    if (
      gameState.mode === 'vsBot' &&
      gameState.currentPlayer === 'O' &&
      gameState.status === 'playing' &&
      !isAIThinking
    ) {
      setIsAIThinking(true);

      // Add delay for better UX (shows "thinking" message)
      const delay = gameState.difficulty === 'hard' ? 500 : 300;

      setTimeout(() => {
        try {
          const aiMove = calculateAIMove(gameState.board, gameState.difficulty, 'O');
          const newState = makeMove(gameState, aiMove);
          setGameState(newState);
        } catch (error) {
          console.error('AI move failed:', error);
          logAction('AI_MOVE_ERROR', { error: String(error) });
        } finally {
          setIsAIThinking(false);
        }
      }, delay);
    }
  }, [gameState, isAIThinking]);

  /**
   * Handles player cell clicks
   * @param index - Cell index (0-8)
   */
  const handleCellClick = (index: number) => {
    // Validation: Prevent clicks during AI turn or game over
    if (gameState.status !== 'playing' || isAIThinking) {
      return;
    }

    // Validation: In vsBot mode, only allow X (human) to click
    if (gameState.mode === 'vsBot' && gameState.currentPlayer === 'O') {
      return;
    }

    try {
      const newState = makeMove(gameState, index);
      setGameState(newState);
    } catch (error) {
      console.error('Move failed:', error);
      logAction('MOVE_ERROR', { error: String(error), index });
    }
  };

  /**
   * Handles game mode change
   * @param mode - New game mode
   */
  const handleModeChange = (mode: GameMode) => {
    logAction('MODE_CHANGED', { oldMode: gameState.mode, newMode: mode });
    const newState = resetGame({ ...gameState, mode });
    setGameState(newState);
  };

  /**
   * Handles difficulty change
   * @param difficulty - New difficulty level
   */
  const handleDifficultyChange = (difficulty: Difficulty) => {
    logAction('DIFFICULTY_CHANGED', {
      oldDifficulty: gameState.difficulty,
      newDifficulty: difficulty
    });
    const newState = resetGame({ ...gameState, difficulty });
    setGameState(newState);
  };

  /**
   * Handles game reset
   */
  const handleReset = () => {
    const newState = resetGame(gameState);
    setGameState(newState);
    setIsAIThinking(false);
  };

  // Determine if board should be disabled
  const isBoardDisabled = gameState.status !== 'playing' || isAIThinking;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tic Tac Toe</h1>
      </header>

      <main className="app-main">
        <StatusBar gameState={gameState} />
        
        <GameBoard
          board={gameState.board}
          onCellClick={handleCellClick}
          disabled={isBoardDisabled}
        />

        <Controls
          mode={gameState.mode}
          difficulty={gameState.difficulty}
          onModeChange={handleModeChange}
          onDifficultyChange={handleDifficultyChange}
          onReset={handleReset}
        />
      </main>

      <footer className="app-footer">
        <p>Built with React + TypeScript</p>
      </footer>
    </div>
  );
}

export default App;

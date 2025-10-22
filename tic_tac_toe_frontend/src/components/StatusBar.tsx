// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-007
// User Story: Create status display component
// Acceptance Criteria: Show current player, winner, draw, game messages
// GxP Impact: NO - UI component
// Risk Level: LOW
// ============================================================================

import React from 'react';
import { GameState } from '../types';
import '../styles/StatusBar.css';

interface StatusBarProps {
  gameState: GameState;
}

// PUBLIC_INTERFACE
/**
 * StatusBar component - Displays current game status and messages
 * @param gameState - Current game state
 * 
 * Purpose: Inform user of game status and next action
 * GxP Critical: No
 */
const StatusBar: React.FC<StatusBarProps> = ({ gameState }) => {
  /**
   * Generates appropriate status message based on game state
   * @returns Status message string
   */
  const getStatusMessage = (): string => {
    if (gameState.status === 'won') {
      return `${gameState.winner} wins! 🎉`;
    }

    if (gameState.status === 'draw') {
      return "It's a draw! 🤝";
    }

    // Game is in progress
    if (gameState.mode === 'vsBot' && gameState.currentPlayer === 'O') {
      return 'Bot is thinking...';
    }

    return `Current player: ${gameState.currentPlayer}`;
  };

  /**
   * Determines CSS class based on game status
   * @returns CSS class name
   */
  const getStatusClass = (): string => {
    if (gameState.status === 'won') {
      return 'status-won';
    }
    if (gameState.status === 'draw') {
      return 'status-draw';
    }
    return 'status-playing';
  };

  return (
    <div className={`status-bar ${getStatusClass()}`}>
      <p className="status-message">{getStatusMessage()}</p>
      {gameState.status === 'playing' && (
        <p className="status-info">
          {gameState.mode === 'pvp' ? 'Player vs Player' : `vs Bot (${gameState.difficulty})`}
        </p>
      )}
    </div>
  );
};

export default StatusBar;

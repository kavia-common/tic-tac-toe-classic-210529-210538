// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-005
// User Story: Create interactive game board component
// Acceptance Criteria: Render 3x3 grid, handle clicks, display X/O markers
// GxP Impact: NO - UI component
// Risk Level: LOW
// ============================================================================

import React from 'react';
import { Cell } from '../types';
import '../styles/GameBoard.css';

interface GameBoardProps {
  board: Cell[];
  onCellClick: (index: number) => void;
  disabled: boolean;
}

// PUBLIC_INTERFACE
/**
 * GameBoard component - Renders the 3x3 Tic Tac Toe grid
 * @param board - Current board state (9 cells)
 * @param onCellClick - Callback when a cell is clicked
 * @param disabled - Whether the board is disabled (game over or AI turn)
 * 
 * Purpose: Display game board and handle user interactions
 * GxP Critical: No
 */
const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, disabled }) => {
  /**
   * Handles cell click with validation
   * @param index - Cell index (0-8)
   */
  const handleCellClick = (index: number) => {
    if (disabled || board[index] !== null) {
      return;
    }
    onCellClick(index);
  };

  return (
    <div className="game-board">
      {board.map((cell, idx) => (
        <button
          key={idx}
          className={`cell ${cell ? 'filled' : ''} ${cell === 'X' ? 'x-mark' : ''} ${cell === 'O' ? 'o-mark' : ''}`}
          onClick={() => handleCellClick(idx)}
          disabled={disabled || cell !== null}
          aria-label={`Cell ${idx + 1}${cell ? `, occupied by ${cell}` : ', empty'}`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;

// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-003
// User Story: Implement core Tic Tac Toe game logic
// Acceptance Criteria: Win detection, move validation, state management
// GxP Impact: NO - Game logic
// Risk Level: LOW
// ============================================================================

import { Cell, GameState, GameStatus, Player } from '../types';
import { logAction } from '../utils/audit';

/**
 * Winning combinations for Tic Tac Toe
 */
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

// PUBLIC_INTERFACE
/**
 * Creates a new game state with default values
 * @returns Initial game state
 * 
 * Purpose: Initialize a fresh game
 * GxP Critical: No
 * Audit: Logs game creation
 */
export function createInitialGameState(): GameState {
  logAction('GAME_CREATED', { mode: 'pvp', difficulty: 'medium' });
  
  return {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'playing',
    winner: null,
    mode: 'pvp',
    difficulty: 'medium',
    moveHistory: []
  };
}

// PUBLIC_INTERFACE
/**
 * Checks if a move is valid
 * @param board - Current game board
 * @param index - Cell index to check (0-8)
 * @returns True if move is valid, false otherwise
 * 
 * Purpose: Validate user move before applying
 * GxP Critical: No
 * Parameters:
 *   - board: Array of 9 cells
 *   - index: Must be 0-8 and cell must be empty
 * Returns: Boolean indicating validity
 * Throws: None (returns false for invalid input)
 */
export function isValidMove(board: Cell[], index: number): boolean {
  // Validate index range
  if (index < 0 || index > 8) {
    logAction('INVALID_MOVE_ATTEMPT', { reason: 'out_of_range', index });
    return false;
  }

  // Check if cell is empty
  if (board[index] !== null) {
    logAction('INVALID_MOVE_ATTEMPT', { reason: 'cell_occupied', index });
    return false;
  }

  return true;
}

// PUBLIC_INTERFACE
/**
 * Checks if there is a winner on the board
 * @param board - Current game board
 * @returns The winning player ('X' or 'O') or null if no winner
 * 
 * Purpose: Determine if game has been won
 * GxP Critical: No
 * Parameters:
 *   - board: Array of 9 cells
 * Returns: Winning player or null
 */
export function checkWinner(board: Cell[]): Player {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
/**
 * Checks if the board is full (draw condition)
 * @param board - Current game board
 * @returns True if board is full, false otherwise
 * 
 * Purpose: Detect draw condition
 * GxP Critical: No
 */
export function isBoardFull(board: Cell[]): boolean {
  return board.every(cell => cell !== null);
}

// PUBLIC_INTERFACE
/**
 * Determines the current game status
 * @param board - Current game board
 * @returns Game status object with status and winner
 * 
 * Purpose: Evaluate current game state
 * GxP Critical: No
 */
export function getGameStatus(board: Cell[]): { status: GameStatus; winner: Player } {
  const winner = checkWinner(board);
  
  if (winner) {
    return { status: 'won', winner };
  }
  
  if (isBoardFull(board)) {
    return { status: 'draw', winner: null };
  }
  
  return { status: 'playing', winner: null };
}

// PUBLIC_INTERFACE
/**
 * Makes a move on the board
 * @param state - Current game state
 * @param index - Cell index for the move
 * @returns New game state after the move
 * 
 * Purpose: Apply a player move and update game state
 * GxP Critical: No
 * Audit: Logs each move
 * Throws: Error if move is invalid
 */
export function makeMove(state: GameState, index: number): GameState {
  // Validation: Check if game is still in progress
  if (state.status !== 'playing') {
    logAction('MOVE_REJECTED', { reason: 'game_over', status: state.status });
    throw new Error('Game is not in playing state');
  }

  // Validation: Check if move is valid
  if (!isValidMove(state.board, index)) {
    throw new Error('Invalid move');
  }

  // Create new board with the move
  const newBoard = [...state.board];
  newBoard[index] = state.currentPlayer;

  // Log the move
  const move = {
    index,
    player: state.currentPlayer,
    timestamp: new Date().toISOString()
  };
  
  logAction('MOVE_MADE', {
    player: state.currentPlayer,
    position: index,
    moveNumber: state.moveHistory.length + 1
  });

  // Check game status
  const { status, winner } = getGameStatus(newBoard);

  // Log game end if applicable
  if (status === 'won') {
    logAction('GAME_WON', { winner, totalMoves: state.moveHistory.length + 1 });
  } else if (status === 'draw') {
    logAction('GAME_DRAW', { totalMoves: state.moveHistory.length + 1 });
  }

  // Return new state
  return {
    ...state,
    board: newBoard,
    currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
    status,
    winner,
    moveHistory: [...state.moveHistory, move]
  };
}

// PUBLIC_INTERFACE
/**
 * Resets the game to initial state while preserving mode and difficulty
 * @param state - Current game state
 * @returns New game state with reset board
 * 
 * Purpose: Start a new game
 * GxP Critical: No
 * Audit: Logs game reset
 */
export function resetGame(state: GameState): GameState {
  logAction('GAME_RESET', {
    previousMoves: state.moveHistory.length,
    previousStatus: state.status
  });

  return {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'playing',
    winner: null,
    mode: state.mode,
    difficulty: state.difficulty,
    moveHistory: []
  };
}

// PUBLIC_INTERFACE
/**
 * Gets all empty cell indices on the board
 * @param board - Current game board
 * @returns Array of empty cell indices
 * 
 * Purpose: Helper for AI move calculation
 * GxP Critical: No
 */
export function getEmptyCells(board: Cell[]): number[] {
  return board.reduce((acc, cell, index) => {
    if (cell === null) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);
}

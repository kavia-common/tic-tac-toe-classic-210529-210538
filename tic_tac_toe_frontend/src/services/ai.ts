// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-004
// User Story: Implement AI bot with three difficulty levels
// Acceptance Criteria: Easy (random), Medium (basic strategy), Hard (minimax)
// GxP Impact: NO - Game AI logic
// Risk Level: LOW
// ============================================================================

import { Cell, Difficulty } from '../types';
import { checkWinner, getEmptyCells } from './game';
import { logAction } from '../utils/audit';

// PUBLIC_INTERFACE
/**
 * Calculates the best move for the AI based on difficulty level
 * @param board - Current game board
 * @param difficulty - AI difficulty level
 * @param player - AI player ('X' or 'O')
 * @returns Index of the chosen move
 * 
 * Purpose: Determine AI move based on strategy
 * GxP Critical: No
 * Parameters:
 *   - board: Current game state
 *   - difficulty: 'easy' | 'medium' | 'hard'
 *   - player: AI's marker
 * Returns: Valid board index (0-8)
 * Audit: Logs AI move calculation
 */
export function calculateAIMove(board: Cell[], difficulty: Difficulty, player: 'X' | 'O'): number {
  const emptyCells = getEmptyCells(board);

  // Validation: Ensure there are empty cells
  if (emptyCells.length === 0) {
    throw new Error('No empty cells available for AI move');
  }

  let move: number;

  switch (difficulty) {
    case 'easy':
      move = getRandomMove(emptyCells);
      break;
    case 'medium':
      move = getMediumMove(board, emptyCells, player);
      break;
    case 'hard':
      move = getHardMove(board, player);
      break;
    default:
      move = getRandomMove(emptyCells);
  }

  logAction('AI_MOVE_CALCULATED', {
    difficulty,
    player,
    move,
    emptyCellsCount: emptyCells.length
  });

  return move;
}

/**
 * Easy difficulty: Chooses a random empty cell
 * @param emptyCells - Array of empty cell indices
 * @returns Random empty cell index
 */
function getRandomMove(emptyCells: number[]): number {
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

/**
 * Medium difficulty: Uses basic heuristics
 * 1. Win if possible
 * 2. Block opponent from winning
 * 3. Take center if available
 * 4. Take corner if available
 * 5. Take any remaining cell
 * 
 * @param board - Current game board
 * @param emptyCells - Array of empty cell indices
 * @param player - AI player
 * @returns Chosen cell index
 */
function getMediumMove(board: Cell[], emptyCells: number[], player: 'X' | 'O'): number {
  const opponent: 'X' | 'O' = player === 'X' ? 'O' : 'X';

  // 1. Check if AI can win
  const winMove = findWinningMove(board, player);
  if (winMove !== -1) {
    return winMove;
  }

  // 2. Block opponent from winning
  const blockMove = findWinningMove(board, opponent);
  if (blockMove !== -1) {
    return blockMove;
  }

  // 3. Take center if available
  if (emptyCells.includes(4)) {
    return 4;
  }

  // 4. Take a corner if available
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(c => emptyCells.includes(c));
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. Take any remaining cell
  return getRandomMove(emptyCells);
}

/**
 * Finds a winning move for the specified player
 * @param board - Current game board
 * @param player - Player to find winning move for
 * @returns Winning move index or -1 if none exists
 */
function findWinningMove(board: Cell[], player: 'X' | 'O'): number {
  const emptyCells = getEmptyCells(board);

  for (const cell of emptyCells) {
    const testBoard = [...board];
    testBoard[cell] = player;
    if (checkWinner(testBoard) === player) {
      return cell;
    }
  }

  return -1;
}

/**
 * Hard difficulty: Uses minimax algorithm with alpha-beta pruning
 * @param board - Current game board
 * @param player - AI player
 * @returns Best move index
 */
function getHardMove(board: Cell[], player: 'X' | 'O'): number {
  const opponent: 'X' | 'O' = player === 'X' ? 'O' : 'X';
  let bestScore = -Infinity;
  let bestMove = -1;

  const emptyCells = getEmptyCells(board);

  for (const cell of emptyCells) {
    const testBoard = [...board];
    testBoard[cell] = player;
    const score = minimax(testBoard, 0, false, player, opponent, -Infinity, Infinity);
    if (score > bestScore) {
      bestScore = score;
      bestMove = cell;
    }
  }

  return bestMove;
}

/**
 * Minimax algorithm with alpha-beta pruning
 * @param board - Current game board
 * @param depth - Current depth in game tree
 * @param isMaximizing - Whether current player is maximizing
 * @param player - AI player
 * @param opponent - Human player
 * @param alpha - Alpha value for pruning
 * @param beta - Beta value for pruning
 * @returns Score for the current board state
 */
function minimax(
  board: Cell[],
  depth: number,
  isMaximizing: boolean,
  player: 'X' | 'O',
  opponent: 'X' | 'O',
  alpha: number,
  beta: number
): number {
  const winner = checkWinner(board);

  // Terminal conditions
  if (winner === player) {
    return 10 - depth;
  }
  if (winner === opponent) {
    return depth - 10;
  }

  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) {
    return 0; // Draw
  }

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const cell of emptyCells) {
      const testBoard = [...board];
      testBoard[cell] = player;
      const score = minimax(testBoard, depth + 1, false, player, opponent, alpha, beta);
      maxScore = Math.max(score, maxScore);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) {
        break; // Beta cutoff
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const cell of emptyCells) {
      const testBoard = [...board];
      testBoard[cell] = opponent;
      const score = minimax(testBoard, depth + 1, true, player, opponent, alpha, beta);
      minScore = Math.min(score, minScore);
      beta = Math.min(beta, score);
      if (beta <= alpha) {
        break; // Alpha cutoff
      }
    }
    return minScore;
  }
}

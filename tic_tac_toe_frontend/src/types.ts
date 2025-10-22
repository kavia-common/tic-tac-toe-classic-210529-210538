// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-001
// User Story: Define type system for Tic Tac Toe game
// Acceptance Criteria: All game entities have proper type definitions
// GxP Impact: NO - Frontend type definitions
// Risk Level: LOW
// ============================================================================

/**
 * Represents a player in the game (X or O) or an empty cell
 */
export type Player = 'X' | 'O' | null;

/**
 * Represents a single cell on the game board
 */
export type Cell = Player;

/**
 * Represents the game mode
 */
export type GameMode = 'pvp' | 'vsBot';

/**
 * Represents bot difficulty levels
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Represents the current state of the game
 */
export type GameStatus = 'playing' | 'won' | 'draw';

/**
 * Represents the complete game state
 */
export interface GameState {
  board: Cell[];
  currentPlayer: 'X' | 'O';
  status: GameStatus;
  winner: Player;
  mode: GameMode;
  difficulty: Difficulty;
  moveHistory: Move[];
}

/**
 * Represents a move in the game
 */
export interface Move {
  index: number;
  player: 'X' | 'O';
  timestamp: string;
}

/**
 * Represents an audit log entry
 */
export interface AuditLog {
  action: string;
  timestamp: string;
  details: Record<string, unknown>;
}

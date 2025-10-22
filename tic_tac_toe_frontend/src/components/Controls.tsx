// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-006
// User Story: Create game controls component
// Acceptance Criteria: Mode selection, difficulty settings, reset button
// GxP Impact: NO - UI component
// Risk Level: LOW
// ============================================================================

import React from 'react';
import { GameMode, Difficulty } from '../types';
import '../styles/Controls.css';

interface ControlsProps {
  mode: GameMode;
  difficulty: Difficulty;
  onModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onReset: () => void;
}

// PUBLIC_INTERFACE
/**
 * Controls component - Renders game controls and settings
 * @param props - Component props
 * @param props.mode - Current game mode
 * @param props.difficulty - Current AI difficulty
 * @param props.onModeChange - Callback when mode changes
 * @param props.onDifficultyChange - Callback when difficulty changes
 * @param props.onReset - Callback when reset is clicked
 * 
 * Purpose: Provide user controls for game configuration
 * GxP Critical: No
 */
const Controls: React.FC<ControlsProps> = ({
  mode,
  difficulty,
  onModeChange,
  onDifficultyChange,
  onReset
}) => {
  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="game-mode">Game Mode:</label>
        <select
          id="game-mode"
          value={mode}
          onChange={(e) => onModeChange(e.target.value as GameMode)}
          className="control-select"
        >
          <option value="pvp">Player vs Player</option>
          <option value="vsBot">Player vs Bot</option>
        </select>
      </div>

      {mode === 'vsBot' && (
        <div className="control-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
            className="control-select"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      )}

      <button onClick={onReset} className="reset-button">
        Reset Game
      </button>
    </div>
  );
};

export default Controls;

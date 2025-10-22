// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-009
// User Story: Create application entry point
// Acceptance Criteria: Initialize React app, mount to DOM
// GxP Impact: NO - Application bootstrap
// Risk Level: LOW
// ============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { logAction } from './utils/audit';

// Log application start
logAction('APPLICATION_STARTED', {
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent
});

// Find root element
const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Render application
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-002
// User Story: Implement audit logging for frontend user actions
// Acceptance Criteria: All user actions are logged with timestamps
// GxP Impact: YES - Audit trail for user actions
// Risk Level: MEDIUM
// Validation Protocol: VP-AUDIT-001
// ============================================================================

import { AuditLog } from '../types';

/**
 * Storage key for audit logs in localStorage
 */
const AUDIT_LOG_KEY = 'tic_tac_toe_audit_log';

/**
 * Maximum number of audit logs to keep in localStorage
 */
const MAX_LOGS = 100;

// PUBLIC_INTERFACE
/**
 * Logs an action to the audit trail
 * @param action - The action being performed
 * @param details - Additional details about the action
 * 
 * GxP Critical: Yes
 * Audit: Logs to console and localStorage
 */
export function logAction(action: string, details: Record<string, unknown> = {}): void {
  const timestamp = new Date().toISOString();
  
  const auditEntry: AuditLog = {
    action,
    timestamp,
    details
  };

  // Log to console for debugging
  console.log('[AUDIT]', auditEntry);

  // Store in localStorage (optional, for audit trail)
  try {
    const existingLogs = getAuditLogs();
    const updatedLogs = [...existingLogs, auditEntry].slice(-MAX_LOGS);
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(updatedLogs));
  } catch (error) {
    console.warn('Failed to save audit log to localStorage:', error);
  }
}

// PUBLIC_INTERFACE
/**
 * Retrieves all audit logs from localStorage
 * @returns Array of audit log entries
 * 
 * GxP Critical: Yes
 * Audit: Read-only operation, no logging needed
 */
export function getAuditLogs(): AuditLog[] {
  try {
    const logs = localStorage.getItem(AUDIT_LOG_KEY);
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.warn('Failed to retrieve audit logs:', error);
    return [];
  }
}

// PUBLIC_INTERFACE
/**
 * Clears all audit logs from localStorage
 * 
 * GxP Critical: Yes
 * Audit: Logs the clear action before clearing
 */
export function clearAuditLogs(): void {
  logAction('CLEAR_AUDIT_LOGS', { count: getAuditLogs().length });
  try {
    localStorage.removeItem(AUDIT_LOG_KEY);
  } catch (error) {
    console.warn('Failed to clear audit logs:', error);
  }
}

// PUBLIC_INTERFACE
/**
 * Exports audit logs as a JSON string
 * @returns JSON string of all audit logs
 * 
 * GxP Critical: Yes
 * Audit: Logs the export action
 */
export function exportAuditLogs(): string {
  logAction('EXPORT_AUDIT_LOGS');
  const logs = getAuditLogs();
  return JSON.stringify(logs, null, 2);
}

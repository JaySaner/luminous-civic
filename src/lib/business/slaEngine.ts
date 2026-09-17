// ============================================================
// Luminous Civic — SLA Engine
// ============================================================

import { type SLAConfig, type IssuePriority, DEFAULT_SLA_CONFIG } from './types';

export type SLAStatus = 'on_track' | 'warning' | 'breached';

export interface SLAInfo {
  deadline: string; // ISO date
  status: SLAStatus;
  remaining: string;
  remainingMs: number;
  percentUsed: number;
}

export function calculateSLADeadline(
  priority: IssuePriority,
  slaConfig: SLAConfig = DEFAULT_SLA_CONFIG,
  createdAt?: string
): Date {
  let hours = 24;
  if (priority === 'Critical') hours = slaConfig.resolutionHoursCritical || 4;
  else if (priority === 'High') hours = slaConfig.resolutionHoursHigh || 12;
  else if (priority === 'Medium') hours = slaConfig.resolutionHoursMedium || 24;
  else if (priority === 'Low') hours = slaConfig.resolutionHoursLow || 48;

  const deadline = createdAt ? new Date(createdAt) : new Date();
  deadline.setHours(deadline.getHours() + hours);
  return deadline;
}

export function isSLAEscalated(deadlineIso: string, status?: string): boolean {
  if (status === 'resolved' || status === 'closed') return false;
  const deadlineMs = new Date(deadlineIso).getTime();
  return Date.now() > deadlineMs;
}

export function formatSLARemainingTime(deadlineIso: string, status?: string): string {
  if (status === 'resolved' || status === 'closed') return 'Met';

  const diffMs = new Date(deadlineIso).getTime() - Date.now();
  if (diffMs <= 0) {
    const overdueMs = Math.abs(diffMs);
    const hours = Math.floor(overdueMs / (1000 * 60 * 60));
    const mins = Math.floor((overdueMs % (1000 * 60 * 60)) / (1000 * 60));
    return `Overdue by ${hours}h ${mins}m`;
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${mins}m remaining`;
}

export function getSLAStatus(deadline: string): SLAStatus {
  const now = Date.now();
  const deadlineMs = new Date(deadline).getTime();
  const remaining = deadlineMs - now;
  if (remaining <= 0) return 'breached';
  if (remaining < 1000 * 60 * 60 * 4) return 'warning';
  return 'on_track';
}

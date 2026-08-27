import { AuditRepository } from '../src/modules/audit/AuditRepository';

export async function runAuditTests(): Promise<void> {
  if (typeof AuditRepository.log !== 'function') {
    throw new Error('AuditRepository must expose a static log method');
  }
}

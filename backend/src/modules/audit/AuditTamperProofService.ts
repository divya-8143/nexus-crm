import crypto from 'crypto';
import { AuditLogEntry } from '@nexus/shared';

export class AuditTamperProofService {
  public static computeEntryHash(entry: AuditLogEntry, previousHash = 'GENESIS_BLOCK_HASH'): string {
    const payload = JSON.stringify({
      id: entry.id,
      tenantId: entry.tenantId,
      actorEmail: entry.actorEmail,
      actionType: entry.actionType,
      entityType: entry.entityType,
      entityId: entry.entityId,
      beforeState: entry.beforeState,
      afterState: entry.afterState,
      createdAt: entry.createdAt,
      previousHash,
    });

    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  public static verifyChainIntegrity(
    chain: Array<{ entry: AuditLogEntry; hash: string }>
  ): { isTamperFree: boolean; brokenIndex?: number; reason?: string } {
    let prevHash = 'GENESIS_BLOCK_HASH';

    for (let i = 0; i < chain.length; i++) {
      const node = chain[i];
      const expectedHash = this.computeEntryHash(node.entry, prevHash);

      if (node.hash !== expectedHash) {
        return {
          isTamperFree: false,
          brokenIndex: i,
          reason: `Hash mismatch at block index ${i}. Expected ${expectedHash}, found ${node.hash}`,
        };
      }
      prevHash = node.hash;
    }

    return { isTamperFree: true };
  }
}

import { Customer } from '@nexus/shared';

export interface DuplicateMatchResult {
  candidateCustomerId: string;
  candidateName: string;
  candidateEmail: string;
  confidenceScorePercent: number;
  matchReasons: string[];
}

export class CustomerDeduplicationEngine {
  private static calculateLevenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];
    const aLen = a.length;
    const bLen = b.length;

    if (aLen === 0) return bLen;
    if (bLen === 0) return aLen;

    for (let i = 0; i <= bLen; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= aLen; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= bLen; i++) {
      for (let j = 1; j <= aLen; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1,     // insertion
              matrix[i - 1][j] + 1      // deletion
            )
          );
        }
      }
    }

    return matrix[bLen][aLen];
  }

  public static calculateStringSimilarity(str1: string, str2: string): number {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();
    if (s1 === s2) return 1.0;
    const maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1.0;
    const dist = this.calculateLevenshteinDistance(s1, s2);
    return Math.max(0, 1.0 - dist / maxLen);
  }

  public static normalizeDomain(emailOrUrl: string): string {
    if (!emailOrUrl) return '';
    let cleaned = emailOrUrl.toLowerCase().trim();
    if (cleaned.includes('@')) {
      cleaned = cleaned.split('@')[1];
    }
    cleaned = cleaned.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    return cleaned;
  }

  public static findDuplicates(
    target: Partial<Customer>,
    existingCustomers: Customer[],
    threshold = 70
  ): DuplicateMatchResult[] {
    const results: DuplicateMatchResult[] = [];
    const targetEmailDomain = target.email ? this.normalizeDomain(target.email) : '';
    const targetWebsiteDomain = target.website ? this.normalizeDomain(target.website) : '';
    const targetPhone = target.phone ? target.phone.replace(/[^0-9]/g, '') : '';

    for (const existing of existingCustomers) {
      if (existing.id === target.id) continue;

      let score = 0;
      const reasons: string[] = [];

      // 1. Exact Email Match
      if (target.email && existing.email && target.email.toLowerCase() === existing.email.toLowerCase()) {
        score += 95;
        reasons.push('Exact email address match');
      }

      // 2. Exact or Normalized Phone Match
      if (targetPhone && existing.phone) {
        const existingPhone = existing.phone.replace(/[^0-9]/g, '');
        if (targetPhone.length >= 7 && targetPhone === existingPhone) {
          score += 85;
          reasons.push('Exact phone number match');
        }
      }

      // 3. Name Similarity
      if (target.name && existing.name) {
        const nameSim = this.calculateStringSimilarity(target.name, existing.name);
        if (nameSim > 0.85) {
          score += Math.round(nameSim * 50);
          reasons.push(`High name similarity (${Math.round(nameSim * 100)}%)`);
        }
      }

      // 4. Domain Match
      const existingEmailDomain = existing.email ? this.normalizeDomain(existing.email) : '';
      if (
        targetEmailDomain &&
        existingEmailDomain &&
        targetEmailDomain === existingEmailDomain &&
        !['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'].includes(targetEmailDomain)
      ) {
        score += 40;
        reasons.push(`Matching corporate email domain (@${targetEmailDomain})`);
      }

      const totalConfidence = Math.min(100, score);
      if (totalConfidence >= threshold) {
        results.push({
          candidateCustomerId: existing.id,
          candidateName: existing.name,
          candidateEmail: existing.email,
          confidenceScorePercent: totalConfidence,
          matchReasons: reasons,
        });
      }
    }

    return results.sort((a, b) => b.confidenceScorePercent - a.confidenceScorePercent);
  }
}

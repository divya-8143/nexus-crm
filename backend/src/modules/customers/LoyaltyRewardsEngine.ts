// Customer Loyalty Rewards Engine
export class LoyaltyRewardsEngine {
  public static calculatePoints(spent: number): number {
    return Math.floor(spent / 100) * 5;
  }
}

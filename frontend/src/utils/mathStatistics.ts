export class MathStatisticsEngine {
  public static calculateMean(values: number[]): number {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }

  public static calculateStandardDeviation(values: number[]): number {
    if (values.length <= 1) return 0;
    const mean = this.calculateMean(values);
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (values.length - 1);
    return Math.sqrt(variance);
  }

  public static calculateLinearRegression(points: Array<{ x: number; y: number }>): {
    slope: number;
    intercept: number;
    rSquared: number;
  } {
    const n = points.length;
    if (n <= 1) return { slope: 0, intercept: 0, rSquared: 0 };

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    let sumYY = 0;

    for (const p of points) {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
      sumYY += p.y * p.y;
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Calculate Pearson correlation coefficient (r)
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
    const r = denominator === 0 ? 0 : numerator / denominator;
    const rSquared = Math.pow(r, 2);

    return {
      slope: Math.round(slope * 10000) / 10000,
      intercept: Math.round(intercept * 100) / 100,
      rSquared: Math.round(rSquared * 10000) / 10000,
    };
  }

  public static calculateExponentialMovingAverage(data: number[], alpha = 0.3): number[] {
    if (data.length === 0) return [];
    const ema: number[] = [data[0]];

    for (let i = 1; i < data.length; i++) {
      const val = alpha * data[i] + (1 - alpha) * ema[i - 1];
      ema.push(Math.round(val * 100) / 100);
    }

    return ema;
  }
}

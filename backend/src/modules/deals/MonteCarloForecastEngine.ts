import { Deal } from '@nexus/shared';

export interface ForecastSimulationResult {
  simulationRuns: number;
  conservativeForecast: number; // 10th percentile
  medianForecast: number;       // 50th percentile
  optimisticForecast: number;   // 90th percentile
  meanForecast: number;
  standardDeviation: number;
  dealBreakdowns: Array<{
    dealId: string;
    title: string;
    value: number;
    probability: number;
    winOccurrences: number;
  }>;
}

export class MonteCarloForecastEngine {
  public static runSimulation(deals: Deal[], iterations = 1000): ForecastSimulationResult {
    const activeDeals = deals.filter((d) => d.stage !== 'CLOSED_WON' && d.stage !== 'CLOSED_LOST');
    const closedWonTotal = deals
      .filter((d) => d.stage === 'CLOSED_WON')
      .reduce((sum, d) => sum + d.dealValue, 0);

    const simulationTotals: number[] = [];
    const winCounts: Map<string, number> = new Map();
    activeDeals.forEach((d) => winCounts.set(d.id, 0));

    for (let run = 0; run < iterations; run++) {
      let runTotal = closedWonTotal;

      for (const deal of activeDeals) {
        const roll = Math.random() * 100;
        if (roll <= deal.winProbability) {
          runTotal += deal.dealValue;
          winCounts.set(deal.id, (winCounts.get(deal.id) || 0) + 1);
        }
      }

      simulationTotals.push(runTotal);
    }

    simulationTotals.sort((a, b) => a - b);

    const p10Index = Math.floor(iterations * 0.1);
    const p50Index = Math.floor(iterations * 0.5);
    const p90Index = Math.floor(iterations * 0.9);

    const sum = simulationTotals.reduce((a, b) => a + b, 0);
    const mean = sum / iterations;

    const variance =
      simulationTotals.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / iterations;
    const stdDev = Math.sqrt(variance);

    const dealBreakdowns = activeDeals.map((d) => ({
      dealId: d.id,
      title: d.title,
      value: d.dealValue,
      probability: d.winProbability,
      winOccurrences: winCounts.get(d.id) || 0,
    }));

    return {
      simulationRuns: iterations,
      conservativeForecast: Math.round(simulationTotals[p10Index]),
      medianForecast: Math.round(simulationTotals[p50Index]),
      optimisticForecast: Math.round(simulationTotals[p90Index]),
      meanForecast: Math.round(mean),
      standardDeviation: Math.round(stdDev),
      dealBreakdowns,
    };
  }
}

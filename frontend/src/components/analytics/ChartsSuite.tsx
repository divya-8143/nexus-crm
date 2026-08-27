import React from 'react';

// 1. Area Revenue Chart
export interface AreaChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  color?: string;
}

export const AreaRevenueChart: React.FC<AreaChartProps> = ({
  data,
  height = 200,
  color = '#0284c7',
}) => {
  if (!data || data.length === 0) return <div className="h-40 flex items-center justify-center text-slate-400">No data</div>;

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const width = 600;
  const padding = 30;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const points = data.map((d, idx) => {
    const x = padding + (idx / (data.length - 1)) * graphWidth;
    const y = height - padding - (d.value / maxValue) * graphHeight;
    return `${x},${y}`;
  });

  const pathString = `M ${points[0]} ` + points.slice(1).map((p) => `L ${p}`).join(' ');
  const areaString = `${pathString} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal Grid lines */}
        {[0.25, 0.5, 0.75, 1.0].map((ratio) => (
          <line
            key={ratio}
            x1={padding}
            y1={height - padding - ratio * graphHeight}
            x2={width - padding}
            y2={height - padding - ratio * graphHeight}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
        ))}

        {/* Filled Area */}
        <path d={areaString} fill="url(#areaGrad)" />

        {/* Stroke Line */}
        <path d={pathString} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {data.map((d, idx) => {
          const x = padding + (idx / (data.length - 1)) * graphWidth;
          const y = height - padding - (d.value / maxValue) * graphHeight;
          return (
            <g key={idx} className="group cursor-pointer">
              <circle cx={x} cy={y} r="4" fill="#ffffff" stroke={color} strokeWidth="2.5" />
              <text x={x} y={height - 10} textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="500">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// 2. Funnel Conversion Chart
export interface FunnelStage {
  name: string;
  count: number;
  conversionPercent: number;
}

export const PipelineFunnelChart: React.FC<{ stages: FunnelStage[] }> = ({ stages }) => {
  return (
    <div className="space-y-3">
      {stages.map((stage, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">{stage.name}</span>
            <span className="text-slate-500">{stage.count} ({stage.conversionPercent}%)</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${stage.conversionPercent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

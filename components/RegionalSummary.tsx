
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { RegionalData, RegionalKpiData } from '../types';
import { KpiCard } from './ui/Card';

interface RegionalSummaryProps {
  regionalData: RegionalData;
  kpis: RegionalKpiData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const formatNumber = (num: number) => {
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}k`;
  return num.toFixed(1);
};


export const RegionalSummary: React.FC<RegionalSummaryProps> = ({ regionalData, kpis }) => {
  const pieData = Object.entries(regionalData.generationMix)
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0);

  const renderCustomLabel = ({ name, percent }: { name: string, percent: number }) => {
    if (!percent) {
      return null;
    }
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4 text-brand-text-main">Regional Summary</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
        <KpiCard title="Total Cost" value={`$${formatNumber(kpis.totalCost)}B`} />
        <KpiCard title="Investment" value={`$${formatNumber(kpis.totalInvestment)}B`} />
        <KpiCard title="Emissions" value={`${formatNumber(kpis.totalEmissions)} MtCO₂`} />
        <KpiCard title="Geopolitical Cost" value={`$${formatNumber(kpis.geopoliticalCost)}B`} />
      </div>
      <div className="flex-grow">
         <h3 className="text-md font-semibold text-brand-text-secondary mb-2 text-center">Regional Generation Mix (GWh)</h3>
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={renderCustomLabel}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161B22',
                  borderColor: '#30363D',
                  borderRadius: '0.5rem',
                }}
              />
               <Legend iconSize={10}/>
            </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

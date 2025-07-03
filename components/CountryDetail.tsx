
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Country, CountryData, CountryKpiData } from '../types';
import { KpiCard } from './ui/Card';

interface CountryDetailProps {
  country: Country;
  data: CountryData;
  kpis: CountryKpiData;
}

const formatNumber = (num: number) => {
    if (Math.abs(num) >= 1e3) return `${(num / 1e3).toFixed(1)}k`;
    return num.toFixed(1);
};

export const CountryDetail: React.FC<CountryDetailProps> = ({ country, data, kpis }) => {

  const generationData = Object.entries(data.generationMix).map(([name, value]) => ({ name, GWh: value }));
  
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4 text-brand-text-main">{country.name} Details</h2>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <KpiCard title="Loss by Trusting" value={`$${formatNumber(kpis.lossToTrust)}M`} tooltip="Economic loss from relying on an integrated system that may not materialize." />
        <KpiCard title="Loss by Not Trusting" value={`$${formatNumber(kpis.lossToNotTrust)}M`} tooltip="Economic loss from maintaining a redundant, isolated system." />
        <KpiCard title="Imports" value={`${formatNumber(kpis.energyBalance.imports)} GWh`} />
        <KpiCard title="Exports" value={`${formatNumber(kpis.energyBalance.exports)} GWh`} />
      </div>

      <div className="flex-grow">
        <h3 className="text-md font-semibold text-brand-text-secondary mb-2 text-center">Generation Mix (GWh)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={generationData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363D" />
            <XAxis type="number" stroke="#8B949E" fontSize={10} />
            <YAxis type="category" dataKey="name" stroke="#8B949E" width={80} fontSize={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#161B22',
                borderColor: '#30363D',
                borderRadius: '0.5rem',
              }}
              cursor={{ fill: '#30363D80' }}
            />
            <Bar dataKey="GWh" fill="#58A6FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

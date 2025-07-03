
import React from 'react';
import { ScenarioConfig } from '../types';

interface ControlPanelProps {
  config: ScenarioConfig;
  setConfig: React.Dispatch<React.SetStateAction<ScenarioConfig>>;
}

const Select: React.FC<React.PropsWithChildren<{ value: string | number; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; label: string }>> = ({ label, value, onChange, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-brand-text-secondary mb-1">{label}</label>
    <select value={value} onChange={onChange} className="w-full bg-brand-bg border border-brand-border rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary transition">
      {children}
    </select>
  </div>
);


export const ControlPanel: React.FC<ControlPanelProps> = ({ config, setConfig }) => {
  const handleChange = <T extends keyof ScenarioConfig>(key: T, value: ScenarioConfig[T]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4 text-brand-text-main border-b border-brand-border pb-2">Scenario Controls</h2>
      
      <Select label="Horizonte Temporal (Año)" value={config.year} onChange={e => handleChange('year', parseInt(e.target.value) as 2035 | 2045)}>
        <option value={2035}>2035</option>
        <option value={2045}>2045</option>
      </Select>

      <div className="mb-4">
        <h3 className="text-md font-semibold text-brand-text-secondary mb-2">Integración</h3>
         <Select label="Transmisión" value={config.transmission} onChange={e => handleChange('transmission', e.target.value as any)}>
            <option value="Aislado">Sistema Aislado</option>
            <option value="Integrado">Sistema Integrado</option>
        </Select>
         <Select label="Soberanía Energética" value={config.sovereignty} onChange={e => handleChange('sovereignty', e.target.value as any)}>
            <option value="ConSoberania">Con Soberanía</option>
            <option value="SinSoberania">Sin Soberanía</option>
        </Select>
      </div>
      
      <div className="mb-4">
        <h3 className="text-md font-semibold text-brand-text-secondary mb-2">Condiciones Hidrológicas</h3>
         <Select label="Región Andina" value={config.hydroAndean} onChange={e => handleChange('hydroAndean', e.target.value as any)}>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
        </Select>
         <Select label="Región Cono Sur" value={config.hydroConoSur} onChange={e => handleChange('hydroConoSur', e.target.value as any)}>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
        </Select>
      </div>

    </div>
  );
};

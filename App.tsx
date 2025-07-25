
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { MapVisualization } from './components/MapVisualization';
import { RegionalSummary } from './components/RegionalSummary';
import { CountryDetail } from './components/CountryDetail';
import { AboutModal } from './components/AboutModal';
import { Loader } from './components/ui/Loader';
import {
  ScenarioConfig,
  ScenarioData,
  Country,
  KpiData
} from './types';
import { mockFetchScenarioData, getCountryByName } from './services/dataService';
import { calculateKpis } from './services/calculationService';
import { COUNTRIES, INITIAL_SCENARIO_CONFIG } from './constants';

const App: React.FC = () => {
  const [scenarioConfig, setScenarioConfig] = useState<ScenarioConfig>(INITIAL_SCENARIO_CONFIG);
  const [scenarioData, setScenarioData] = useState<ScenarioData | null>(null);
  const [kpiData, setKpiData] = useState<KpiData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);

  const fetchAndProcessData = useCallback(async (config: ScenarioConfig) => {
    setLoading(true);
    setError(null);
    setSelectedCountry(null);
    try {
      const data = await mockFetchScenarioData(config);
      setScenarioData(data);
      const kpis = calculateKpis(data);
      setKpiData(kpis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setScenarioData(null);
      setKpiData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndProcessData(scenarioConfig);
  }, [scenarioConfig, fetchAndProcessData]);

  const handleCountrySelect = (countryName: string) => {
    const country = getCountryByName(countryName);
    setSelectedCountry(country ?? null);
  };

  const selectedCountryData = useMemo(() => {
    if (!selectedCountry || !scenarioData) return null;
    return scenarioData.countries[selectedCountry.name] || null;
  }, [selectedCountry, scenarioData]);

  const selectedCountryKpis = useMemo(() => {
    if (!selectedCountry || !kpiData) return null;
    return kpiData.countries[selectedCountry.name] || null;
  }, [selectedCountry, kpiData]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-main p-4 lg:p-6 flex flex-col">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-brand-text-main">LATAM Energy Integration Explorer</h1>
          <p className="text-sm text-brand-text-secondary">Visualizing the Future of Energy in Latin America</p>
        </div>
        <button onClick={() => setIsAboutModalOpen(true)} className="px-4 py-2 bg-brand-surface border border-brand-border rounded-md hover:bg-brand-border transition-colors text-sm">
          About
        </button>
      </header>

      <div className="flex-grow flex flex-col lg:flex-row gap-4">
        {/* Control panel */}
        <aside className="bg-brand-surface border border-brand-border rounded-lg p-4 flex-shrink-0 lg:w-72">
          <ControlPanel config={scenarioConfig} setConfig={setScenarioConfig} />
        </aside>

        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Map section */}
          <div className="col-span-1 lg:col-span-2 bg-brand-surface border border-brand-border rounded-lg p-2 relative">
            {loading && <Loader />}
            {error && <div className="text-brand-accent-red flex items-center justify-center h-full">{error}</div>}
            {!loading && !error && scenarioData && kpiData && (
              <MapVisualization
                nodes={COUNTRIES}
                lines={kpiData.regional.lines}
                onNodeClick={handleCountrySelect}
                selectedCountry={selectedCountry}
              />
            )}
          </div>

          {/* Regional summary */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-4 flex flex-col overflow-hidden">
            {loading && <Loader />}
            {error && <div className="text-brand-accent-red flex items-center justify-center h-full">Error loading data</div>}
            {!loading && !error && scenarioData && kpiData && (
              <RegionalSummary regionalData={scenarioData.regional} kpis={kpiData.regional} />
            )}
          </div>

          {/* Country detail */}
          <div className="bg-brand-surface border border-brand-border rounded-lg p-4 relative overflow-y-auto">
            {loading && <Loader />}
            {!selectedCountry && !loading && <div className="flex items-center justify-center h-full text-brand-text-secondary">Select a country on the map to see details</div>}
            {selectedCountry && !selectedCountryData && !loading && <div className="text-brand-accent-red flex items-center justify-center h-full">No data for {selectedCountry.name}</div>}
            {selectedCountry && selectedCountryData && kpiData && selectedCountryKpis && (
              <CountryDetail country={selectedCountry} data={selectedCountryData} kpis={selectedCountryKpis} />
            )}
          </div>
        </main>
      </div>
      {isAboutModalOpen && <AboutModal onClose={() => setIsAboutModalOpen(false)} />}
    </div>
  );
};

export default App;

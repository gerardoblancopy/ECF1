export interface ScenarioConfig {
  year: 2025 | 2035 | 2045;
  transmission: 'Aislado' | 'Integrado';
  sovereignty: 'ConSoberania' | 'SinSoberania';
  demand: 'CasoBase' | 'SinCarbon' | 'ElecPlus' | 'ElecRenLimit';
  hydroAndean: 'Alta' | 'Media' | 'Baja';
  hydroConoSur: 'Alta' | 'Media' | 'Baja';
}

export interface Country {
  name: string;
  code: string;
  latlng: [number, number];
}

export interface GenerationMix {
  Solar: number;
  Eolica: number;
  Nuclear: number;
  Embalse: number;
  Pasada: number;
  Coal: number;
  Gas: number;
  Diesel: number;
}

export interface TimeSeriesData {
  time: number[];
  values: number[];
}

export interface CountryData {
  generationMix: GenerationMix;
  demandVsGeneration: TimeSeriesData;
  capacity: {
    existing: number;
    new: number;
  };
}

export interface RegionalData {
  generationMix: GenerationMix;
  demandVsGeneration: TimeSeriesData;
}

export interface ScenarioData {
  regional: RegionalData;
  countries: Record<string, CountryData>;
}

export interface LineData {
  id: string;
  from: string;
  to: string;
  capacity: number;
  flow: number;
  isNew: boolean;
}

export interface CountryKpiData {
  lossToTrust: number; // perdida por confiar
  lossToNotTrust: number; // perdida por no confiar
  energyBalance: {
    imports: number;
    exports: number;
  }
}

export interface RegionalKpiData {
  totalCost: number;
  totalInvestment: number;
  totalEmissions: number;
  geopoliticalCost: number;
  lines: LineData[];
}

export interface KpiData {
  regional: RegionalKpiData,
  countries: Record<string, CountryKpiData>
}
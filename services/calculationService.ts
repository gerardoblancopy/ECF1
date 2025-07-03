
import { ScenarioData, KpiData, LineData } from '../types';
import { COUNTRIES } from '../constants';

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

export const calculateKpis = (data: ScenarioData): KpiData => {
  // These are mock calculations. A real implementation would use formulas from the paper.
  const regionalGenerationSum = Object.values(data.regional.generationMix).reduce((a, b) => a + b, 0);

  const kpis: KpiData = {
    regional: {
      totalCost: getRandomArbitrary(100000, 150000), // in Millions
      totalInvestment: getRandomArbitrary(30000, 60000), // in Millions
      totalEmissions: (data.regional.generationMix.Coal * 0.9 + data.regional.generationMix.Gas * 0.4 + data.regional.generationMix.Diesel * 0.7) / 1000, // in MtCO2
      geopoliticalCost: getRandomArbitrary(1000, 5000), // in Millions
      lines: [
          {id: 'CO-VE', from: 'Colombia', to: 'Venezuela', capacity: 300, flow: 150, isNew: false},
          {id: 'CO-EC', from: 'Colombia', to: 'Ecuador', capacity: 500, flow: -250, isNew: false},
          {id: 'EC-PE', from: 'Ecuador', to: 'Peru', capacity: 400, flow: 200, isNew: true},
          {id: 'PE-CL', from: 'Peru', to: 'Chile', capacity: 600, flow: 300, isNew: true},
          {id: 'PE-BO', from: 'Peru', to: 'Bolivia', capacity: 250, flow: -100, isNew: false},
          {id: 'BO-AR', from: 'Bolivia', to: 'Argentina', capacity: 700, flow: 400, isNew: true},
          {id: 'BO-BR', from: 'Bolivia', to: 'Brazil', capacity: 1200, flow: 800, isNew: true},
          {id: 'AR-CL', from: 'Argentina', to: 'Chile', capacity: 1000, flow: -500, isNew: true},
          {id: 'AR-PY', from: 'Argentina', to: 'Paraguay', capacity: 800, flow: -600, isNew: false},
          {id: 'AR-UY', from: 'Argentina', to: 'Uruguay', capacity: 2000, flow: 1200, isNew: false},
          {id: 'PY-BR', from: 'Paraguay', to: 'Brazil', capacity: 6000, flow: 5500, isNew: false},
          {id: 'UY-BR', from: 'Uruguay', to: 'Brazil', capacity: 500, flow: 300, isNew: false},
      ].map(line => ({...line, capacity: line.capacity * getRandomArbitrary(0.8, 1.5), flow: line.flow * getRandomArbitrary(0.7, 1.2)}))
    },
    countries: {}
  };

  COUNTRIES.forEach(country => {
    if(data.countries[country.name]){
       kpis.countries[country.name] = {
            lossToTrust: getRandomArbitrary(100, 3000), // in Millions
            lossToNotTrust: getRandomArbitrary(500, 4000), // in Millions
            energyBalance: {
                imports: getRandomArbitrary(500, 10000), // GWh
                exports: getRandomArbitrary(500, 10000), // GWh
            }
       }
    }
  });

  return kpis;
};

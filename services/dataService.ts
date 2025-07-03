
import { ScenarioConfig, ScenarioData, Country } from '../types';
import { COUNTRIES } from '../constants';

const MOCK_DATA: Record<string, ScenarioData> = {
  default: {
    regional: {
      generationMix: { Solar: 120000, Eolica: 150000, Nuclear: 25000, Embalse: 300000, Pasada: 180000, Coal: 50000, Gas: 90000, Diesel: 15000 },
      demandVsGeneration: { time: [1, 2, 3], values: [100, 120, 110] },
    },
    countries: {
      Brazil: {
        generationMix: { Solar: 30000, Eolica: 40000, Nuclear: 8000, Embalse: 150000, Pasada: 50000, Coal: 10000, Gas: 20000, Diesel: 5000 },
        demandVsGeneration: { time: [1,2,3], values: [10,12,11]},
        capacity: { existing: 200000, new: 50000 },
      },
      Argentina: {
        generationMix: { Solar: 15000, Eolica: 25000, Nuclear: 5000, Embalse: 40000, Pasada: 20000, Coal: 8000, Gas: 15000, Diesel: 3000 },
        demandVsGeneration: { time: [1,2,3], values: [8,9,8.5]},
        capacity: { existing: 50000, new: 15000 },
      },
       Chile: {
        generationMix: { Solar: 25000, Eolica: 15000, Nuclear: 0, Embalse: 10000, Pasada: 5000, Coal: 2000, Gas: 8000, Diesel: 1000 },
        demandVsGeneration: { time: [1,2,3], values: [5,6,5.5]},
        capacity: { existing: 25000, new: 20000 },
      },
       Colombia: {
        generationMix: { Solar: 5000, Eolica: 2000, Nuclear: 0, Embalse: 60000, Pasada: 80000, Coal: 5000, Gas: 10000, Diesel: 2000 },
        demandVsGeneration: { time: [1,2,3], values: [12,14,13]},
        capacity: { existing: 80000, new: 10000 },
      },
       Peru: {
        generationMix: { Solar: 3000, Eolica: 1000, Nuclear: 0, Embalse: 25000, Pasada: 15000, Coal: 1000, Gas: 5000, Diesel: 500 },
        demandVsGeneration: { time: [1,2,3], values: [4,5,4.5]},
        capacity: { existing: 20000, new: 5000 },
      },
       Bolivia: {
        generationMix: { Solar: 1000, Eolica: 500, Nuclear: 0, Embalse: 2000, Pasada: 1000, Coal: 1000, Gas: 15000, Diesel: 500 },
        demandVsGeneration: { time: [1,2,3], values: [2,2.5,2.2]},
        capacity: { existing: 5000, new: 2000 },
      },
    },
  },
};

const scenarioKeyBuilder = (config: ScenarioConfig): string => {
  // In a real app, this would build a path to a specific data file/folder.
  // Here, we just use a default key as we only have one mock data set.
  // Example of a full key:
  // return `${config.year}_${config.transmission}_${config.sovereignty}_${config.demand}_${config.hydroAndean}_${config.hydroConoSur}`;
  return 'default';
};

export const mockFetchScenarioData = (config: ScenarioConfig): Promise<ScenarioData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const key = scenarioKeyBuilder(config);
      const data = MOCK_DATA[key];
      if (data) {
        // Add random variations to simulate different scenarios
        const randomFactor = 0.8 + Math.random() * 0.4; // between 0.8 and 1.2
        const randomizedData = JSON.parse(JSON.stringify(data)); // Deep copy
        
        Object.keys(randomizedData.regional.generationMix).forEach(k => {
          randomizedData.regional.generationMix[k] *= randomFactor;
        });

         Object.keys(randomizedData.countries).forEach(country => {
            const countryFactor = 0.8 + Math.random() * 0.4;
            Object.keys(randomizedData.countries[country].generationMix).forEach(k => {
                randomizedData.countries[country].generationMix[k] *= countryFactor;
            });
        });

        resolve(randomizedData);
      } else {
        reject(new Error(`Scenario data for '${key}' not found.`));
      }
    }, 1000); // Simulate network delay
  });
};

export const getCountryByName = (name: string): Country | undefined => {
    return COUNTRIES.find(c => c.name === name);
}

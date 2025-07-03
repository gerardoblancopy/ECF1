
import React from 'react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-brand-surface border border-brand-border rounded-lg p-6 max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 text-brand-primary">About This Application</h2>
        
        <div className="space-y-4 text-brand-text-secondary">
          <p>
            The <strong>LATAM Energy Integration Explorer</strong> is an interactive tool designed to visualize and analyze future scenarios for Latin America's energy sector. It is based on the research and data presented in the white paper: <em>"Integración energética y descarbonización en América Latina: La dinámica de la integración bajo el enfoque de corrientes múltiples"</em>.
          </p>
          <p>
            This application allows users to explore the impacts of different policy choices, technological pathways, and climate conditions on the region's energy security, economic costs, and decarbonization efforts.
          </p>
          
          <div>
            <h3 className="font-semibold text-brand-text-main mb-2">Key Metrics:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Costo Geopolítico:</strong> Represents the economic "premium" or cost incurred by a country for prioritizing energy sovereignty over potentially more efficient regional integration.</li>
              <li><strong>Pérdida por Confiar:</strong> The potential economic loss a country faces if it invests based on regional cooperation that ultimately fails to deliver, leaving it with an energy deficit.</li>
              <li><strong>Pérdida por No Confiar:</strong> The opportunity cost a country incurs by over-investing in redundant national infrastructure instead of benefiting from a more cost-effective, integrated regional system.</li>
            </ul>
          </div>

          <p>
            All data is pre-calculated from a sophisticated optimization model detailed in the source paper. This web application serves as a visualization layer and does not run live simulations.
          </p>
        </div>

        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-4 py-2 bg-brand-primary text-brand-bg rounded-md hover:bg-brand-secondary transition-colors font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip as LeafletTooltip } from 'react-leaflet';
import L from 'leaflet';
import { Country, LineData } from '../types';
import { getCountryByName } from '../services/dataService';

interface MapVisualizationProps {
  nodes: Country[];
  lines: LineData[];
  onNodeClick: (countryName: string) => void;
  selectedCountry: Country | null;
}

const createDivIcon = (isSelected: boolean, code: string) => {
  const baseClasses = 'rounded-full border-2 transition-all duration-300 flex items-center justify-center font-bold text-xs';
  const size = isSelected ? 'w-6 h-6' : 'w-5 h-5';
  const color = isSelected 
    ? 'bg-brand-accent-yellow border-white text-brand-bg shadow-lg' 
    : 'bg-brand-primary border-brand-surface text-white';
  
  return L.divIcon({
    html: `<div class="${size} ${color} ${baseClasses}">${code}</div>`,
    className: 'leaflet-div-icon-container',
    iconSize: isSelected ? [24, 24] : [20, 20],
    iconAnchor: isSelected ? [12, 12] : [10, 10],
  });
};

export const MapVisualization: React.FC<MapVisualizationProps> = ({ nodes, lines, onNodeClick, selectedCountry }) => {
  
  const mapCenter: L.LatLngExpression = [-15, -60];
  const mapZoom = 4;

  const mapLines = lines.map(line => {
    const fromNode = getCountryByName(line.from);
    const toNode = getCountryByName(line.to);
    if (!fromNode || !toNode) return null;
    return { ...line, fromLatLng: fromNode.latlng, toLatLng: toNode.latlng };
  }).filter((line): line is NonNullable<typeof line> => line !== null);

  const flowMax = Math.max(...mapLines.map(l => Math.abs(l.flow)), 1);
  const capacityMax = Math.max(...mapLines.map(l => l.capacity), 1);

  return (
    <div className="w-full h-full bg-brand-bg rounded-lg overflow-hidden">
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {mapLines.map((line) => {
          const pathOptions = {
            weight: 2 + (line.capacity / capacityMax) * 6,
            opacity: 0.5 + (Math.abs(line.flow) / flowMax) * 0.4,
            color: line.isNew ? '#e6b432' : (line.flow > 0 ? '#58A6FF' : '#F78166'),
          };
          return (
            <Polyline
              key={line.id}
              positions={[line.fromLatLng, line.toLatLng]}
              pathOptions={pathOptions}
            />
          );
        })}
        
        {nodes.map((node) => {
          const isSelected = selectedCountry?.name === node.name;
          const countryCode = node.code === 'French Guiana' ? 'GF' : node.code;
          return (
            <Marker 
              key={node.code}
              position={node.latlng}
              icon={createDivIcon(isSelected, countryCode)}
              eventHandlers={{
                click: () => onNodeClick(node.name),
              }}
            >
              <LeafletTooltip direction="top" offset={[0, -10]} opacity={1} className="custom-leaflet-tooltip">
                {node.name}
              </LeafletTooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
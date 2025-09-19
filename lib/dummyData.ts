// Dummy data for all features

export const biodiversityData = [
  { species: "Clownfish", count: 120, location: "Andaman Sea", date: "2025-09-01", trend: "increasing", coordinates: { lat: 12.5, lng: 92.9 } },
  { species: "Coral Grouper", count: 80, location: "Lakshadweep", date: "2025-09-02", trend: "stable", coordinates: { lat: 10.5, lng: 72.2 } },
  { species: "Sea Turtle", count: 15, location: "Bay of Bengal", date: "2025-09-03", trend: "decreasing", coordinates: { lat: 18.0, lng: 89.0 } },
  { species: "Whale Shark", count: 5, location: "Gujarat Coast", date: "2025-09-04", trend: "stable", coordinates: { lat: 20.9, lng: 70.0 } },
  { species: "Manta Ray", count: 8, location: "Maldives", date: "2025-09-05", trend: "increasing", coordinates: { lat: 3.2, lng: 73.2 } },
  { species: "Barracuda", count: 95, location: "Kerala Coast", date: "2025-09-06", trend: "stable", coordinates: { lat: 8.9, lng: 76.6 } },
  { species: "Tuna", count: 67, location: "Tamil Nadu Coast", date: "2025-09-07", trend: "increasing", coordinates: { lat: 11.1, lng: 79.8 } },
  { species: "Dolphin", count: 23, location: "Odisha Coast", date: "2025-09-08", trend: "stable", coordinates: { lat: 19.3, lng: 85.8 } },
];

export const ednaProcessingData = [
  { sampleId: "EDN-001", quality: 98, location: "Goa Coast", date: "2025-09-01", sequences: 45000, species: 23, depth: 10, temperature: 28.5, salinity: 35.2 },
  { sampleId: "EDN-002", quality: 92, location: "Chennai Coast", date: "2025-09-02", sequences: 38000, species: 19, depth: 25, temperature: 27.8, salinity: 35.4 },
  { sampleId: "EDN-003", quality: 87, location: "Mumbai Coast", date: "2025-09-03", sequences: 42000, species: 21, depth: 15, temperature: 28.1, salinity: 35.1 },
  { sampleId: "EDN-004", quality: 95, location: "Kochi Coast", date: "2025-09-04", sequences: 51000, species: 27, depth: 30, temperature: 26.9, salinity: 35.6 },
  { sampleId: "EDN-005", quality: 89, location: "Vizag Coast", date: "2025-09-05", sequences: 36000, species: 18, depth: 20, temperature: 28.3, salinity: 35.3 },
  { sampleId: "EDN-006", quality: 93, location: "Mangalore Coast", date: "2025-09-06", sequences: 47000, species: 25, depth: 12, temperature: 28.7, salinity: 35.0 },
  { sampleId: "EDN-007", quality: 90, location: "Puducherry Coast", date: "2025-09-07", sequences: 41000, species: 22, depth: 18, temperature: 28.0, salinity: 35.5 },
  { sampleId: "EDN-008", quality: 96, location: "Karwar Coast", date: "2025-09-08", sequences: 53000, species: 29, depth: 35, temperature: 26.5, salinity: 35.8 },
];

export const otolithAnalysisData = [
  { fishId: "FISH-001", age: 2, growthRate: 1.2, location: "Arabian Sea", date: "2025-09-01", species: "Mackerel", length: 25.4, weight: 120, annualRings: 2 },
  { fishId: "FISH-002", age: 3, growthRate: 1.1, location: "Bay of Bengal", date: "2025-09-02", species: "Sardine", length: 18.2, weight: 85, annualRings: 3 },
  { fishId: "FISH-003", age: 1, growthRate: 1.4, location: "Indian Ocean", date: "2025-09-03", species: "Tuna", length: 45.8, weight: 1850, annualRings: 1 },
  { fishId: "FISH-004", age: 4, growthRate: 0.9, location: "Lakshadweep", date: "2025-09-04", species: "Grouper", length: 32.1, weight: 450, annualRings: 4 },
  { fishId: "FISH-005", age: 2, growthRate: 1.3, location: "Andaman Sea", date: "2025-09-05", species: "Snapper", length: 28.7, weight: 320, annualRings: 2 },
  { fishId: "FISH-006", age: 5, growthRate: 0.8, location: "Gujarat Coast", date: "2025-09-06", species: "Pomfret", length: 35.2, weight: 680, annualRings: 5 },
  { fishId: "FISH-007", age: 3, growthRate: 1.0, location: "Kerala Coast", date: "2025-09-07", species: "Kingfish", length: 42.3, weight: 890, annualRings: 3 },
  { fishId: "FISH-008", age: 1, growthRate: 1.5, location: "Tamil Nadu Coast", date: "2025-09-08", species: "Barracuda", length: 38.9, weight: 750, annualRings: 1 },
];

export const oceanographicData = [
  { parameter: "Temperature", value: 28.5, unit: "°C", location: "Goa Coast", date: "2025-09-01", depth: 10 },
  { parameter: "Salinity", value: 35.1, unit: "PSU", location: "Chennai Coast", date: "2025-09-02", depth: 25 },
  { parameter: "Chlorophyll", value: 2.3, unit: "mg/m³", location: "Mumbai Coast", date: "2025-09-03", depth: 5 },
  { parameter: "pH", value: 8.1, unit: "", location: "Kochi Coast", date: "2025-09-04", depth: 15 },
  { parameter: "Dissolved Oxygen", value: 6.8, unit: "mg/L", location: "Vizag Coast", date: "2025-09-05", depth: 30 },
];

export const temperatureProfileData = [
  { depth: 0, temperature: 28.5, salinity: 35.2 },
  { depth: 10, temperature: 28.3, salinity: 35.3 },
  { depth: 25, temperature: 27.8, salinity: 35.4 },
  { depth: 50, temperature: 26.2, salinity: 35.6 },
  { depth: 75, temperature: 24.1, salinity: 35.8 },
  { depth: 100, temperature: 21.5, salinity: 36.0 },
  { depth: 150, temperature: 18.3, salinity: 36.2 },
  { depth: 200, temperature: 15.8, salinity: 36.1 },
];

export const chlorophyllTrendData = [
  { month: "Jan", chlorophyll: 0.8, upwelling: 2.1 },
  { month: "Feb", chlorophyll: 1.2, upwelling: 2.8 },
  { month: "Mar", chlorophyll: 1.8, upwelling: 3.5 },
  { month: "Apr", chlorophyll: 2.1, upwelling: 4.2 },
  { month: "May", chlorophyll: 2.4, upwelling: 4.8 },
  { month: "Jun", chlorophyll: 3.2, upwelling: 6.1 },
  { month: "Jul", chlorophyll: 4.1, upwelling: 7.3 },
  { month: "Aug", chlorophyll: 3.8, upwelling: 6.9 },
  { month: "Sep", chlorophyll: 2.9, upwelling: 5.4 },
  { month: "Oct", chlorophyll: 2.2, upwelling: 4.1 },
  { month: "Nov", chlorophyll: 1.5, upwelling: 3.2 },
  { month: "Dec", chlorophyll: 1.0, upwelling: 2.5 },
];

export const salinityHeatmapData = [
  [35.1, 35.2, 35.3, 35.4, 35.5],
  [35.0, 35.1, 35.2, 35.3, 35.4],
  [34.9, 35.0, 35.1, 35.2, 35.3],
  [34.8, 34.9, 35.0, 35.1, 35.2],
  [34.7, 34.8, 34.9, 35.0, 35.1],
];

export const sequenceQualityData = [
  { position: 1, quality: 38, count: 2847392 },
  { position: 50, quality: 37, count: 2834156 },
  { position: 100, quality: 35, count: 2789234 },
  { position: 150, quality: 33, count: 2723456 },
  { position: 200, quality: 30, count: 2634567 },
  { position: 250, quality: 28, count: 2456789 },
  { position: 300, quality: 25, count: 2234567 },
];

export const taxonomicCompositionData = [
  { kingdom: "Animalia", phylum: "Chordata", class: "Actinopterygii", percentage: 45.2 },
  { kingdom: "Animalia", phylum: "Arthropoda", class: "Crustacea", percentage: 23.8 },
  { kingdom: "Animalia", phylum: "Mollusca", class: "Gastropoda", percentage: 15.4 },
  { kingdom: "Animalia", phylum: "Cnidaria", class: "Anthozoa", percentage: 8.7 },
  { kingdom: "Plantae", phylum: "Rhodophyta", class: "Florideophyceae", percentage: 6.9 },
];

export const biodiversityMetricsData = [
  { depth: 0, shannon: 3.2, simpson: 0.85, chao1: 167 },
  { depth: 500, shannon: 3.4, simpson: 0.87, chao1: 172 },
  { depth: 1000, shannon: 3.6, simpson: 0.89, chao1: 178 },
  { depth: 1500, shannon: 3.5, simpson: 0.88, chao1: 175 },
  { depth: 2000, shannon: 3.3, simpson: 0.86, chao1: 169 },
];

export const morphometricsData = [
  { measurement: "Length", value: 25.4, unit: "mm", standardDeviation: 2.1 },
  { measurement: "Width", value: 18.7, unit: "mm", standardDeviation: 1.8 },
  { measurement: "Area", value: 312.5, unit: "mm²", standardDeviation: 45.2 },
  { measurement: "Perimeter", value: 89.3, unit: "mm", standardDeviation: 7.6 },
  { measurement: "Roundness", value: 0.78, unit: "", standardDeviation: 0.12 },
];

// Additional comprehensive data for enhanced functionality
export const timeSeriesData = [
  { date: "2025-01-01", temperature: 26.8, salinity: 35.1, chlorophyll: 1.2, biodiversity: 145 },
  { date: "2025-02-01", temperature: 27.2, salinity: 35.0, chlorophyll: 1.8, biodiversity: 152 },
  { date: "2025-03-01", temperature: 28.1, salinity: 34.9, chlorophyll: 2.3, biodiversity: 168 },
  { date: "2025-04-01", temperature: 28.9, salinity: 34.8, chlorophyll: 3.1, biodiversity: 178 },
  { date: "2025-05-01", temperature: 29.4, salinity: 34.7, chlorophyll: 4.2, biodiversity: 189 },
  { date: "2025-06-01", temperature: 29.8, salinity: 34.6, chlorophyll: 5.1, biodiversity: 201 },
  { date: "2025-07-01", temperature: 30.1, salinity: 34.5, chlorophyll: 5.8, biodiversity: 215 },
  { date: "2025-08-01", temperature: 29.9, salinity: 34.6, chlorophyll: 5.3, biodiversity: 208 },
  { date: "2025-09-01", temperature: 29.2, salinity: 34.8, chlorophyll: 4.1, biodiversity: 195 },
];

export const marineSpeciesData = [
  { species: "Clownfish", scientificName: "Amphiprion ocellaris", status: "Stable", habitat: "Coral reefs", depth: "1-15m", distribution: "Indo-Pacific" },
  { species: "Blue Tang", scientificName: "Paracanthurus hepatus", status: "Common", habitat: "Coral reefs", depth: "2-40m", distribution: "Indo-Pacific" },
  { species: "Grouper", scientificName: "Epinephelus malabaricus", status: "Vulnerable", habitat: "Coastal waters", depth: "10-100m", distribution: "Indian Ocean" },
  { species: "Tuna", scientificName: "Thunnus albacares", status: "Near Threatened", habitat: "Open ocean", depth: "0-250m", distribution: "Global" },
  { species: "Manta Ray", scientificName: "Mobula birostris", status: "Vulnerable", habitat: "Open ocean", depth: "0-120m", distribution: "Global" },
];

export const geneticSequenceData = [
  { sequenceId: "SEQ001", gene: "COI", length: 658, quality: 95, species: "Clownfish", similarity: 99.2 },
  { sequenceId: "SEQ002", gene: "16S", length: 546, quality: 92, species: "Grouper", similarity: 98.7 },
  { sequenceId: "SEQ003", gene: "COI", length: 658, quality: 96, species: "Tuna", similarity: 99.5 },
  { sequenceId: "SEQ004", gene: "18S", length: 1800, quality: 89, species: "Coral", similarity: 97.8 },
  { sequenceId: "SEQ005", gene: "COI", length: 658, quality: 94, species: "Manta Ray", similarity: 98.9 },
];

export const environmentalParameters = [
  { parameter: "Water Temperature", current: 28.5, min: 24.2, max: 32.1, unit: "°C", status: "Normal" },
  { parameter: "Salinity", current: 35.2, min: 32.8, max: 37.5, unit: "PSU", status: "Normal" },
  { parameter: "Dissolved Oxygen", current: 6.8, min: 4.5, max: 8.2, unit: "mg/L", status: "Good" },
  { parameter: "pH", current: 8.1, min: 7.8, max: 8.4, unit: "", status: "Optimal" },
  { parameter: "Turbidity", current: 2.1, min: 0.5, max: 15.0, unit: "NTU", status: "Clear" },
  { parameter: "Chlorophyll-a", current: 2.3, min: 0.1, max: 8.5, unit: "mg/m³", status: "Moderate" },
];

export const samplingLocations = [
  { id: "LOC001", name: "Goa Marine Sanctuary", coordinates: { lat: 15.2993, lng: 74.1240 }, depth: 15, type: "Protected Area" },
  { id: "LOC002", name: "Chennai Coastal Zone", coordinates: { lat: 13.0827, lng: 80.2707 }, depth: 25, type: "Urban Coast" },
  { id: "LOC003", name: "Lakshadweep Lagoon", coordinates: { lat: 10.5667, lng: 72.6417 }, depth: 8, type: "Lagoon" },
  { id: "LOC004", name: "Andaman Deep Sea", coordinates: { lat: 11.7401, lng: 92.6586 }, depth: 150, type: "Deep Sea" },
  { id: "LOC005", name: "Kerala Backwaters", coordinates: { lat: 9.4981, lng: 76.3388 }, depth: 3, type: "Estuary" },
];

export const researchProjects = [
  { id: "PROJ001", title: "Coral Reef Biodiversity Assessment", status: "Active", progress: 75, startDate: "2025-01-15", endDate: "2025-12-31" },
  { id: "PROJ002", title: "Fish Population Dynamics", status: "Active", progress: 60, startDate: "2025-03-01", endDate: "2026-02-28" },
  { id: "PROJ003", title: "Marine Pollution Impact Study", status: "Completed", progress: 100, startDate: "2024-06-01", endDate: "2025-05-31" },
  { id: "PROJ004", title: "Climate Change Effects on Marine Life", status: "Planning", progress: 15, startDate: "2025-10-01", endDate: "2027-09-30" },
];

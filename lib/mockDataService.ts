// Mock data service that simulates real MongoDB data
// This will be replaced with real database calls once MongoDB is properly connected

import { DashboardStats } from './dataService'

// Extended mock data based on NCBI and marine research data
export const mockSpeciesData = [
  {
    scientificName: 'Thunnus albacares',
    commonName: 'Yellowfin Tuna',
    count: 15,
    marineZone: 'pelagic',
    conservationStatus: 'NT'
  },
  {
    scientificName: 'Sardinella longiceps',
    commonName: 'Indian Oil Sardine',
    count: 342,
    marineZone: 'pelagic',
    conservationStatus: 'LC'
  },
  {
    scientificName: 'Penaeus monodon',
    commonName: 'Giant Tiger Prawn',
    count: 128,
    marineZone: 'benthic',
    conservationStatus: 'LC'
  },
  {
    scientificName: 'Lates calcarifer',
    commonName: 'Asian Sea Bass',
    count: 67,
    marineZone: 'pelagic',
    conservationStatus: 'LC'
  },
  {
    scientificName: 'Epinephelus marginatus',
    commonName: 'Dusky Grouper',
    count: 23,
    marineZone: 'benthic',
    conservationStatus: 'EN'
  },
  {
    scientificName: 'Pristis pectinata',
    commonName: 'Smalltooth Sawfish',
    count: 8,
    marineZone: 'benthic',
    conservationStatus: 'CR'
  }
]

export const mockOceanographicData = Array.from({ length: 30 }, (_, i) => ({
  id: `ocean_${i + 1}`,
  stationId: `AS_${String(i + 1).padStart(3, '0')}`,
  location: {
    coordinates: [68.5 + Math.random() * 10, 15.0 + Math.random() * 8],
    name: `Arabian Sea Station ${i + 1}`,
    region: i % 3 === 0 ? 'Western Arabian Sea' : i % 3 === 1 ? 'Central Arabian Sea' : 'Eastern Arabian Sea'
  },
  date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
  temperature: 26.5 + Math.random() * 4,
  salinity: 34.8 + Math.random() * 1.2,
  chlorophyll: 0.8 + Math.random() * 3.2,
  depth: Math.floor(Math.random() * 200) + 5,
  pH: 7.9 + Math.random() * 0.3,
  dissolvedOxygen: 5.5 + Math.random() * 1.5
}))

export const mockEdnaData = [
  {
    sampleId: 'eDNA_001',
    location: 'Mangalore Coast',
    waterBody: 'Arabian Sea',
    collectionDate: '2024-08-15',
    diversityMetrics: {
      richness: 45,
      shannon: 3.2,
      simpson: 0.85,
      evenness: 0.72
    },
    sequencingResults: {
      totalReads: 150000,
      qualityFilteredReads: 142500,
      taxonomicAssignments: [
        { taxon: 'Sardinella longiceps', readCount: 15420, relativeAbundance: 10.8, confidence: 95 },
        { taxon: 'Thunnus albacares', readCount: 8765, relativeAbundance: 6.2, confidence: 92 },
        { taxon: 'Penaeus monodon', readCount: 5432, relativeAbundance: 3.8, confidence: 88 },
        { taxon: 'Lates calcarifer', readCount: 3210, relativeAbundance: 2.3, confidence: 85 }
      ]
    },
    qualityScore: 95
  },
  {
    sampleId: 'eDNA_002',
    location: 'Kochi Backwaters',
    waterBody: 'Arabian Sea',
    collectionDate: '2024-08-20',
    diversityMetrics: {
      richness: 38,
      shannon: 2.9,
      simpson: 0.78,
      evenness: 0.68
    },
    sequencingResults: {
      totalReads: 135000,
      qualityFilteredReads: 128250,
      taxonomicAssignments: [
        { taxon: 'Mugil cephalus', readCount: 12850, relativeAbundance: 10.0, confidence: 93 },
        { taxon: 'Chanos chanos', readCount: 9630, relativeAbundance: 7.5, confidence: 89 },
        { taxon: 'Etroplus suratensis', readCount: 6420, relativeAbundance: 5.0, confidence: 86 }
      ]
    },
    qualityScore: 92
  }
]

export const mockOtolithData = [
  {
    specimenId: 'OTO_001',
    species: 'Sardinella longiceps',
    otolithType: 'sagitta',
    measurements: {
      length: 8.5,
      width: 4.2,
      weight: 0.012,
      area: 28.5,
      perimeter: 22.1
    },
    ageEstimate: 2,
    growthRings: 2,
    captureInfo: {
      location: 'Mangalore Fishing Port',
      date: '2024-07-10',
      depth: 25,
      fishLength: 18.5,
      fishWeight: 125
    },
    analysisDate: '2024-07-15'
  },
  {
    specimenId: 'OTO_002',
    species: 'Thunnus albacares',
    otolithType: 'sagitta',
    measurements: {
      length: 15.2,
      width: 8.7,
      weight: 0.085,
      area: 98.3,
      perimeter: 45.6
    },
    ageEstimate: 4,
    growthRings: 4,
    captureInfo: {
      location: 'Deep Sea Arabian Sea',
      date: '2024-07-08',
      depth: 180,
      fishLength: 85.3,
      fishWeight: 15500
    },
    analysisDate: '2024-07-12'
  }
]

export const mockGeneticSequences = [
  {
    accessionNumber: 'MN123456',
    organism: 'Thunnus albacares',
    gene: 'cytochrome oxidase subunit I',
    sequenceType: 'DNA',
    sequenceLength: 1551,
    description: 'Thunnus albacares cytochrome oxidase subunit I (COI) gene, partial cds; mitochondrial',
    submissionDate: '2024-01-15',
    qualityScore: 95
  },
  {
    accessionNumber: 'MN789012',
    organism: 'Sardinella longiceps',
    gene: '18S ribosomal RNA',
    sequenceType: 'DNA',
    sequenceLength: 1798,
    description: 'Sardinella longiceps 18S ribosomal RNA gene, complete sequence',
    submissionDate: '2024-02-20',
    qualityScore: 92
  },
  {
    accessionNumber: 'MN345678',
    organism: 'Penaeus monodon',
    gene: '16S ribosomal RNA',
    sequenceType: 'DNA',
    sequenceLength: 561,
    description: 'Penaeus monodon 16S ribosomal RNA gene, partial sequence; mitochondrial',
    submissionDate: '2024-03-10',
    qualityScore: 89
  }
]

export async function getMockDashboardStats(): Promise<DashboardStats> {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return {
    totalSpecies: mockSpeciesData.reduce((sum, species) => sum + species.count, 0),
    totalOceanographicRecords: mockOceanographicData.length,
    totalEdnaAnalyses: mockEdnaData.length,
    totalOtolithAnalyses: mockOtolithData.length,
    recentSpeciesCount: 45,
    avgTemperature: mockOceanographicData.reduce((sum, d) => sum + d.temperature, 0) / mockOceanographicData.length,
    avgSalinity: mockOceanographicData.reduce((sum, d) => sum + d.salinity, 0) / mockOceanographicData.length,
    avgChlorophyll: mockOceanographicData.reduce((sum, d) => sum + d.chlorophyll, 0) / mockOceanographicData.length,
    biodiversityTrend: [
      { month: 'Jan', count: 125 },
      { month: 'Feb', count: 142 },
      { month: 'Mar', count: 158 },
      { month: 'Apr', count: 173 },
      { month: 'May', count: 198 },
      { month: 'Jun', count: 221 },
      { month: 'Jul', count: 245 },
      { month: 'Aug', count: 268 },
      { month: 'Sep', count: 289 },
      { month: 'Oct', count: 312 },
      { month: 'Nov', count: 335 },
      { month: 'Dec', count: 358 }
    ],
    oceanographicTrend: mockOceanographicData.slice(0, 15).map(d => ({
      date: d.date,
      temperature: d.temperature,
      salinity: d.salinity,
      chlorophyll: d.chlorophyll
    })),
    speciesDistribution: mockSpeciesData.map(species => ({
      species: species.scientificName,
      count: species.count,
      marineZone: species.marineZone
    })),
    ednaQualityMetrics: {
      averageQuality: mockEdnaData.reduce((sum, d) => sum + d.qualityScore, 0) / mockEdnaData.length,
      totalSamples: mockEdnaData.length,
      avgRichness: mockEdnaData.reduce((sum, d) => sum + d.diversityMetrics.richness, 0) / mockEdnaData.length,
      avgShannon: mockEdnaData.reduce((sum, d) => sum + d.diversityMetrics.shannon, 0) / mockEdnaData.length
    }
  }
}

export { mockSpeciesData as biodiversityData }
export { mockOceanographicData as oceanographicData }
export { mockEdnaData as ednaProcessingData }
export { mockOtolithData as otolithAnalysisData }
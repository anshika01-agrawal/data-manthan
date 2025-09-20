// Enhanced marine genetics and biology data for comprehensive analysis

export interface GeneticSequence {
  sequenceId: string
  dnaSequence: string
  quality: number
  length: number
  species?: string
  confidence: number
  barcode: string
  taxonomy: {
    kingdom: string
    phylum: string
    class: string
    order: string
    family: string
    genus: string
    species: string
  }
  metadata: {
    sampleLocation: string
    depth: number
    temperature: number
    dateCollected: string
    sequencingMethod: string
    primers: string[]
  }
}

export interface BiodiversityIndex {
  shannonDiversity: number
  simpsonDiversity: number
  chao1Richness: number
  pielousEvenness: number
  margalefRichness: number
  bergerParkerDominance: number
}

export interface SpeciesAbundance {
  species: string
  scientificName: string
  commonName: string
  abundance: number
  frequency: number
  biomass: number
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX'
  endemicStatus: boolean
  functionalGroup: string
  trophicLevel: number
}

// Enhanced genetic sequences for marine biodiversity
export const enhancedGeneticSequences: GeneticSequence[] = [
  {
    sequenceId: "SEQ-001-COI",
    dnaSequence: "ATGGCACACCTAACACTAACCGTAAACGAAGGAATCGGTGCAATAATGTCTGGAATGGATGTAGACGACGGTGTTTACACTAAAGGTCGTGGTAATCTCGGTGGATTCGGAACTGAAATGGATAATGGTGATACAGGTCGTGGAATGGGAGGAATGAAT",
    quality: 98.5,
    length: 658,
    species: "Gadus morhua",
    confidence: 97.2,
    barcode: "COI-5P",
    taxonomy: {
      kingdom: "Animalia",
      phylum: "Chordata", 
      class: "Actinopterygii",
      order: "Gadiformes",
      family: "Gadidae",
      genus: "Gadus",
      species: "Gadus morhua"
    },
    metadata: {
      sampleLocation: "North Sea, Norway",
      depth: 45,
      temperature: 8.2,
      dateCollected: "2025-08-15",
      sequencingMethod: "Illumina MiSeq",
      primers: ["COI-5P-F", "COI-5P-R"]
    }
  },
  {
    sequenceId: "SEQ-002-16S",
    dnaSequence: "CGGTTGGATCACCTCCTAAATCGAACGAGACTCTTGGCACTGTAACCAAGAACATGAAGTAACGAACGAACGATCAAGACCCTATGGAGCTTAGAATAAACGATGATAACCTAGTAACTATCGCCTACATCTCTAACAACGATAGAGACGAAACACC",
    quality: 94.3,
    length: 1500,
    species: "Thunnus albacares",
    confidence: 89.7,
    barcode: "16S-rRNA",
    taxonomy: {
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii", 
      order: "Perciformes",
      family: "Scombridae",
      genus: "Thunnus",
      species: "Thunnus albacares"
    },
    metadata: {
      sampleLocation: "Indian Ocean, Maldives",
      depth: 85,
      temperature: 26.8,
      dateCollected: "2025-09-02",
      sequencingMethod: "Oxford Nanopore",
      primers: ["16S-F", "16S-R"]
    }
  },
  {
    sequenceId: "SEQ-003-COI",
    dnaSequence: "ATGTCTGGTAATGGATGTGGACGACGGTGTTTACACTAAAGGTCGTGGTAATCTCGGTGGATTCGGAACTGAAATGGATAATGGTGATACAGGTCGTGGAATGGGAGGAATGAATCGTGGAATGATCCTACTGACTTCCACGGTATTACCCAC",
    quality: 91.8,
    length: 650,
    species: "Lutjanus campechanus",
    confidence: 92.4,
    barcode: "COI-5P",
    taxonomy: {
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Actinopterygii",
      order: "Perciformes", 
      family: "Lutjanidae",
      genus: "Lutjanus",
      species: "Lutjanus campechanus"
    },
    metadata: {
      sampleLocation: "Gulf of Mexico",
      depth: 60,
      temperature: 24.5,
      dateCollected: "2025-08-28",
      sequencingMethod: "Illumina HiSeq",
      primers: ["COI-5P-F", "COI-5P-R"]
    }
  }
]

// Enhanced biodiversity analysis
export const calculateBiodiversityIndices = (abundances: number[]): BiodiversityIndex => {
  const total = abundances.reduce((sum, count) => sum + count, 0)
  const proportions = abundances.map(count => count / total)
  
  // Shannon Diversity Index
  const shannonDiversity = -proportions.reduce((sum, p) => 
    p > 0 ? sum + p * Math.log(p) : sum, 0
  )
  
  // Simpson Diversity Index
  const simpsonDiversity = 1 - proportions.reduce((sum, p) => sum + p * p, 0)
  
  // Pielou's Evenness
  const richness = abundances.filter(count => count > 0).length
  const pielousEvenness = richness > 1 ? shannonDiversity / Math.log(richness) : 0
  
  // Margalef's Richness Index
  const margalefRichness = total > 1 ? (richness - 1) / Math.log(total) : 0
  
  // Berger-Parker Dominance Index
  const bergerParkerDominance = Math.max(...abundances) / total
  
  // Chao1 Richness Estimator (simplified)
  const singletons = abundances.filter(count => count === 1).length
  const doubletons = abundances.filter(count => count === 2).length
  const chao1Richness = richness + (singletons * singletons) / (2 * (doubletons + 1))
  
  return {
    shannonDiversity: +shannonDiversity.toFixed(3),
    simpsonDiversity: +simpsonDiversity.toFixed(3),
    chao1Richness: +chao1Richness.toFixed(1),
    pielousEvenness: +pielousEvenness.toFixed(3),
    margalefRichness: +margalefRichness.toFixed(3),
    bergerParkerDominance: +bergerParkerDominance.toFixed(3)
  }
}

// Marine species abundance data
export const marineSpeciesAbundance: SpeciesAbundance[] = [
  {
    species: "GAMO",
    scientificName: "Gadus morhua",
    commonName: "Atlantic Cod",
    abundance: 1250,
    frequency: 0.85,
    biomass: 3500.5,
    conservationStatus: "VU",
    endemicStatus: false,
    functionalGroup: "Predatory Fish",
    trophicLevel: 4.2
  },
  {
    species: "THAL",
    scientificName: "Thunnus albacares", 
    commonName: "Yellowfin Tuna",
    abundance: 890,
    frequency: 0.72,
    biomass: 15670.8,
    conservationStatus: "NT",
    endemicStatus: false,
    functionalGroup: "Pelagic Predator",
    trophicLevel: 4.5
  },
  {
    species: "LUCA",
    scientificName: "Lutjanus campechanus",
    commonName: "Red Snapper",
    abundance: 2340,
    frequency: 0.91,
    biomass: 4890.2,
    conservationStatus: "VU",
    endemicStatus: false,
    functionalGroup: "Reef Fish",
    trophicLevel: 3.8
  },
  {
    species: "PARA",
    scientificName: "Parachaeturichthys polynema",
    commonName: "Ponyfish",
    abundance: 4560,
    frequency: 0.67,
    biomass: 1230.4,
    conservationStatus: "LC",
    endemicStatus: true,
    functionalGroup: "Small Pelagic",
    trophicLevel: 2.8
  },
  {
    species: "CLHA",
    scientificName: "Clupea harengus",
    commonName: "Atlantic Herring", 
    abundance: 8900,
    frequency: 0.94,
    biomass: 2680.7,
    conservationStatus: "LC",
    endemicStatus: false,
    functionalGroup: "Planktivorous Fish",
    trophicLevel: 3.1
  }
]

// Real-time genetic analysis simulation
export const simulateGeneticAnalysis = () => {
  const sequences = Math.floor(Math.random() * 1000) + 500
  const species = Math.floor(Math.random() * 50) + 25
  const novelSequences = Math.floor(Math.random() * 5)
  
  return {
    totalSequences: sequences,
    uniqueSpecies: species,
    novelSequences,
    averageQuality: +(85 + Math.random() * 12).toFixed(1),
    completionRate: +(Math.random() * 20 + 80).toFixed(1),
    taxonomicGroups: {
      fish: Math.floor(species * 0.6),
      crustaceans: Math.floor(species * 0.2),
      mollusks: Math.floor(species * 0.15),
      others: Math.floor(species * 0.05)
    },
    biodiversityIndex: calculateBiodiversityIndices(
      Array.from({length: species}, () => Math.floor(Math.random() * 200) + 10)
    ),
    processingTime: +(Math.random() * 45 + 15).toFixed(1), // minutes
    lastUpdate: new Date().toISOString()
  }
}

// Environmental DNA sample processing pipeline
export const ednaPipelineStages = [
  {
    stage: 1,
    name: "Sample Collection",
    description: "Water sample collection from marine environment",
    duration: "30 min",
    status: "completed",
    parameters: ["volume", "depth", "location", "temperature"]
  },
  {
    stage: 2, 
    name: "DNA Extraction",
    description: "Extraction of environmental DNA from filtered samples",
    duration: "2-3 hours",
    status: "in-progress",
    parameters: ["extraction_method", "yield", "purity", "concentration"]
  },
  {
    stage: 3,
    name: "PCR Amplification", 
    description: "Amplification of target gene regions (COI, 16S, 18S)",
    duration: "4-6 hours",
    status: "pending",
    parameters: ["primer_efficiency", "amplicon_size", "cycle_count"]
  },
  {
    stage: 4,
    name: "Library Preparation",
    description: "Preparation of sequencing libraries with barcodes",
    duration: "1-2 hours", 
    status: "pending",
    parameters: ["library_concentration", "fragment_size", "barcode_assignment"]
  },
  {
    stage: 5,
    name: "Sequencing",
    description: "High-throughput DNA sequencing",
    duration: "12-24 hours",
    status: "pending", 
    parameters: ["read_count", "read_length", "quality_scores"]
  },
  {
    stage: 6,
    name: "Bioinformatics Analysis",
    description: "Quality control, taxonomic assignment, and diversity analysis",
    duration: "2-4 hours",
    status: "pending",
    parameters: ["sequence_quality", "taxonomic_assignment", "diversity_metrics"]
  }
]

// Generate random DNA sequence
export const generateRandomDNASequence = (length: number): string => {
  const bases = ['A', 'T', 'G', 'C']
  return Array.from({length}, () => bases[Math.floor(Math.random() * 4)]).join('')
}

// Simulate sequencing quality scores (Phred scores)
export const generateQualityScores = (length: number): number[] => {
  return Array.from({length}, (_, i) => {
    // Quality typically decreases towards the end of reads
    const baseQuality = 35 - (i / length) * 10
    return Math.max(10, Math.floor(baseQuality + (Math.random() - 0.5) * 8))
  })
}

// Fish population dynamics model
export const fishPopulationModel = {
  calculateGrowthRate: (length: number, age: number, species: string) => {
    const speciesGrowthParams: {[key: string]: {k: number, Linf: number, t0: number}} = {
      'Gadus morhua': {k: 0.2, Linf: 120, t0: -0.5},
      'Thunnus albacares': {k: 0.25, Linf: 180, t0: -0.8},
      'Lutjanus campechanus': {k: 0.15, Linf: 90, t0: -1.2}
    }
    
    const params = speciesGrowthParams[species] || {k: 0.2, Linf: 100, t0: -0.5}
    
    // Von Bertalanffy growth model
    const predictedLength = params.Linf * (1 - Math.exp(-params.k * (age - params.t0)))
    const growthRate = (length / predictedLength) * 100
    
    return {
      predictedLength: +predictedLength.toFixed(1),
      actualLength: length,
      growthRate: +growthRate.toFixed(1),
      growthStatus: growthRate > 90 ? 'optimal' : growthRate > 70 ? 'normal' : 'poor'
    }
  },
  
  estimatePopulationHealth: (fishData: any[]) => {
    const avgAge = fishData.reduce((sum, fish) => sum + fish.age, 0) / fishData.length
    const ageDistribution = {
      juvenile: fishData.filter(f => f.age <= 2).length / fishData.length,
      adult: fishData.filter(f => f.age > 2 && f.age <= 5).length / fishData.length,
      mature: fishData.filter(f => f.age > 5).length / fishData.length
    }
    
    let healthScore = 100
    
    // Ideal age distribution: 40% juvenile, 50% adult, 10% mature
    healthScore -= Math.abs(ageDistribution.juvenile - 0.4) * 100
    healthScore -= Math.abs(ageDistribution.adult - 0.5) * 100
    healthScore -= Math.abs(ageDistribution.mature - 0.1) * 200
    
    return {
      overallHealth: Math.max(0, Math.min(100, healthScore)),
      averageAge: +avgAge.toFixed(1),
      ageDistribution,
      recommendations: generateHealthRecommendations(healthScore, ageDistribution)
    }
  }
}

const generateHealthRecommendations = (score: number, distribution: any): string[] => {
  const recommendations: string[] = []
  
  if (score < 70) recommendations.push("Population health requires immediate attention")
  if (distribution.juvenile < 0.3) recommendations.push("Increase juvenile recruitment efforts")
  if (distribution.mature < 0.05) recommendations.push("Protect mature breeding stock")
  if (distribution.adult > 0.7) recommendations.push("Monitor fishing pressure on adult population")
  
  return recommendations
}
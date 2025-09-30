import connectDB from '@/lib/mongodb'
import { 
  Species, 
  GeneticSequence, 
  OceanographicData, 
  EdnaAnalysis, 
  OtolithAnalysis, 
  ResearchProject 
} from '@/lib/models'

// Sample marine species data based on Arabian Sea and Indian Ocean
const sampleSpecies = [
  {
    scientificName: 'Thunnus albacares',
    commonName: 'Yellowfin Tuna',
    taxonomyId: 'txid8238',
    kingdom: 'Animalia',
    phylum: 'Chordata',
    class: 'Actinopterygii',
    order: 'Perciformes',
    family: 'Scombridae',
    genus: 'Thunnus',
    species: 'albacares',
    habitat: ['pelagic', 'open ocean'],
    geographicDistribution: [
      { coordinates: [68.5, 18.2], locationName: 'Arabian Sea', depth: 250 },
      { coordinates: [73.1, 15.8], locationName: 'Western Indian Ocean', depth: 180 }
    ],
    conservationStatus: 'NT',
    marineZone: 'pelagic',
    characteristics: {
      length: 200,
      weight: 200000,
      lifespan: 7,
      diet: ['fish', 'squid', 'crustaceans']
    },
    dataSource: 'CMLRE Survey 2024'
  },
  {
    scientificName: 'Sardinella longiceps',
    commonName: 'Indian Oil Sardine',
    taxonomyId: 'txid42529',
    kingdom: 'Animalia',
    phylum: 'Chordata',
    class: 'Actinopterygii',
    order: 'Clupeiformes',
    family: 'Clupeidae',
    genus: 'Sardinella',
    species: 'longiceps',
    habitat: ['coastal', 'pelagic'],
    geographicDistribution: [
      { coordinates: [75.3, 13.1], locationName: 'Karnataka Coast', depth: 50 },
      { coordinates: [76.2, 9.9], locationName: 'Kerala Coast', depth: 30 }
    ],
    conservationStatus: 'LC',
    marineZone: 'pelagic',
    characteristics: {
      length: 23,
      weight: 150,
      lifespan: 2,
      diet: ['phytoplankton', 'zooplankton']
    },
    dataSource: 'CMLRE Survey 2024'
  },
  {
    scientificName: 'Penaeus monodon',
    commonName: 'Giant Tiger Prawn',
    taxonomyId: 'txid6687',
    kingdom: 'Animalia',
    phylum: 'Arthropoda',
    class: 'Malacostraca',
    order: 'Decapoda',
    family: 'Penaeidae',
    genus: 'Penaeus',
    species: 'monodon',
    habitat: ['benthic', 'estuarine'],
    geographicDistribution: [
      { coordinates: [77.0, 8.5], locationName: 'Tamil Nadu Coast', depth: 20 },
      { coordinates: [82.3, 18.1], locationName: 'Andhra Pradesh Coast', depth: 15 }
    ],
    conservationStatus: 'LC',
    marineZone: 'benthic',
    characteristics: {
      length: 33,
      weight: 200,
      lifespan: 3,
      diet: ['detritus', 'small invertebrates', 'algae']
    },
    dataSource: 'CMLRE Survey 2024'
  }
]

// Sample genetic sequences based on NCBI BLAST database
const sampleGeneticSequences = [
  {
    accessionNumber: 'MN123456',
    sequenceId: 'gi|123456789',
    organism: 'Thunnus albacares',
    gene: 'cytochrome oxidase subunit I',
    sequence: 'ATGTTCGCCGACCTTGACCCCCCCCCAATAAATAACATAAGCTTCTGACTACTCCCCCCCTCACTAATCCTACTAATATCAAGAAGAATTGTGGAAACTGGGTGAACCGTATATCCCCCCTTAGCAGGAAATCTAGCACATGCAGGAGCATCAGTAGACTTAGCTATTTTCTCTTTACATCTAGCAGGTATTTCATCTATTTTAGGGGCTATTAATTTTATTACTACAATTATTAATATAAAACCCCCTGCAATATCACAATATCAAACCCCCTTATTTGTTTGATCTGTATTAATTACTGCCGTATTATTACTCTTATCTTTACCAGTACTAGCAGGCGCTATTACTATATTATTAACAGATCGAAATTTAAATACAACCTTTTTTGATCCAACAGGAGGAGGAGATCCAATTCTATACCAACATCTATTCTGATTCTTTGGACACCCTGAAGTCTACATTCTTATCTTACCAGGATTCGGAATAATCTCCCATATTGTCACTTACTATTCTGGAAAAAAAGAACCCTTTGGGTATATGGGTATGGTCTGAGCTATAATAAGCATTGGCTTACTAGGCTTTATTGTCTGAGCCCACCACATATTTACAGTAGGAATAGACGTAGACACCCGAGCCTATTTTACATCTGCCACAATAATTATTGCTATTCCAACTGGAGTAAAAGTATTTAGCTGATTAGCCACACTCCATGGAGGAAACATTAAATGATCCCCCGCTATAATATGAGCCCTAGGCTTTATCTTCCTATTCACCGTGGGAGGCTTGACCGGAATTGTACTCGCCAACTCATCTCTAGATATTGTACTACATGATACATACTACGTAGTAGCCCACTTCCACTACGTACTTTCAATAGGCGCCGTATTTGCTATTATAGGGGGATTTGTACACTGATTTCCCCTATTTACAGGGTACACCCTAAATGACACCTGAGCCAAAATTCACTTCTCTATCATATTCGTAGGAGTAAACATAACTTTCTTTCCACAACATTTTCTCGGCCTATCCGGAATGCCCCGACGTTACTCGGACTACCCCGATGCATACACAACATGAAACACCATCTCATCCATAGGCTCCTTCATTTCTCTAACAGCAGTTATATTAATAATTTATATGATCTGAGAAGCCTTCGCTTCAAAACGAGAAGTACTAACAGTAGAACTAACAACAACAAACCTAGAGTGACTAAATGGATGCCCCCCTCCCTACCACACATTCGAAGAACCAACCTACGTAAACCTAAAATAA',
    sequenceLength: 1551,
    sequenceType: 'DNA',
    description: 'Thunnus albacares cytochrome oxidase subunit I (COI) gene, partial cds; mitochondrial',
    taxonomy: {
      kingdom: 'Eukaryota',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Perciformes',
      family: 'Scombridae',
      genus: 'Thunnus',
      species: 'Thunnus albacares'
    },
    publications: ['PMC123456', 'PMC789012'],
    submissionDate: new Date('2024-01-15'),
    qualityScore: 95,
    annotations: {
      features: [
        {
          type: 'CDS',
          location: '1..1551',
          qualifiers: {
            gene: 'COI',
            product: 'cytochrome oxidase subunit I',
            translation: 'MFARDLDPPPINQITKLWLLLPPLTILLIMQEIVETNGTPYPPLAGNIAHPGASWDLAIFLVHLAGVF'
          }
        }
      ]
    }
  },
  {
    accessionNumber: 'MN789012',
    sequenceId: 'gi|789012345',
    organism: 'Sardinella longiceps',
    gene: '18S ribosomal RNA',
    sequence: 'ACCTGGTTGATCCTGCCAGTAGTCATATGCTTGTCTCAAAGATTAAGCCATGCATGTCTAAGTACGCACGGCCGGTACAGTGAAACTGCGAATGGCTCATTAAATCAGTTATGGTTCCTTTGGTCGCTCGCTCCTCTCCTACTTGGATAACTGTGGTAATTCTAGAGCTAATACATGCCGACGGGCGCTGACCCCCTTCGCGGGGGGGATGCGTGCATTTATCAGATCAAAACCAACCCGGTCAGCCCCTCTCCGGCCCCGGCCGGGGCGCGCCCATTGCGGTCGCCCCCTTGGCCCCGGCCGGGGGGCGCCCCATTGGCCTCCCGGCCGGCCCCGGCCGGGGCGCCCCATTGGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCTCGCGGCCCCGGCCGGGGCGCCCCATTCGCCT',
    sequenceLength: 1798,
    sequenceType: 'DNA',
    description: 'Sardinella longiceps 18S ribosomal RNA gene, complete sequence',
    taxonomy: {
      kingdom: 'Eukaryota',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Clupeiformes',
      family: 'Clupeidae',
      genus: 'Sardinella',
      species: 'Sardinella longiceps'
    },
    publications: ['PMC345678'],
    submissionDate: new Date('2024-02-20'),
    qualityScore: 92
  }
]

// Sample oceanographic data from Arabian Sea monitoring stations
const sampleOceanographicData = [
  {
    stationId: 'AS_001',
    location: {
      coordinates: [68.5, 18.2],
      name: 'Arabian Sea Station 1',
      region: 'Western Arabian Sea'
    },
    measurementDate: new Date('2024-09-01T08:00:00Z'),
    depth: 10,
    temperature: 28.5,
    salinity: 35.2,
    pH: 8.1,
    dissolvedOxygen: 6.2,
    chlorophyll: 2.1,
    turbidity: 0.8,
    nutrients: {
      nitrate: 0.5,
      phosphate: 0.12,
      silicate: 2.3
    },
    currentSpeed: 0.25,
    currentDirection: 245,
    waveHeight: 1.2,
    dataQuality: 'excellent',
    instrument: 'CTD-Rosette',
    dataSource: 'CMLRE Monitoring'
  },
  {
    stationId: 'AS_002',
    location: {
      coordinates: [72.8, 15.5],
      name: 'Arabian Sea Station 2',
      region: 'Central Arabian Sea'
    },
    measurementDate: new Date('2024-09-01T10:30:00Z'),
    depth: 50,
    temperature: 26.8,
    salinity: 35.6,
    pH: 8.0,
    dissolvedOxygen: 5.8,
    chlorophyll: 1.8,
    turbidity: 1.1,
    nutrients: {
      nitrate: 0.8,
      phosphate: 0.15,
      silicate: 3.1
    },
    currentSpeed: 0.32,
    currentDirection: 220,
    waveHeight: 1.5,
    dataQuality: 'good',
    instrument: 'CTD-Rosette',
    dataSource: 'CMLRE Monitoring'
  }
]

// Sample eDNA analysis data
const sampleEdnaAnalyses = [
  {
    sampleId: 'eDNA_001',
    location: {
      coordinates: [75.1, 13.0],
      siteName: 'Mangalore Coast',
      waterBody: 'Arabian Sea'
    },
    collectionDate: new Date('2024-08-15'),
    depth: 20,
    sampleVolume: 2000,
    filtrationMethod: '0.22μm membrane filter',
    extractionMethod: 'DNeasy PowerWater Kit',
    sequencingPlatform: 'Illumina MiSeq',
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
    diversityMetrics: {
      richness: 45,
      shannon: 3.2,
      simpson: 0.85,
      evenness: 0.72
    },
    environmentalFactors: {
      temperature: 27.5,
      salinity: 35.1,
      pH: 8.0
    },
    qualityControl: {
      contamination: false,
      inhibition: false,
      negativeControl: true,
      positiveControl: true
    },
    analysisDate: new Date('2024-08-20'),
    analyst: 'Dr. Priya Sharma'
  }
]

// Sample otolith analysis data
const sampleOtolithAnalyses = [
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
    morphometrics: {
      roundness: 0.75,
      rectangularity: 0.68,
      ellipticity: 0.82,
      formFactor: 0.71
    },
    ageEstimate: 2,
    growthRings: 2,
    captureInfo: {
      location: {
        coordinates: [75.2, 12.9],
        siteName: 'Mangalore Fishing Port'
      },
      date: new Date('2024-07-10'),
      depth: 25,
      fishLength: 18.5,
      fishWeight: 125
    },
    imageAnalysis: {
      imagePath: '/images/otoliths/OTO_001.jpg',
      magnification: 40,
      resolution: 2048,
      imageQuality: 'excellent'
    },
    analyst: 'Dr. Rajesh Kumar',
    analysisDate: new Date('2024-07-15'),
    notes: 'Clear growth rings visible, excellent condition'
  }
]

export async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...')
    await connectDB()
    
    console.log('Seeding Species data...')
    await Species.deleteMany({})
    await Species.insertMany(sampleSpecies)
    console.log(`✓ Inserted ${sampleSpecies.length} species records`)
    
    console.log('Seeding Genetic Sequence data...')
    await GeneticSequence.deleteMany({})
    await GeneticSequence.insertMany(sampleGeneticSequences)
    console.log(`✓ Inserted ${sampleGeneticSequences.length} genetic sequence records`)
    
    console.log('Seeding Oceanographic data...')
    await OceanographicData.deleteMany({})
    
    // Generate more oceanographic data points
    const extendedOceanData = []
    for (let i = 0; i < 30; i++) {
      const baseData = sampleOceanographicData[i % 2]
      extendedOceanData.push({
        ...baseData,
        stationId: `AS_${String(i + 1).padStart(3, '0')}`,
        measurementDate: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)),
        temperature: baseData.temperature + (Math.random() - 0.5) * 4,
        salinity: baseData.salinity + (Math.random() - 0.5) * 2,
        chlorophyll: baseData.chlorophyll + (Math.random() - 0.5) * 1,
        depth: Math.floor(Math.random() * 200) + 5
      })
    }
    
    await OceanographicData.insertMany(extendedOceanData)
    console.log(`✓ Inserted ${extendedOceanData.length} oceanographic data records`)
    
    console.log('Seeding eDNA Analysis data...')
    await EdnaAnalysis.deleteMany({})
    await EdnaAnalysis.insertMany(sampleEdnaAnalyses)
    console.log(`✓ Inserted ${sampleEdnaAnalyses.length} eDNA analysis records`)
    
    console.log('Seeding Otolith Analysis data...')
    await OtolithAnalysis.deleteMany({})
    await OtolithAnalysis.insertMany(sampleOtolithAnalyses)
    console.log(`✓ Inserted ${sampleOtolithAnalyses.length} otolith analysis records`)
    
    console.log('✅ Database seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seeding failed:', error)
      process.exit(1)
    })
}
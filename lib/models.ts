import mongoose, { Schema, Document } from 'mongoose'

// User Schema for Authentication
export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'admin' | 'researcher' | 'user'
  institution?: string
  researchArea?: string[]
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'researcher', 'user'], default: 'user' },
  institution: String,
  researchArea: [String],
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Species and Biodiversity Schema
export interface ISpecies extends Document {
  scientificName: string
  commonName?: string
  taxonomyId: string
  kingdom: string
  phylum: string
  class: string
  order: string
  family: string
  genus: string
  species: string
  habitat: string[]
  geographicDistribution: {
    coordinates: [number, number]
    locationName: string
    depth?: number
  }[]
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD'
  marineZone: 'pelagic' | 'benthic' | 'abyssal' | 'hadal' | 'littoral'
  characteristics: {
    length?: number
    weight?: number
    lifespan?: number
    diet: string[]
  }
  lastUpdated: Date
  dataSource: string
}

const SpeciesSchema = new Schema<ISpecies>({
  scientificName: { type: String, required: true, unique: true },
  commonName: String,
  taxonomyId: { type: String, required: true },
  kingdom: { type: String, required: true },
  phylum: { type: String, required: true },
  class: { type: String, required: true },
  order: { type: String, required: true },
  family: { type: String, required: true },
  genus: { type: String, required: true },
  species: { type: String, required: true },
  habitat: [String],
  geographicDistribution: [{
    coordinates: { type: [Number], required: true },
    locationName: { type: String, required: true },
    depth: Number
  }],
  conservationStatus: {
    type: String,
    enum: ['LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX', 'DD'],
    default: 'DD'
  },
  marineZone: {
    type: String,
    enum: ['pelagic', 'benthic', 'abyssal', 'hadal', 'littoral'],
    required: true
  },
  characteristics: {
    length: Number,
    weight: Number,
    lifespan: Number,
    diet: [String]
  },
  lastUpdated: { type: Date, default: Date.now },
  dataSource: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'species'
})

// Genetic Sequence Schema (for NCBI BLAST data)
export interface IGeneticSequence extends Document {
  accessionNumber: string
  sequenceId: string
  organism: string
  gene: string
  sequence: string
  sequenceLength: number
  sequenceType: 'DNA' | 'RNA' | 'protein'
  description: string
  taxonomy: {
    kingdom: string
    phylum: string
    class: string
    order: string
    family: string
    genus: string
    species: string
  }
  publications: string[]
  submissionDate: Date
  lastUpdated: Date
  qualityScore: number
  annotations: {
    features: Array<{
      type: string
      location: string
      qualifiers: Record<string, string>
    }>
  }
  blastResults?: Array<{
    hit: string
    eValue: number
    bitScore: number
    identity: number
  }>
}

const GeneticSequenceSchema = new Schema<IGeneticSequence>({
  accessionNumber: { type: String, required: true, unique: true },
  sequenceId: { type: String, required: true },
  organism: { type: String, required: true },
  gene: { type: String, required: true },
  sequence: { type: String, required: true },
  sequenceLength: { type: Number, required: true },
  sequenceType: {
    type: String,
    enum: ['DNA', 'RNA', 'protein'],
    required: true
  },
  description: { type: String, required: true },
  taxonomy: {
    kingdom: String,
    phylum: String,
    class: String,
    order: String,
    family: String,
    genus: String,
    species: String
  },
  publications: [String],
  submissionDate: { type: Date, required: true },
  lastUpdated: { type: Date, default: Date.now },
  qualityScore: { type: Number, min: 0, max: 100 },
  annotations: {
    features: [{
      type: String,
      location: String,
      qualifiers: { type: Map, of: String }
    }]
  },
  blastResults: [{
    hit: String,
    eValue: Number,
    bitScore: Number,
    identity: Number
  }]
}, {
  timestamps: true,
  collection: 'genetic_sequences'
})

// Oceanographic Data Schema
export interface IOceanographicData extends Document {
  stationId: string
  location: {
    coordinates: [number, number]
    name: string
    region: string
  }
  measurementDate: Date
  depth: number
  temperature: number
  salinity: number
  pH: number
  dissolvedOxygen: number
  chlorophyll: number
  turbidity: number
  nutrients: {
    nitrate: number
    phosphate: number
    silicate: number
  }
  currentSpeed: number
  currentDirection: number
  waveHeight: number
  dataQuality: 'excellent' | 'good' | 'fair' | 'poor'
  instrument: string
  dataSource: string
}

const OceanographicDataSchema = new Schema<IOceanographicData>({
  stationId: { type: String, required: true },
  location: {
    coordinates: { type: [Number], required: true },
    name: { type: String, required: true },
    region: { type: String, required: true }
  },
  measurementDate: { type: Date, required: true },
  depth: { type: Number, required: true },
  temperature: { type: Number, required: true },
  salinity: { type: Number, required: true },
  pH: Number,
  dissolvedOxygen: Number,
  chlorophyll: Number,
  turbidity: Number,
  nutrients: {
    nitrate: Number,
    phosphate: Number,
    silicate: Number
  },
  currentSpeed: Number,
  currentDirection: Number,
  waveHeight: Number,
  dataQuality: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor'],
    default: 'good'
  },
  instrument: { type: String, required: true },
  dataSource: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'oceanographic_data'
})

// eDNA Analysis Schema
export interface IEdnaAnalysis extends Document {
  sampleId: string
  location: {
    coordinates: [number, number]
    siteName: string
    waterBody: string
  }
  collectionDate: Date
  depth: number
  sampleVolume: number
  filtrationMethod: string
  extractionMethod: string
  sequencingPlatform: string
  sequencingResults: {
    totalReads: number
    qualityFilteredReads: number
    taxonomicAssignments: Array<{
      taxon: string
      readCount: number
      relativeAbundance: number
      confidence: number
    }>
  }
  diversityMetrics: {
    richness: number
    shannon: number
    simpson: number
    evenness: number
  }
  environmentalFactors: {
    temperature: number
    salinity: number
    pH: number
  }
  qualityControl: {
    contamination: boolean
    inhibition: boolean
    negativeControl: boolean
    positiveControl: boolean
  }
  analysisDate: Date
  analyst: string
}

const EdnaAnalysisSchema = new Schema<IEdnaAnalysis>({
  sampleId: { type: String, required: true, unique: true },
  location: {
    coordinates: { type: [Number], required: true },
    siteName: { type: String, required: true },
    waterBody: { type: String, required: true }
  },
  collectionDate: { type: Date, required: true },
  depth: { type: Number, required: true },
  sampleVolume: { type: Number, required: true },
  filtrationMethod: { type: String, required: true },
  extractionMethod: { type: String, required: true },
  sequencingPlatform: { type: String, required: true },
  sequencingResults: {
    totalReads: { type: Number, required: true },
    qualityFilteredReads: { type: Number, required: true },
    taxonomicAssignments: [{
      taxon: { type: String, required: true },
      readCount: { type: Number, required: true },
      relativeAbundance: { type: Number, required: true },
      confidence: { type: Number, required: true }
    }]
  },
  diversityMetrics: {
    richness: Number,
    shannon: Number,
    simpson: Number,
    evenness: Number
  },
  environmentalFactors: {
    temperature: Number,
    salinity: Number,
    pH: Number
  },
  qualityControl: {
    contamination: { type: Boolean, default: false },
    inhibition: { type: Boolean, default: false },
    negativeControl: { type: Boolean, required: true },
    positiveControl: { type: Boolean, required: true }
  },
  analysisDate: { type: Date, required: true },
  analyst: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'edna_analysis'
})

// Otolith Analysis Schema
export interface IOtolithAnalysis extends Document {
  specimenId: string
  species: string
  otolithType: 'sagitta' | 'lapillus' | 'asteriscus'
  measurements: {
    length: number
    width: number
    weight: number
    area: number
    perimeter: number
  }
  morphometrics: {
    roundness: number
    rectangularity: number
    ellipticity: number
    formFactor: number
  }
  ageEstimate: number
  growthRings: number
  captureInfo: {
    location: {
      coordinates: [number, number]
      siteName: string
    }
    date: Date
    depth: number
    fishLength: number
    fishWeight: number
  }
  imageAnalysis: {
    imagePath: string
    magnification: number
    resolution: number
    imageQuality: 'excellent' | 'good' | 'fair' | 'poor'
  }
  analyst: string
  analysisDate: Date
  notes: string
}

const OtolithAnalysisSchema = new Schema<IOtolithAnalysis>({
  specimenId: { type: String, required: true, unique: true },
  species: { type: String, required: true },
  otolithType: {
    type: String,
    enum: ['sagitta', 'lapillus', 'asteriscus'],
    required: true
  },
  measurements: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    weight: { type: Number, required: true },
    area: Number,
    perimeter: Number
  },
  morphometrics: {
    roundness: Number,
    rectangularity: Number,
    ellipticity: Number,
    formFactor: Number
  },
  ageEstimate: { type: Number, required: true },
  growthRings: { type: Number, required: true },
  captureInfo: {
    location: {
      coordinates: { type: [Number], required: true },
      siteName: { type: String, required: true }
    },
    date: { type: Date, required: true },
    depth: { type: Number, required: true },
    fishLength: Number,
    fishWeight: Number
  },
  imageAnalysis: {
    imagePath: String,
    magnification: Number,
    resolution: Number,
    imageQuality: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor'],
      default: 'good'
    }
  },
  analyst: { type: String, required: true },
  analysisDate: { type: Date, required: true },
  notes: String
}, {
  timestamps: true,
  collection: 'otolith_analysis'
})

// Research Project Schema
export interface IResearchProject extends Document {
  projectId: string
  title: string
  description: string
  principalInvestigator: string
  collaborators: string[]
  startDate: Date
  endDate?: Date
  status: 'planning' | 'active' | 'completed' | 'suspended'
  objectives: string[]
  methodology: string
  studyArea: {
    coordinates: [[number, number]]
    description: string
  }
  funding: {
    agency: string
    amount: number
    currency: string
  }
  publications: string[]
  datasets: string[]
  keywords: string[]
}

const ResearchProjectSchema = new Schema<IResearchProject>({
  projectId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  principalInvestigator: { type: String, required: true },
  collaborators: [String],
  startDate: { type: Date, required: true },
  endDate: Date,
  status: {
    type: String,
    enum: ['planning', 'active', 'completed', 'suspended'],
    default: 'planning'
  },
  objectives: [String],
  methodology: String,
  studyArea: {
    coordinates: [[Number]],
    description: String
  },
  funding: {
    agency: String,
    amount: Number,
    currency: { type: String, default: 'USD' }
  },
  publications: [String],
  datasets: [String],
  keywords: [String]
}, {
  timestamps: true,
  collection: 'research_projects'
})

// Create indexes for better performance
SpeciesSchema.index({ scientificName: 1 })
SpeciesSchema.index({ 'geographicDistribution.coordinates': '2dsphere' })
SpeciesSchema.index({ kingdom: 1, phylum: 1, class: 1 })

GeneticSequenceSchema.index({ accessionNumber: 1 })
GeneticSequenceSchema.index({ organism: 1 })
GeneticSequenceSchema.index({ gene: 1 })

OceanographicDataSchema.index({ 'location.coordinates': '2dsphere' })
OceanographicDataSchema.index({ measurementDate: -1 })
OceanographicDataSchema.index({ stationId: 1, measurementDate: -1 })

EdnaAnalysisSchema.index({ 'location.coordinates': '2dsphere' })
EdnaAnalysisSchema.index({ collectionDate: -1 })
EdnaAnalysisSchema.index({ sampleId: 1 })

OtolithAnalysisSchema.index({ species: 1 })
OtolithAnalysisSchema.index({ 'captureInfo.location.coordinates': '2dsphere' })
OtolithAnalysisSchema.index({ analysisDate: -1 })

ResearchProjectSchema.index({ status: 1 })
ResearchProjectSchema.index({ startDate: -1 })
ResearchProjectSchema.index({ 'studyArea.coordinates': '2dsphere' })

// Export models
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export const Species = mongoose.models.Species || mongoose.model<ISpecies>('Species', SpeciesSchema)
export const GeneticSequence = mongoose.models.GeneticSequence || mongoose.model<IGeneticSequence>('GeneticSequence', GeneticSequenceSchema)
export const OceanographicData = mongoose.models.OceanographicData || mongoose.model<IOceanographicData>('OceanographicData', OceanographicDataSchema)
export const EdnaAnalysis = mongoose.models.EdnaAnalysis || mongoose.model<IEdnaAnalysis>('EdnaAnalysis', EdnaAnalysisSchema)
export const OtolithAnalysis = mongoose.models.OtolithAnalysis || mongoose.model<IOtolithAnalysis>('OtolithAnalysis', OtolithAnalysisSchema)
export const ResearchProject = mongoose.models.ResearchProject || mongoose.model<IResearchProject>('ResearchProject', ResearchProjectSchema)
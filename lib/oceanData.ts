// Real-time and historical ocean data for comprehensive marine analysis

export interface OceanDataPoint {
  timestamp: string
  location: {
    lat: number
    lng: number
    name: string
    region: string
  }
  parameters: {
    temperature: number
    salinity: number
    pH: number
    dissolvedOxygen: number
    chlorophyll: number
    turbidity: number
    waveHeight: number
    currentSpeed: number
    currentDirection: number
    pressure: number
    depth: number
  }
  bioData?: {
    speciesCount: number
    biomass: number
    predominantSpecies: string[]
  }
}

export interface WeatherData {
  windSpeed: number
  windDirection: number
  airTemperature: number
  humidity: number
  precipitation: number
  cloudCover: number
  visibility: number
  barometricPressure: number
}

export interface TideData {
  time: string
  height: number
  type: 'high' | 'low'
  predicted: number
  verified: number
}

// Real-time ocean monitoring stations across Indian Ocean
export const monitoringStations = [
  {
    id: "INOS-001",
    name: "Goa Offshore Station",
    location: { lat: 15.4909, lng: 73.8278, depth: 45 },
    type: "deep_water",
    sensors: ["temperature", "salinity", "pH", "chlorophyll", "currents", "waves"],
    status: "active",
    lastUpdate: new Date().toISOString()
  },
  {
    id: "INOS-002", 
    name: "Chennai Coastal Station",
    location: { lat: 13.0827, lng: 80.2707, depth: 25 },
    type: "coastal",
    sensors: ["temperature", "salinity", "turbidity", "dissolved_oxygen", "pH"],
    status: "active",
    lastUpdate: new Date().toISOString()
  },
  {
    id: "INOS-003",
    name: "Mumbai Harbor Station", 
    location: { lat: 18.9220, lng: 72.8347, depth: 18 },
    type: "harbor",
    sensors: ["temperature", "salinity", "pH", "pollutants", "turbidity"],
    status: "active",
    lastUpdate: new Date().toISOString()
  },
  {
    id: "INOS-004",
    name: "Kochi Backwater Station",
    location: { lat: 9.9312, lng: 76.2673, depth: 12 },
    type: "estuary", 
    sensors: ["temperature", "salinity", "pH", "chlorophyll", "nutrients"],
    status: "active",
    lastUpdate: new Date().toISOString()
  },
  {
    id: "INOS-005",
    name: "Andaman Deep Sea Station",
    location: { lat: 11.7401, lng: 92.6586, depth: 180 },
    type: "deep_water",
    sensors: ["temperature", "salinity", "pressure", "currents", "biodata"],
    status: "active", 
    lastUpdate: new Date().toISOString()
  }
]

// Generate realistic real-time data
export const generateRealTimeOceanData = (stationId: string): OceanDataPoint => {
  const station = monitoringStations.find(s => s.id === stationId)
  const now = new Date()
  
  // Base values with realistic variations for different regions
  const lat = station?.location.lat || 15.0
  const baseTemp = lat > 15 ? 26 + Math.random() * 4 : 28 + Math.random() * 3
  const baseSalinity = 34.5 + Math.random() * 1.5
  const baseChlorophyll = Math.random() * 3 + 0.5
  
  return {
    timestamp: now.toISOString(),
    location: {
      lat: station?.location.lat || 15.0,
      lng: station?.location.lng || 75.0,
      name: station?.name || "Unknown Station",
      region: getRegionName(station?.location.lat || 15.0, station?.location.lng || 75.0)
    },
    parameters: {
      temperature: +(baseTemp + (Math.random() - 0.5) * 0.5).toFixed(2),
      salinity: +(baseSalinity + (Math.random() - 0.5) * 0.3).toFixed(2),
      pH: +(8.0 + (Math.random() - 0.5) * 0.4).toFixed(2),
      dissolvedOxygen: +(6.5 + Math.random() * 2).toFixed(2),
      chlorophyll: +(baseChlorophyll + (Math.random() - 0.5) * 0.8).toFixed(2),
      turbidity: +(Math.random() * 8 + 1).toFixed(2),
      waveHeight: +(Math.random() * 2.5 + 0.5).toFixed(2),
      currentSpeed: +(Math.random() * 1.2 + 0.1).toFixed(2),
      currentDirection: Math.floor(Math.random() * 360),
      pressure: +(1013 + (Math.random() - 0.5) * 20).toFixed(1),
      depth: station?.location.depth || 30
    },
    bioData: {
      speciesCount: Math.floor(Math.random() * 25 + 15),
      biomass: +(Math.random() * 150 + 50).toFixed(1),
      predominantSpecies: getRandomSpecies()
    }
  }
}

// Historical trend data for analysis
export const generateHistoricalTrends = (days: number = 30) => {
  const data: OceanDataPoint[] = []
  const now = new Date()
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    monitoringStations.forEach(station => {
      const dataPoint = generateRealTimeOceanData(station.id)
      dataPoint.timestamp = date.toISOString()
      data.push(dataPoint)
    })
  }
  
  return data
}

// Get current weather conditions
export const getCurrentWeather = (): WeatherData => {
  return {
    windSpeed: +(Math.random() * 15 + 5).toFixed(1),
    windDirection: Math.floor(Math.random() * 360),
    airTemperature: +(25 + Math.random() * 8).toFixed(1),
    humidity: +(60 + Math.random() * 30).toFixed(1),
    precipitation: +(Math.random() * 5).toFixed(1),
    cloudCover: +(Math.random() * 100).toFixed(0),
    visibility: +(8 + Math.random() * 7).toFixed(1),
    barometricPressure: +(1010 + (Math.random() - 0.5) * 25).toFixed(1)
  }
}

// Get tide predictions
export const getTideData = (days: number = 7): TideData[] => {
  const tides: TideData[] = []
  const now = new Date()
  
  for (let i = 0; i < days * 4; i++) { // 4 tides per day
    const time = new Date(now.getTime() + i * 6 * 60 * 60 * 1000) // Every 6 hours
    const height = Math.sin(i * Math.PI / 2) * 2 + Math.random() * 0.5
    
    tides.push({
      time: time.toISOString(),
      height: +height.toFixed(2),
      type: i % 2 === 0 ? 'high' : 'low',
      predicted: +height.toFixed(2),
      verified: +(height + (Math.random() - 0.5) * 0.2).toFixed(2)
    })
  }
  
  return tides
}

// Utility functions
function getRegionName(lat: number, lng: number): string {
  if (lat > 20 && lng < 75) return "Arabian Sea"
  if (lat > 15 && lng > 80) return "Bay of Bengal"
  if (lat < 15 && lng > 75) return "Indian Ocean"
  if (lat > 10 && lng < 95) return "Andaman Sea"
  return "Indian Ocean"
}

function getRandomSpecies(): string[] {
  const species = [
    "Sardines", "Mackerel", "Tuna", "Anchovies", "Pomfret", "Kingfish",
    "Grouper", "Snapper", "Barracuda", "Flying Fish", "Sole", "Flounder",
    "Shrimp", "Crab", "Lobster", "Squid", "Octopus", "Jellyfish"
  ]
  
  const count = Math.floor(Math.random() * 4) + 2
  const selected: string[] = []
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * species.length)
    if (!selected.includes(species[randomIndex])) {
      selected.push(species[randomIndex])
    }
  }
  
  return selected
}

// Water quality assessment
export const assessWaterQuality = (parameters: OceanDataPoint['parameters']) => {
  let score = 100
  let issues: string[] = []
  
  // Temperature assessment
  if (parameters.temperature < 20 || parameters.temperature > 32) {
    score -= 15
    issues.push("Temperature outside optimal range")
  }
  
  // pH assessment
  if (parameters.pH < 7.8 || parameters.pH > 8.3) {
    score -= 20
    issues.push("pH levels concerning")
  }
  
  // Dissolved oxygen assessment
  if (parameters.dissolvedOxygen < 5) {
    score -= 25
    issues.push("Low dissolved oxygen levels")
  }
  
  // Turbidity assessment
  if (parameters.turbidity > 10) {
    score -= 10
    issues.push("High turbidity levels")
  }
  
  // Salinity assessment
  if (parameters.salinity < 30 || parameters.salinity > 38) {
    score -= 10
    issues.push("Salinity outside normal range")
  }
  
  return {
    score: Math.max(0, score),
    grade: score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : score >= 60 ? 'Fair' : 'Poor',
    issues
  }
}

// Marine biodiversity hotspots
export const biodiversityHotspots = [
  {
    name: "Lakshadweep Islands",
    location: { lat: 10.5667, lng: 72.6417 },
    biodiversityIndex: 0.92,
    endemicSpecies: 45,
    threatenedSpecies: 12,
    marineProtectedArea: true
  },
  {
    name: "Andaman and Nicobar Islands",
    location: { lat: 11.7401, lng: 92.6586 },
    biodiversityIndex: 0.88,
    endemicSpecies: 67,
    threatenedSpecies: 23,
    marineProtectedArea: true
  },
  {
    name: "Gulf of Mannar",
    location: { lat: 9.2806, lng: 79.3129 },
    biodiversityIndex: 0.85,
    endemicSpecies: 38,
    threatenedSpecies: 15,
    marineProtectedArea: true
  },
  {
    name: "Western Ghats Estuaries",
    location: { lat: 9.9312, lng: 76.2673 },
    biodiversityIndex: 0.79,
    endemicSpecies: 29,
    threatenedSpecies: 8,
    marineProtectedArea: false
  }
]

// Export main function for getting comprehensive ocean data
export const getComprehensiveOceanData = () => {
  return {
    realTimeData: monitoringStations.map(station => generateRealTimeOceanData(station.id)),
    historicalTrends: generateHistoricalTrends(30),
    weatherData: getCurrentWeather(),
    tideData: getTideData(7),
    biodiversityHotspots,
    monitoringStations,
    lastUpdate: new Date().toISOString()
  }
}

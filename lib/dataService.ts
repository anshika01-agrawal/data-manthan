import { Species, OceanographicData, EdnaAnalysis, OtolithAnalysis } from '@/lib/models'
import connectDB from '@/lib/mongodb'

export interface DashboardStats {
  totalSpecies: number
  totalOceanographicRecords: number
  totalEdnaAnalyses: number
  totalOtolithAnalyses: number
  recentSpeciesCount: number
  avgTemperature: number
  avgSalinity: number
  avgChlorophyll: number
  biodiversityTrend: Array<{
    month: string
    count: number
  }>
  oceanographicTrend: Array<{
    date: string
    temperature: number
    salinity: number
    chlorophyll: number
  }>
  speciesDistribution: Array<{
    species: string
    count: number
    marineZone: string
  }>
  ednaQualityMetrics: {
    averageQuality: number
    totalSamples: number
    avgRichness: number
    avgShannon: number
  }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    await connectDB()

    // Get species statistics
    const totalSpecies = await Species.countDocuments()
    const recentSpecies = await Species.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    })

    // Get oceanographic statistics
    const totalOceanographicRecords = await OceanographicData.countDocuments()
    const oceanStats = await OceanographicData.aggregate([
      {
        $group: {
          _id: null,
          avgTemperature: { $avg: '$temperature' },
          avgSalinity: { $avg: '$salinity' },
          avgChlorophyll: { $avg: '$chlorophyll' }
        }
      }
    ])

    // Get eDNA statistics
    const totalEdnaAnalyses = await EdnaAnalysis.countDocuments()
    const ednaStats = await EdnaAnalysis.aggregate([
      {
        $group: {
          _id: null,
          avgRichness: { $avg: '$diversityMetrics.richness' },
          avgShannon: { $avg: '$diversityMetrics.shannon' },
          totalSamples: { $sum: 1 }
        }
      }
    ])

    // Get otolith statistics
    const totalOtolithAnalyses = await OtolithAnalysis.countDocuments()

    // Get biodiversity trend (last 12 months)
    const biodiversityTrendData = await Species.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 }
    ])

    // Get recent oceanographic trend
    const oceanographicTrend = await OceanographicData.aggregate([
      { $sort: { measurementDate: -1 } },
      { $limit: 30 },
      {
        $project: {
          date: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$measurementDate'
            }
          },
          temperature: 1,
          salinity: 1,
          chlorophyll: 1
        }
      },
      { $sort: { date: 1 } }
    ])

    // Get species distribution by marine zone
    const speciesDistribution = await Species.aggregate([
      {
        $group: {
          _id: {
            species: '$scientificName',
            marineZone: '$marineZone'
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          species: '$_id.species',
          marineZone: '$_id.marineZone',
          count: 1,
          _id: 0
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ])

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    const biodiversityTrend = biodiversityTrendData.map(item => ({
      month: monthNames[item._id.month - 1],
      count: item.count
    }))

    return {
      totalSpecies,
      totalOceanographicRecords,
      totalEdnaAnalyses,
      totalOtolithAnalyses,
      recentSpeciesCount: recentSpecies,
      avgTemperature: oceanStats[0]?.avgTemperature || 0,
      avgSalinity: oceanStats[0]?.avgSalinity || 0,
      avgChlorophyll: oceanStats[0]?.avgChlorophyll || 0,
      biodiversityTrend,
      oceanographicTrend,
      speciesDistribution,
      ednaQualityMetrics: {
        averageQuality: 92, // Placeholder for calculated quality
        totalSamples: ednaStats[0]?.totalSamples || 0,
        avgRichness: ednaStats[0]?.avgRichness || 0,
        avgShannon: ednaStats[0]?.avgShannon || 0
      }
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    // Return fallback data
    return {
      totalSpecies: 0,
      totalOceanographicRecords: 0,
      totalEdnaAnalyses: 0,
      totalOtolithAnalyses: 0,
      recentSpeciesCount: 0,
      avgTemperature: 0,
      avgSalinity: 0,
      avgChlorophyll: 0,
      biodiversityTrend: [],
      oceanographicTrend: [],
      speciesDistribution: [],
      ednaQualityMetrics: {
        averageQuality: 0,
        totalSamples: 0,
        avgRichness: 0,
        avgShannon: 0
      }
    }
  }
}

export async function getSpeciesByMarineZone() {
  try {
    await connectDB()
    
    const distribution = await Species.aggregate([
      {
        $group: {
          _id: '$marineZone',
          count: { $sum: 1 },
          species: { $push: '$scientificName' }
        }
      },
      { $sort: { count: -1 } }
    ])
    
    return distribution.map(item => ({
      zone: item._id,
      count: item.count,
      species: item.species.slice(0, 5) // Top 5 species per zone
    }))
  } catch (error) {
    console.error('Error fetching species by marine zone:', error)
    return []
  }
}

export async function getRecentOceanographicData(limit: number = 50) {
  try {
    await connectDB()
    
    const data = await OceanographicData.find({})
      .sort({ measurementDate: -1 })
      .limit(limit)
      .lean()
    
    return data.map(record => ({
      id: record._id.toString(),
      stationId: record.stationId,
      location: record.location,
      date: record.measurementDate.toISOString().split('T')[0],
      temperature: record.temperature,
      salinity: record.salinity,
      chlorophyll: record.chlorophyll,
      depth: record.depth,
      pH: record.pH || 8.0,
      dissolvedOxygen: record.dissolvedOxygen || 6.0
    }))
  } catch (error) {
    console.error('Error fetching oceanographic data:', error)
    return []
  }
}
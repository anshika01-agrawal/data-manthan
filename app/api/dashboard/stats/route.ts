import { NextRequest, NextResponse } from 'next/server'
import { getDashboardStats } from '@/lib/dataService'
import { getMockDashboardStats } from '@/lib/mockDataService'

export async function GET(request: NextRequest) {
  try {
    // Try to get real data first, fallback to mock data if MongoDB is not available
    let stats
    try {
      stats = await getDashboardStats()
    } catch (dbError) {
      console.log('MongoDB not available, using mock data')
      stats = await getMockDashboardStats()
    }
    
    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch dashboard statistics' 
      },
      { status: 500 }
    )
  }
}
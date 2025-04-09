import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

interface WebsiteStats {
  pageViews: number
  bookingClicks: number
  completedBookings: number
  loadTimes: number[]
  lastUpdated: string
}

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Initialize stats if they don't exist
async function initializeStats() {
  const stats = await redis.get<WebsiteStats>('website_stats')
  if (!stats) {
    await redis.set('website_stats', {
      pageViews: 0,
      bookingClicks: 0,
      completedBookings: 0,
      loadTimes: [],
      lastUpdated: new Date().toISOString()
    })
  }
}

// Update stats
export async function POST(request: Request) {
  try {
    await initializeStats()
    const { type, value } = await request.json()
    const stats = await redis.get<WebsiteStats>('website_stats')
    
    if (!stats) {
      throw new Error('Stats not initialized')
    }
    
    switch (type) {
      case 'pageView':
        stats.pageViews++
        break
      case 'bookingClick':
        stats.bookingClicks++
        break
      case 'completedBooking':
        stats.completedBookings++
        break
      case 'loadTime':
        stats.loadTimes.push(value)
        // Keep only the last 100 load times
        if (stats.loadTimes.length > 100) {
          stats.loadTimes = stats.loadTimes.slice(-100)
        }
        break
    }

    stats.lastUpdated = new Date().toISOString()
    await redis.set('website_stats', stats)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating stats:', error)
    return NextResponse.json(
      { error: 'Failed to update stats' },
      { status: 500 }
    )
  }
}

// Get stats
export async function GET() {
  try {
    await initializeStats()
    const stats = await redis.get<WebsiteStats>('website_stats')
    
    if (!stats) {
      throw new Error('Stats not initialized')
    }

    // Calculate average load time
    const avgLoadTime = stats.loadTimes.length > 0
      ? stats.loadTimes.reduce((a: number, b: number) => a + b, 0) / stats.loadTimes.length
      : 0

    return NextResponse.json({
      ...stats,
      avgLoadTime: Math.round(avgLoadTime * 100) / 100 // Round to 2 decimal places
    })
  } catch (error) {
    console.error('Error getting stats:', error)
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    )
  }
} 
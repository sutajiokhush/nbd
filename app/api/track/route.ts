import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

interface VisitData {
  timestamp: string;
  ip: string;
  userAgent: string;
  referer?: string;
  country?: string;
  city?: string;
}

interface AnalyticsData {
  totalVisits: number;
  visits: VisitData[];
  lastUpdated: string;
}

const DATA_FILE = join(process.cwd(), 'data', 'visits.json');

async function ensureDataFile(): Promise<AnalyticsData> {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    // File doesn't exist, create initial data
    const initialData: AnalyticsData = {
      totalVisits: 0,
      visits: [],
      lastUpdated: new Date().toISOString()
    };
    
    try {
      await writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
    } catch (error) {
      // If we can't write to file, return in-memory data
      console.warn('Could not write to data file, using in-memory tracking');
    }
    
    return initialData;
  }
}

export async function POST(request: NextRequest) {
  try {
    const visitData: VisitData = {
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      referer: request.headers.get('referer') || undefined,
      country: request.headers.get('x-vercel-ip-country') || undefined,
      city: request.headers.get('x-vercel-ip-city') || undefined
    };

    const analytics = await ensureDataFile();
    analytics.totalVisits += 1;
    analytics.visits.push(visitData);
    analytics.lastUpdated = new Date().toISOString();

    // Keep only last 1000 visits to prevent file from getting too large
    if (analytics.visits.length > 1000) {
      analytics.visits = analytics.visits.slice(-1000);
    }

    try {
      await writeFile(DATA_FILE, JSON.stringify(analytics, null, 2));
    } catch (error) {
      console.warn('Could not save visit data to file:', error);
    }

    return NextResponse.json({ 
      success: true, 
      totalVisits: analytics.totalVisits,
      message: 'Visit tracked successfully'
    });
  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track visit' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const analytics = await ensureDataFile();
    
    // Calculate some basic stats
    const today = new Date().toISOString().split('T')[0];
    const todayVisits = analytics.visits.filter(
      visit => visit.timestamp.startsWith(today)
    ).length;

    const uniqueIPs = new Set(analytics.visits.map(v => v.ip)).size;

    return NextResponse.json({
      success: true,
      data: {
        totalVisits: analytics.totalVisits,
        todayVisits,
        uniqueVisitors: uniqueIPs,
        lastUpdated: analytics.lastUpdated,
        recentVisits: analytics.visits.slice(-10).reverse()
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

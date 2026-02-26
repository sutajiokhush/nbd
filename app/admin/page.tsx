'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  totalVisits: number;
  todayVisits: number;
  uniqueVisitors: number;
  lastUpdated: string;
  recentVisits: Array<{
    timestamp: string;
    ip: string;
    userAgent: string;
    country?: string;
    city?: string;
  }>;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
    // Refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/track');
      const data = await response.json();
      
      if (data.success) {
        setAnalytics(data.data);
        setError(null);
      } else {
        setError('Failed to fetch analytics');
      }
    } catch (error) {
      setError('Error fetching analytics');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-navy flex items-center justify-center">
        <div className="text-romantic-pink text-2xl">Loading analytics...</div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-midnight-navy flex items-center justify-center">
        <div className="text-center">
          <div className="text-romantic-pink text-2xl mb-4">Error loading analytics</div>
          <button 
            onClick={fetchAnalytics}
            className="bg-romantic-pink text-midnight-navy px-6 py-2 rounded-lg hover:bg-romantic-pink/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight-navy p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-romantic-pink mb-8">Analytics Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-ocean-blue p-6 rounded-xl">
            <h3 className="text-ethereal-teal text-lg mb-2">Total Visits</h3>
            <p className="text-5xl font-bold text-white">{analytics.totalVisits}</p>
          </div>
          
          <div className="bg-ocean-blue p-6 rounded-xl">
            <h3 className="text-ethereal-teal text-lg mb-2">Today's Visits</h3>
            <p className="text-5xl font-bold text-white">{analytics.todayVisits}</p>
          </div>
          
          <div className="bg-ocean-blue p-6 rounded-xl">
            <h3 className="text-ethereal-teal text-lg mb-2">Unique Visitors</h3>
            <p className="text-5xl font-bold text-white">{analytics.uniqueVisitors}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-ocean-blue p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <button 
              onClick={fetchAnalytics}
              className="bg-ethereal-teal text-white px-4 py-2 rounded-lg hover:bg-ethereal-teal/80 transition-colors"
            >
              Refresh
            </button>
          </div>
          
          <div className="space-y-3">
            {analytics.recentVisits.map((visit, index) => (
              <div key={index} className="bg-midnight-navy p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-romantic-pink font-semibold">
                      {new Date(visit.timestamp).toLocaleString()}
                    </p>
                    <p className="text-ethereal-teal text-sm">
                      IP: {visit.ip}
                    </p>
                    {visit.country && visit.city && (
                      <p className="text-ethereal-teal text-sm">
                        📍 {visit.city}, {visit.country}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs max-w-xs truncate">
                      {visit.userAgent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {analytics.recentVisits.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                No recent visits recorded
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-gray-400 text-sm">
          Last updated: {new Date(analytics.lastUpdated).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

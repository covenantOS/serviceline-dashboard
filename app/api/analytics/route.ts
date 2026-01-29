import { NextRequest, NextResponse } from "next/server"

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const timeframe = searchParams.get("timeframe") || "30d"
  
  // Mock analytics data
  const analytics = {
    overview: {
      totalLeads: 2847,
      activeCampaigns: 12,
      conversionRate: 24.8,
      revenue: 45231,
      trends: {
        leads: 12.5,
        campaigns: 8.2,
        conversions: 3.1,
        revenue: 19.4,
      },
    },
    performance: [
      { date: "Jan 1", leads: 45, conversions: 12, spend: 850 },
      { date: "Jan 8", leads: 52, conversions: 18, spend: 920 },
      { date: "Jan 15", leads: 61, conversions: 22, spend: 1050 },
      { date: "Jan 22", leads: 58, conversions: 20, spend: 980 },
      { date: "Jan 29", leads: 68, conversions: 25, spend: 1100 },
    ],
    channels: [
      { channel: "Email", leads: 145, conversions: 42, roi: 285 },
      { channel: "Social", leads: 98, conversions: 28, roi: 215 },
      { channel: "PPC", leads: 167, conversions: 55, roi: 340 },
      { channel: "SEO", leads: 124, conversions: 38, roi: 295 },
    ],
    sources: [
      { source: "website", count: 842, percentage: 29.6 },
      { source: "referral", count: 654, percentage: 23.0 },
      { source: "social", count: 568, percentage: 19.9 },
      { source: "email", count: 489, percentage: 17.2 },
      { source: "phone", count: 294, percentage: 10.3 },
    ],
  }
  
  return NextResponse.json(analytics)
}

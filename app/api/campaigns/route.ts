import { NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/types/campaign"

// Mock database
let campaigns: Campaign[] = [
  {
    id: "1",
    name: "Q1 Email Campaign",
    description: "Targeted email campaign for enterprise clients",
    status: "active",
    channels: ["email"],
    budget: 10000,
    spent: 7500,
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    leads: 342,
    conversions: 85,
    roi: 285,
    cpl: 21.93,
    conversionRate: 24.85,
    createdBy: "Sarah Johnson",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// GET /api/campaigns - List all campaigns
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get("status")
  
  let filteredCampaigns = campaigns
  
  if (status && status !== "all") {
    filteredCampaigns = filteredCampaigns.filter(
      (campaign) => campaign.status === status
    )
  }
  
  return NextResponse.json({
    campaigns: filteredCampaigns,
    total: filteredCampaigns.length,
  })
}

// POST /api/campaigns - Create a new campaign
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newCampaign: Campaign = {
      id: String(campaigns.length + 1),
      name: body.name,
      description: body.description,
      status: "draft",
      channels: body.channels || [],
      budget: body.budget || 0,
      spent: 0,
      startDate: body.startDate,
      endDate: body.endDate,
      leads: 0,
      conversions: 0,
      roi: 0,
      cpl: 0,
      conversionRate: 0,
      createdBy: body.createdBy || "Unknown",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    campaigns.push(newCampaign)
    
    return NextResponse.json({ campaign: newCampaign }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 400 }
    )
  }
}

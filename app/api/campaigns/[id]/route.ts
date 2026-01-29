import { NextRequest, NextResponse } from "next/server"
import { Campaign } from "@/types/campaign"

// Mock database (in production, use actual database)
let campaigns: Campaign[] = []

// GET /api/campaigns/[id] - Get a specific campaign
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const campaign = campaigns.find((c) => c.id === params.id)
  
  if (!campaign) {
    return NextResponse.json(
      { error: "Campaign not found" },
      { status: 404 }
    )
  }
  
  return NextResponse.json({ campaign })
}

// PATCH /api/campaigns/[id] - Update a campaign
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const campaignIndex = campaigns.findIndex((c) => c.id === params.id)
    
    if (campaignIndex === -1) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      )
    }
    
    campaigns[campaignIndex] = {
      ...campaigns[campaignIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }
    
    return NextResponse.json({ campaign: campaigns[campaignIndex] })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 400 }
    )
  }
}

// DELETE /api/campaigns/[id] - Delete a campaign
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const campaignIndex = campaigns.findIndex((c) => c.id === params.id)
  
  if (campaignIndex === -1) {
    return NextResponse.json(
      { error: "Campaign not found" },
      { status: 404 }
    )
  }
  
  campaigns.splice(campaignIndex, 1)
  
  return NextResponse.json({ message: "Campaign deleted successfully" })
}

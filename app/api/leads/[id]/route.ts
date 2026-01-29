import { NextRequest, NextResponse } from "next/server"
import { Lead } from "@/types/lead"

// Mock database (in production, use actual database)
let leads: Lead[] = []

// GET /api/leads/[id] - Get a specific lead
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const lead = leads.find((l) => l.id === params.id)
  
  if (!lead) {
    return NextResponse.json(
      { error: "Lead not found" },
      { status: 404 }
    )
  }
  
  return NextResponse.json({ lead })
}

// PATCH /api/leads/[id] - Update a lead
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const leadIndex = leads.findIndex((l) => l.id === params.id)
    
    if (leadIndex === -1) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      )
    }
    
    leads[leadIndex] = {
      ...leads[leadIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }
    
    return NextResponse.json({ lead: leads[leadIndex] })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 400 }
    )
  }
}

// DELETE /api/leads/[id] - Delete a lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const leadIndex = leads.findIndex((l) => l.id === params.id)
  
  if (leadIndex === -1) {
    return NextResponse.json(
      { error: "Lead not found" },
      { status: 404 }
    )
  }
  
  leads.splice(leadIndex, 1)
  
  return NextResponse.json({ message: "Lead deleted successfully" })
}

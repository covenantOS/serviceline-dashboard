import { NextRequest, NextResponse } from "next/server"
import { Lead } from "@/types/lead"

// Mock database
let leads: Lead[] = [
  {
    id: "1",
    name: "Alice Cooper",
    email: "alice@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp",
    position: "CTO",
    source: "website",
    status: "new",
    score: 85,
    assignedTo: "Sarah Johnson",
    tags: ["enterprise", "high-priority"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedValue: 50000,
  },
]

// GET /api/leads - List all leads
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get("status")
  const source = searchParams.get("source")
  
  let filteredLeads = leads
  
  if (status && status !== "all") {
    filteredLeads = filteredLeads.filter((lead) => lead.status === status)
  }
  
  if (source && source !== "all") {
    filteredLeads = filteredLeads.filter((lead) => lead.source === source)
  }
  
  return NextResponse.json({ leads: filteredLeads, total: filteredLeads.length })
}

// POST /api/leads - Create a new lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newLead: Lead = {
      id: String(leads.length + 1),
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      position: body.position,
      source: body.source || "other",
      status: "new",
      score: body.score || 0,
      assignedTo: body.assignedTo,
      tags: body.tags || [],
      notes: body.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedValue: body.estimatedValue,
    }
    
    leads.push(newLead)
    
    return NextResponse.json({ lead: newLead }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 400 }
    )
  }
}

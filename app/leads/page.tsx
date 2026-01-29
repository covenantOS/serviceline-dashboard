import { LeadTable } from "@/components/leads/lead-table"
import { LeadFilters } from "@/components/leads/lead-filters"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { Lead } from "@/types/lead"

// Mock data
const mockLeads: Lead[] = [
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
    createdAt: "2026-01-29T10:30:00Z",
    updatedAt: "2026-01-29T10:30:00Z",
    estimatedValue: 50000,
  },
  {
    id: "2",
    name: "Bob Williams",
    email: "bob@startupxyz.com",
    phone: "+1 (555) 234-5678",
    company: "StartupXYZ",
    position: "Founder",
    source: "referral",
    status: "contacted",
    score: 72,
    assignedTo: "Mike Chen",
    tags: ["startup"],
    createdAt: "2026-01-28T15:20:00Z",
    updatedAt: "2026-01-29T09:15:00Z",
    lastContact: "2026-01-29T09:15:00Z",
    estimatedValue: 25000,
  },
  {
    id: "3",
    name: "Carol Martinez",
    email: "carol@enterprise.com",
    company: "Enterprise Inc",
    position: "VP Marketing",
    source: "social",
    status: "qualified",
    score: 91,
    assignedTo: "Emily Davis",
    tags: ["enterprise", "hot-lead"],
    createdAt: "2026-01-27T11:00:00Z",
    updatedAt: "2026-01-29T08:00:00Z",
    lastContact: "2026-01-28T14:30:00Z",
    estimatedValue: 75000,
  },
]

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Manage and track your leads</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <LeadFilters />
      <LeadTable leads={mockLeads} />
    </div>
  )
}

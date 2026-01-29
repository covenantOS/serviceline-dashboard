import { CampaignCard } from "@/components/campaigns/campaign-card"
import { CampaignAnalytics } from "@/components/campaigns/campaign-analytics"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Campaign } from "@/types/campaign"

// Mock data
const mockCampaigns: Campaign[] = [
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
    createdAt: "2025-12-15T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "2",
    name: "Social Media Blitz",
    description: "Multi-platform social media campaign",
    status: "active",
    channels: ["social"],
    budget: 8000,
    spent: 6200,
    startDate: "2026-01-15",
    endDate: "2026-02-28",
    leads: 198,
    conversions: 42,
    roi: 215,
    cpl: 31.31,
    conversionRate: 21.21,
    createdBy: "Mike Chen",
    createdAt: "2026-01-05T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "3",
    name: "PPC Google Ads",
    description: "Search and display advertising",
    status: "active",
    channels: ["ppc", "display"],
    budget: 15000,
    spent: 12800,
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    leads: 267,
    conversions: 91,
    roi: 340,
    cpl: 47.94,
    conversionRate: 34.08,
    createdBy: "Emily Davis",
    createdAt: "2025-12-20T00:00:00Z",
    updatedAt: "2026-01-29T00:00:00Z",
  },
]

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">Track and manage your marketing campaigns</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      <CampaignAnalytics />

      <div>
        <h2 className="mb-4 text-xl font-semibold">Active Campaigns</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  )
}

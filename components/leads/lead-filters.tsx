"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Filter, Search } from "lucide-react"

export function LeadFilters() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search leads..."
          className="pl-10"
        />
      </div>
      <Button variant="outline" className="gap-2">
        <Filter className="h-4 w-4" />
        Filters
      </Button>
      <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
        <option value="all">All Status</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="qualified">Qualified</option>
        <option value="converted">Converted</option>
        <option value="lost">Lost</option>
      </select>
      <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
        <option value="all">All Sources</option>
        <option value="website">Website</option>
        <option value="referral">Referral</option>
        <option value="social">Social</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>
    </div>
  )
}

"use client"

import { Lead } from "@/types/lead"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MoreHorizontal } from "lucide-react"

interface LeadTableProps {
  leads: Lead[]
}

const statusColors = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  qualified: "bg-purple-500",
  converted: "bg-green-500",
  lost: "bg-red-500",
}

export function LeadTable({ leads }: LeadTableProps) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-4 text-left text-sm font-medium">Name</th>
              <th className="p-4 text-left text-sm font-medium">Company</th>
              <th className="p-4 text-left text-sm font-medium">Status</th>
              <th className="p-4 text-left text-sm font-medium">Score</th>
              <th className="p-4 text-left text-sm font-medium">Source</th>
              <th className="p-4 text-left text-sm font-medium">Assigned To</th>
              <th className="p-4 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-muted/50">
                <td className="p-4">
                  <div>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-muted-foreground">{lead.email}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div>{lead.company || "-"}</div>
                  {lead.position && (
                    <div className="text-sm text-muted-foreground">{lead.position}</div>
                  )}
                </td>
                <td className="p-4">
                  <Badge className={statusColors[lead.status]}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-sm">{lead.score}</span>
                  </div>
                </td>
                <td className="p-4 capitalize">{lead.source}</td>
                <td className="p-4">{lead.assignedTo || "Unassigned"}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

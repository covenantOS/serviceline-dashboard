"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserPlus, Mail, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const teamMembers = [
  { id: 1, name: "Sarah Johnson", email: "sarah@serviceline.com", role: "Admin", status: "active" },
  { id: 2, name: "Mike Chen", email: "mike@serviceline.com", role: "Manager", status: "active" },
  { id: 3, name: "Emily Davis", email: "emily@serviceline.com", role: "Agent", status: "active" },
  { id: 4, name: "Alex Kumar", email: "alex@serviceline.com", role: "Agent", status: "invited" },
]

export function TeamSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team and their permissions</CardDescription>
            </div>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={member.status === "active" ? "default" : "secondary"}>
                    {member.status}
                  </Badge>
                  <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="agent">Agent</option>
                  </select>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Roles & Permissions</CardTitle>
          <CardDescription>Configure role-based access controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="font-medium">Admin</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Full access to all features, settings, and team management
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="font-medium">Manager</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Manage leads, campaigns, and view analytics. Limited settings access
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="font-medium">Agent</div>
              <div className="mt-2 text-sm text-muted-foreground">
                View and manage assigned leads. Read-only campaign access
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

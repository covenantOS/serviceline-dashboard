"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"

const integrations = [
  { id: 1, name: "Salesforce", description: "Sync leads and contacts", connected: true, logo: "SF" },
  { id: 2, name: "HubSpot", description: "Marketing automation", connected: true, logo: "HS" },
  { id: 3, name: "Mailchimp", description: "Email campaigns", connected: false, logo: "MC" },
  { id: 4, name: "Slack", description: "Team notifications", connected: true, logo: "SL" },
  { id: 5, name: "Google Analytics", description: "Website tracking", connected: false, logo: "GA" },
  { id: 6, name: "Zapier", description: "Automation workflows", connected: false, logo: "ZP" },
]

export function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connect ServiceLine with your favorite tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-start justify-between rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                    {integration.logo}
                  </div>
                  <div>
                    <div className="font-medium">{integration.name}</div>
                    <div className="text-sm text-muted-foreground">{integration.description}</div>
                    <div className="mt-2">
                      {integration.connected ? (
                        <Badge className="gap-1" variant="default">
                          <CheckCircle2 className="h-3 w-3" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge className="gap-1" variant="outline">
                          <Circle className="h-3 w-3" />
                          Not Connected
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant={integration.connected ? "outline" : "default"} size="sm">
                  {integration.connected ? "Configure" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Manage API keys and webhooks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex gap-2">
              <Input id="apiKey" type="password" value="sk_live_••••••••••••••••" readOnly />
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook">Webhook URL</Label>
            <Input id="webhook" placeholder="https://your-domain.com/webhook" />
          </div>
          <Button>Save Configuration</Button>
        </CardContent>
      </Card>
    </div>
  )
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserSettings } from "@/components/settings/user-settings"
import { TeamSettings } from "@/components/settings/team-settings"
import { IntegrationSettings } from "@/components/settings/integration-settings"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <UserSettings />
        </TabsContent>
        <TabsContent value="team" className="space-y-4">
          <TeamSettings />
        </TabsContent>
        <TabsContent value="integrations" className="space-y-4">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

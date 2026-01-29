import { getCampaign } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CampaignForm } from '@/components/campaigns/campaign-form'

export const revalidate = 0

export default async function EditCampaignPage({
  params,
}: {
  params: { id: string }
}) {
  const campaign = await getCampaign(params.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Campaign</h1>
        <p className="text-muted-foreground">
          Update information for {campaign.name}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
          <CardDescription>Update the campaign details below</CardDescription>
        </CardHeader>
        <CardContent>
          <CampaignForm campaign={campaign} />
        </CardContent>
      </Card>
    </div>
  )
}

import { getLead } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LeadForm } from '@/components/leads/lead-form'

export const revalidate = 0

export default async function EditLeadPage({
  params,
}: {
  params: { id: string }
}) {
  const lead = await getLead(params.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Lead</h1>
        <p className="text-muted-foreground">
          Update information for {lead.first_name} {lead.last_name}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Information</CardTitle>
          <CardDescription>Update the lead details below</CardDescription>
        </CardHeader>
        <CardContent>
          <LeadForm lead={lead} />
        </CardContent>
      </Card>
    </div>
  )
}

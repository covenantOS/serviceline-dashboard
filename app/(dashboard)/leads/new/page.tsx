import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LeadForm } from '@/components/leads/lead-form'

export default function NewLeadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Lead</h1>
        <p className="text-muted-foreground">Add a new lead to your pipeline</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Information</CardTitle>
          <CardDescription>
            Fill out the form below to create a new lead
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeadForm />
        </CardContent>
      </Card>
    </div>
  )
}

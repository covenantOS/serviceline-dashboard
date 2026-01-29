# ServiceLine API Documentation

Complete documentation for the ServiceLine Dashboard API integration.

## Table of Contents

1. [Authentication](#authentication)
2. [Leads API](#leads-api)
3. [Campaigns API](#campaigns-api)
4. [Email Templates API](#email-templates-api)
5. [Analytics API](#analytics-api)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)

## Authentication

All API requests require authentication using an API key.

### Headers

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

### Environment Setup

```env
NEXT_PUBLIC_SERVICELINE_API_URL=https://api.serviceline.com/v1
NEXT_PUBLIC_SERVICELINE_API_KEY=your_api_key_here
```

## Leads API

### Get Leads

Retrieve a paginated list of leads with optional filtering.

**Endpoint:** `GET /leads`

**Query Parameters:**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| page | number | Page number | 1 |
| pageSize | number | Results per page (1-100) | 20 |
| status | string | Comma-separated statuses | all |
| industries | string | Comma-separated industries | all |
| minScore | number | Minimum lead score (0-100) | 0 |
| maxScore | number | Maximum lead score (0-100) | 100 |
| q | string | Search query | - |
| sortBy | string | Field to sort by | dateAdded |
| sortOrder | string | asc or desc | desc |

**Example Request:**

```typescript
import { getLeads } from '@/lib/serviceline/leads';

const response = await getLeads(1, 20, {
  status: ['new', 'contacted'],
  industries: ['Technology', 'Healthcare'],
  scoreRange: [70, 100]
});
```

**Response:**

```json
{
  "items": [
    {
      "id": "lead_123",
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Acme Corp",
      "industry": "Technology",
      "location": "San Francisco",
      "country": "USA",
      "score": 85,
      "scoreBreakdown": {
        "engagement": 90,
        "demographic": 85,
        "behavioral": 80,
        "fit": 85
      },
      "status": "new",
      "dateAdded": "2024-01-15T10:30:00Z"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 150,
  "totalPages": 8,
  "hasNext": true,
  "hasPrevious": false
}
```

### Get Single Lead

**Endpoint:** `GET /leads/{id}`

**Example:**

```typescript
import { getLead } from '@/lib/serviceline/leads';

const lead = await getLead('lead_123');
```

### Create Lead

**Endpoint:** `POST /leads`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "industry": "Technology",
  "location": "San Francisco",
  "country": "USA",
  "phone": "+1-555-0123",
  "jobTitle": "CTO"
}
```

**Example:**

```typescript
import { createLead } from '@/lib/serviceline/leads';

const newLead = await createLead({
  name: "John Doe",
  email: "john@example.com",
  company: "Acme Corp",
  industry: "Technology",
  location: "San Francisco",
  country: "USA"
});
```

### Update Lead

**Endpoint:** `PATCH /leads/{id}`

**Example:**

```typescript
import { updateLead } from '@/lib/serviceline/leads';

const updated = await updateLead('lead_123', {
  status: 'qualified',
  score: 90
});
```

### Delete Lead

**Endpoint:** `DELETE /leads/{id}`

**Example:**

```typescript
import { deleteLead } from '@/lib/serviceline/leads';

await deleteLead('lead_123');
```

### Bulk Actions

**Endpoint:** `POST /leads/bulk-action`

**Request Body:**

```json
{
  "action": "add-to-campaign",
  "leadIds": ["lead_123", "lead_456"],
  "params": {
    "campaignId": "campaign_789"
  }
}
```

**Example:**

```typescript
import { bulkAction } from '@/lib/serviceline/leads';

await bulkAction({
  action: 'add-to-campaign',
  leadIds: ['lead_123', 'lead_456'],
  params: { campaignId: 'campaign_789' }
});
```

### Export Leads

**Endpoint:** `GET /leads/export`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| format | string | csv, xlsx, or json |
| fields | string | Comma-separated field names |
| ...filters | - | Same as Get Leads |

**Example:**

```typescript
import { exportLeads } from '@/lib/serviceline/leads';

const blob = await exportLeads({
  format: 'csv',
  fields: ['name', 'email', 'company', 'score'],
  includeScoreBreakdown: true,
  filters: {
    scoreRange: [80, 100]
  }
});

// Download file
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'leads-export.csv';
a.click();
```

## Campaigns API

### Get Campaigns

**Endpoint:** `GET /campaigns`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number |
| pageSize | number | Results per page |
| status | string | Comma-separated statuses |

**Example:**

```typescript
import { getCampaigns } from '@/lib/serviceline/campaigns';

const response = await getCampaigns(1, 20, ['active', 'scheduled']);
```

### Create Campaign

**Endpoint:** `POST /campaigns`

**Request Body:**

```json
{
  "name": "Q1 2024 Outreach",
  "description": "Quarterly outreach campaign",
  "emailTemplateId": "template_123",
  "targeting": {
    "industries": ["Technology", "Healthcare"],
    "locations": ["San Francisco", "New York"],
    "scoreRange": [70, 100]
  },
  "schedule": {
    "type": "scheduled",
    "startDate": "2024-02-01T09:00:00Z"
  }
}
```

**Example:**

```typescript
import { createCampaign } from '@/lib/serviceline/campaigns';

const campaign = await createCampaign({
  name: "Q1 2024 Outreach",
  emailTemplateId: "template_123",
  targeting: {
    industries: ["Technology"],
    scoreRange: [70, 100]
  },
  schedule: {
    type: "immediate"
  }
});
```

### Launch Campaign

**Endpoint:** `POST /campaigns/{id}/launch`

**Example:**

```typescript
import { launchCampaign } from '@/lib/serviceline/campaigns';

const launched = await launchCampaign('campaign_123');
```

### Pause/Resume Campaign

**Endpoints:** 
- `POST /campaigns/{id}/pause`
- `POST /campaigns/{id}/resume`

**Example:**

```typescript
import { pauseCampaign, resumeCampaign } from '@/lib/serviceline/campaigns';

await pauseCampaign('campaign_123');
// Later...
await resumeCampaign('campaign_123');
```

### Get Campaign Performance

**Endpoint:** `GET /campaigns/{id}/performance`

**Response:**

```json
{
  "sent": 1000,
  "delivered": 980,
  "bounced": 20,
  "opened": 490,
  "clicked": 147,
  "replied": 45,
  "converted": 12,
  "unsubscribed": 5,
  "openRate": 50.0,
  "clickRate": 15.0,
  "conversionRate": 1.2,
  "replyRate": 4.6
}
```

## Email Templates API

### Get Templates

**Endpoint:** `GET /email-templates`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Template category |

**Example:**

```typescript
import { getEmailTemplates } from '@/lib/serviceline/campaigns';

const templates = await getEmailTemplates('outreach');
```

### Create Template

**Endpoint:** `POST /email-templates`

**Request Body:**

```json
{
  "name": "Welcome Email",
  "subject": "Welcome to {{company}}",
  "body": "<html>...</html>",
  "category": "outreach",
  "variables": ["company", "name", "industry"]
}
```

**Example:**

```typescript
import { createEmailTemplate } from '@/lib/serviceline/campaigns';

const template = await createEmailTemplate({
  name: "Welcome Email",
  subject: "Welcome to {{company}}",
  body: "<html><body>Hi {{name}},...</body></html>",
  category: "outreach"
});
```

### Preview Template

**Endpoint:** `POST /email-templates/{id}/preview`

**Request Body:**

```json
{
  "company": "Acme Corp",
  "name": "John",
  "industry": "Technology"
}
```

**Example:**

```typescript
import { previewEmailTemplate } from '@/lib/serviceline/campaigns';

const preview = await previewEmailTemplate('template_123', {
  company: "Acme Corp",
  name: "John"
});
```

## Analytics API

### Get Lead Statistics

**Endpoint:** `GET /leads/stats`

**Response:**

```json
{
  "total": 1500,
  "byStatus": {
    "new": 600,
    "contacted": 400,
    "qualified": 300,
    "converted": 150,
    "lost": 50
  },
  "byIndustry": {
    "Technology": 500,
    "Healthcare": 300,
    "Finance": 200
  },
  "averageScore": 65.5,
  "newThisMonth": 250,
  "conversionRate": 10.0
}
```

### Get Dashboard Metrics

**Endpoint:** `GET /analytics/dashboard`

**Response:**

```json
{
  "totalLeads": 1500,
  "newLeadsThisMonth": 250,
  "leadsGrowthRate": 15.5,
  "averageScore": 65.5,
  "conversionRate": 10.0,
  "totalCampaigns": 25,
  "activeCampaigns": 5
}
```

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional context"
    }
  }
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `UNAUTHORIZED` | Invalid or missing API key | 401 |
| `FORBIDDEN` | Insufficient permissions | 403 |
| `NOT_FOUND` | Resource not found | 404 |
| `VALIDATION_ERROR` | Invalid request data | 400 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `SERVER_ERROR` | Internal server error | 500 |

### Error Handling Example

```typescript
import { APIError } from '@/lib/serviceline/api';

try {
  const leads = await getLeads();
} catch (error) {
  if (error instanceof APIError) {
    console.error(`API Error: ${error.code} - ${error.message}`);
    // Handle specific error codes
    if (error.code === 'UNAUTHORIZED') {
      // Redirect to login or refresh token
    }
  } else {
    console.error('Network error:', error);
  }
}
```

## Rate Limiting

- **Rate Limit:** 60 requests per minute per API key
- **Headers Returned:**
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

### Handling Rate Limits

The API client automatically retries rate-limited requests with exponential backoff.

```typescript
// Automatic retry is built into the API client
const leads = await getLeads(); // Will automatically retry if rate limited
```

## Webhooks (Optional)

Configure webhooks to receive real-time notifications:

**Endpoint:** `POST /webhooks`

**Events:**
- `lead.created`
- `lead.updated`
- `campaign.launched`
- `campaign.completed`

**Webhook Payload:**

```json
{
  "id": "event_123",
  "type": "lead.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    /* Lead or Campaign object */
  }
}
```

---

For more information or support, contact: support@serviceline.com

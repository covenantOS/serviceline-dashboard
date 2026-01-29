'use client';

/**
 * Campaign Creation Form
 * Form for creating and editing email campaigns with targeting options
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Campaign, EmailTemplate, INDUSTRIES } from '@/types/serviceline';
import { createCampaign, validateCampaign } from '@/lib/serviceline/campaigns';

interface CampaignFormProps {
  campaign?: Campaign;
  templates: EmailTemplate[];
  onSuccess?: (campaign: Campaign) => void;
  onCancel?: () => void;
}

export function CampaignForm({ campaign, templates, onSuccess, onCancel }: CampaignFormProps) {
  const [formData, setFormData] = useState<Partial<Campaign>>({
    name: campaign?.name || '',
    description: campaign?.description || '',
    emailTemplateId: campaign?.emailTemplateId || '',
    targeting: {
      industries: campaign?.targeting?.industries || [],
      locations: campaign?.targeting?.locations || [],
      countries: campaign?.targeting?.countries || [],
      scoreRange: campaign?.targeting?.scoreRange || [0, 100],
    },
    schedule: {
      type: campaign?.schedule?.type || 'immediate',
    },
  });

  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    setErrors((prev) => prev.filter((e) => e.field !== field));
  };

  const handleTargetingChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      targeting: {
        ...prev.targeting!,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateCampaign(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const newCampaign = await createCampaign(formData);
      onSuccess?.(newCampaign);
    } catch (error) {
      setErrors([{ field: 'submit', message: 'Failed to create campaign. Please try again.' }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (field: string) => {
    return errors.find((e) => e.field === field)?.message;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{campaign ? 'Edit Campaign' : 'Create New Campaign'}</CardTitle>
        <CardDescription>
          Set up your email campaign with targeting options and schedule
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Q1 2024 Outreach Campaign"
                className={getFieldError('name') ? 'border-red-500' : ''}
              />
              {getFieldError('name') && (
                <p className="text-sm text-red-600">{getFieldError('name')}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Campaign objective and key messages..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Email Template *</Label>
              <Select
                value={formData.emailTemplateId}
                onValueChange={(value) => handleInputChange('emailTemplateId', value)}
              >
                <SelectTrigger className={getFieldError('emailTemplateId') ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} ({template.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getFieldError('emailTemplateId') && (
                <p className="text-sm text-red-600">{getFieldError('emailTemplateId')}</p>
              )}
            </div>
          </div>

          {/* Targeting */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Targeting Criteria</h3>
            
            <div className="space-y-2">
              <Label>Industries</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {INDUSTRIES.map((industry) => (
                  <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.targeting?.industries?.includes(industry)}
                      onChange={(e) => {
                        const current = formData.targeting?.industries || [];
                        const updated = e.target.checked
                          ? [...current, industry]
                          : current.filter((i) => i !== industry);
                        handleTargetingChange('industries', updated);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minScore">Minimum Lead Score</Label>
                <Input
                  id="minScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.targeting?.scoreRange?.[0] || 0}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    const max = formData.targeting?.scoreRange?.[1] || 100;
                    handleTargetingChange('scoreRange', [value, max]);
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxScore">Maximum Lead Score</Label>
                <Input
                  id="maxScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.targeting?.scoreRange?.[1] || 100}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    const min = formData.targeting?.scoreRange?.[0] || 0;
                    handleTargetingChange('scoreRange', [min, value]);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Schedule</h3>
            
            <div className="space-y-2">
              <Label htmlFor="scheduleType">When to send</Label>
              <Select
                value={formData.schedule?.type}
                onValueChange={(value: any) =>
                  setFormData((prev) => ({
                    ...prev,
                    schedule: { ...prev.schedule!, type: value },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Send Immediately</SelectItem>
                  <SelectItem value="scheduled">Schedule for Later</SelectItem>
                  <SelectItem value="recurring">Recurring Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Please fix the following errors:</h4>
              <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Creating...'
                : campaign
                ? 'Update Campaign'
                : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

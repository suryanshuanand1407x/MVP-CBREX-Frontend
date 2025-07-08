import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { X } from 'lucide-react'

const JobForm = ({ job, vendors, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    location: '',
    ctc: '',
    experience: '',
    noticePeriod: '',
    status: 'Open',
    isOnHold: false,
    assignedVendors: []
  })

  useEffect(() => {
    if (job) {
      setFormData(job)
    }
  }, [job])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleVendorToggle = (vendorId) => {
    setFormData(prev => ({
      ...prev,
      assignedVendors: prev.assignedVendors.includes(vendorId)
        ? prev.assignedVendors.filter(id => id !== vendorId)
        : [...prev.assignedVendors, vendorId]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{job ? 'Edit Job Description' : 'Create New Job Description'}</CardTitle>
              <CardDescription>
                Fill in the details for the job posting
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Senior React Developer"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g. Remote, Bangalore"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed job description..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills *</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                placeholder="e.g. React, JavaScript, TypeScript (comma separated)"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ctc">CTC Range *</Label>
                <Input
                  id="ctc"
                  value={formData.ctc}
                  onChange={(e) => setFormData(prev => ({ ...prev, ctc: e.target.value }))}
                  placeholder="e.g. 15-20 LPA"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience *</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g. 3-5 years"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="noticePeriod">Notice Period *</Label>
                <Input
                  id="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={(e) => setFormData(prev => ({ ...prev, noticePeriod: e.target.value }))}
                  placeholder="e.g. 30 days"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Job Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Assign Vendors</Label>
              <div className="space-y-2">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`vendor-${vendor.id}`}
                      checked={formData.assignedVendors.includes(vendor.id)}
                      onCheckedChange={() => handleVendorToggle(vendor.id)}
                    />
                    <Label htmlFor={`vendor-${vendor.id}`} className="text-sm font-normal">
                      {vendor.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isOnHold"
                checked={formData.isOnHold}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isOnHold: checked }))}
              />
              <Label htmlFor="isOnHold" className="text-sm font-normal">
                Put job on hold (hidden from vendors)
              </Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {job ? 'Update Job' : 'Create Job'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default JobForm


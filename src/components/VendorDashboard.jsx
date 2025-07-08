import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Briefcase, MapPin, Clock, DollarSign, UserPlus } from 'lucide-react'
import { useAppContext } from '../context/AppContext.jsx'
import CandidateForm from './CandidateForm.jsx'

const VendorDashboard = ({ user }) => {
  const { getJobsForVendor, addCandidate } = useAppContext()
  const [showCandidateForm, setShowCandidateForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  // Get jobs assigned to Vendor A (assuming vendor user maps to vendor ID 1)
  // In a real app, this would be based on the logged-in vendor's ID
  const vendorId = 1 // This would come from user context in a real app
  const assignedJobs = getJobsForVendor(vendorId)

  const handleSubmitCandidate = (job) => {
    setSelectedJob(job)
    setShowCandidateForm(true)
  }

  const handleCandidateSubmit = (candidateData) => {
    addCandidate(selectedJob.id, candidateData)
    setShowCandidateForm(false)
    setSelectedJob(null)
  }

  const handleCancelSubmission = () => {
    setShowCandidateForm(false)
    setSelectedJob(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Vendor Dashboard</h2>
        <Badge variant="secondary" className="text-sm">
          {assignedJobs.length} Active Jobs
        </Badge>
      </div>

      <div className="grid gap-6">
        {assignedJobs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Jobs Assigned</h3>
              <p className="text-muted-foreground text-center">
                You don't have any active job assignments at the moment.
              </p>
            </CardContent>
          </Card>
        ) : (
          assignedJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <CardDescription className="text-base">
                      {job.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {job.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{job.ctc}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{job.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{job.noticePeriod} notice period</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.split(', ').map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {job.candidates.length} candidate(s) submitted
                  </span>
                  <Button 
                    onClick={() => handleSubmitCandidate(job)}
                    className="flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Submit Candidate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {showCandidateForm && selectedJob && (
        <CandidateForm
          job={selectedJob}
          onSubmit={handleCandidateSubmit}
          onCancel={handleCancelSubmission}
        />
      )}
    </div>
  )
}

export default VendorDashboard


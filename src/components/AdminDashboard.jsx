import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Plus, Briefcase, Users, Edit, Trash2, Pause, Play } from 'lucide-react'
import { useAppContext } from '../context/AppContext.jsx'
import JobForm from './JobForm.jsx'

const AdminDashboard = ({ user }) => {
  const {
    jobs,
    vendors,
    addJob,
    updateJob,
    deleteJob,
    toggleJobHold,
    toggleJobStatus,
    removeCandidate,
    getAllCandidates,
    getVendorNames
  } = useAppContext()

  const [showJobForm, setShowJobForm] = useState(false)
  const [editingJob, setEditingJob] = useState(null)

  const handleCreateJob = () => {
    setEditingJob(null)
    setShowJobForm(true)
  }

  const handleEditJob = (job) => {
    setEditingJob(job)
    setShowJobForm(true)
  }

  const handleSaveJob = (jobData) => {
    if (editingJob) {
      updateJob(editingJob.id, jobData)
    } else {
      addJob(jobData)
    }
    setShowJobForm(false)
    setEditingJob(null)
  }

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(jobId)
    }
  }

  const handleRejectCandidate = (jobId, candidateId) => {
    if (window.confirm('Are you sure you want to reject this candidate?')) {
      removeCandidate(jobId, candidateId)
    }
  }

  const allCandidates = getAllCandidates()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <Button onClick={handleCreateJob} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New JD
        </Button>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Job Descriptions ({jobs.length})
          </TabsTrigger>
          <TabsTrigger value="candidates" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Candidates ({allCandidates.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          {jobs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Job Descriptions</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Create your first job description to start recruiting.
                </p>
                <Button onClick={handleCreateJob}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Job Description
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <Card key={job.id} className={job.isOnHold ? 'opacity-60 border-orange-200' : ''}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 mb-2">
                          {job.title}
                          {job.isOnHold && (
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              On Hold
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {job.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Location:</strong> {job.location}
                      </div>
                      <div>
                        <strong>CTC:</strong> {job.ctc}
                      </div>
                      <div>
                        <strong>Experience:</strong> {job.experience}
                      </div>
                      <div>
                        <strong>Notice Period:</strong> {job.noticePeriod}
                      </div>
                    </div>
                    
                    <div>
                      <strong className="text-sm">Skills:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {job.skills.split(', ').map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm">
                      <strong>Assigned Vendors:</strong> {getVendorNames(job.assignedVendors)}
                    </div>

                    <div className="text-sm">
                      <strong>Candidates Submitted:</strong> {job.candidates.length}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm" onClick={() => handleEditJob(job)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleJobHold(job.id)}
                        className={job.isOnHold ? 'text-green-600' : 'text-orange-600'}
                      >
                        {job.isOnHold ? <Play className="h-4 w-4 mr-1" /> : <Pause className="h-4 w-4 mr-1" />}
                        {job.isOnHold ? 'Resume' : 'Hold'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleJobStatus(job.id)}
                      >
                        {job.status === 'Open' ? 'Close' : 'Open'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="candidates" className="space-y-4">
          {allCandidates.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Candidate Submissions</CardTitle>
                <CardDescription>
                  Review and manage candidate applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No candidates submitted yet.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {allCandidates.map((candidate) => (
                <Card key={`${candidate.jobId}-${candidate.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{candidate.name}</CardTitle>
                        <CardDescription>
                          Applied for: {candidate.jobTitle}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        Job ID: {candidate.jobId}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                      <div><strong>Email:</strong> {candidate.email}</div>
                      <div><strong>Phone:</strong> {candidate.phone}</div>
                      <div><strong>Experience:</strong> {candidate.experience}</div>
                      <div><strong>Current CTC:</strong> {candidate.currentCtc}</div>
                      <div><strong>Expected CTC:</strong> {candidate.expectedCtc}</div>
                      <div><strong>Notice Period:</strong> {candidate.noticePeriod}</div>
                    </div>
                    
                    {candidate.resumeLink && (
                      <div className="mb-4">
                        <strong className="text-sm">Resume:</strong>
                        <a 
                          href={candidate.resumeLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline ml-2"
                        >
                          View Resume
                        </a>
                      </div>
                    )}

                    {candidate.answers && candidate.answers.length > 0 && (
                      <div className="mb-4">
                        <strong className="text-sm">Qualifying Questions:</strong>
                        <div className="mt-2 space-y-1">
                          {candidate.answers.map((answer, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">Q{index + 1}:</span> {answer}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRejectCandidate(candidate.jobId, candidate.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {showJobForm && (
        <JobForm
          job={editingJob}
          vendors={vendors}
          onSave={handleSaveJob}
          onCancel={() => {
            setShowJobForm(false)
            setEditingJob(null)
          }}
        />
      )}
    </div>
  )
}

export default AdminDashboard


import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const CandidateForm = ({ job, onSubmit, onCancel }) => {
  const [step, setStep] = useState(1) // 1: Candidate Info, 2: Qualifying Questions
  const [candidateData, setCandidateData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    experience: '',
    currentCtc: '',
    expectedCtc: '',
    noticePeriod: ''
  })
  const [answers, setAnswers] = useState(['', '', ''])

  // Static qualifying questions
  const questions = [
    'Are you comfortable working in an agile development environment?',
    'Do you have experience with the required technology stack?',
    'Are you available to start within the specified notice period?'
  ]

  const handleCandidateDataChange = (field, value) => {
    setCandidateData(prev => ({ ...prev, [field]: value }))
  }

  const handleAnswerChange = (index, value) => {
    setAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[index] = value
      return newAnswers
    })
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = () => {
    const candidate = {
      ...candidateData,
      answers: answers.filter(answer => answer.trim() !== ''),
      submittedAt: new Date().toISOString(),
      id: Date.now() // Simple ID generation
    }
    onSubmit(candidate)
  }

  const isStep1Valid = () => {
    return candidateData.name && candidateData.email && candidateData.phone && 
           candidateData.experience && candidateData.currentCtc && 
           candidateData.expectedCtc && candidateData.noticePeriod
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>
            Submit Candidate - {job.title}
          </CardTitle>
          <CardDescription>
            Step {step} of 2: {step === 1 ? 'Candidate Information' : 'Qualifying Questions'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={candidateData.name}
                    onChange={(e) => handleCandidateDataChange('name', e.target.value)}
                    placeholder="Enter candidate's full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={candidateData.email}
                    onChange={(e) => handleCandidateDataChange('email', e.target.value)}
                    placeholder="candidate@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={candidateData.phone}
                    onChange={(e) => handleCandidateDataChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Total Experience *</Label>
                  <Input
                    id="experience"
                    value={candidateData.experience}
                    onChange={(e) => handleCandidateDataChange('experience', e.target.value)}
                    placeholder="e.g. 3.5 years"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resumeLink">Resume Link</Label>
                <Input
                  id="resumeLink"
                  value={candidateData.resumeLink}
                  onChange={(e) => handleCandidateDataChange('resumeLink', e.target.value)}
                  placeholder="https://drive.google.com/... or LinkedIn profile"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentCtc">Current CTC *</Label>
                  <Input
                    id="currentCtc"
                    value={candidateData.currentCtc}
                    onChange={(e) => handleCandidateDataChange('currentCtc', e.target.value)}
                    placeholder="e.g. 12 LPA"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedCtc">Expected CTC *</Label>
                  <Input
                    id="expectedCtc"
                    value={candidateData.expectedCtc}
                    onChange={(e) => handleCandidateDataChange('expectedCtc', e.target.value)}
                    placeholder="e.g. 18 LPA"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noticePeriod">Notice Period *</Label>
                  <Input
                    id="noticePeriod"
                    value={candidateData.noticePeriod}
                    onChange={(e) => handleCandidateDataChange('noticePeriod', e.target.value)}
                    placeholder="e.g. 30 days"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleNext} 
                  disabled={!isStep1Valid()}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  Next: Qualifying Questions
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`question-${index}`} className="text-base font-medium">
                      {index + 1}. {question}
                    </Label>
                    <Input
                      id={`question-${index}`}
                      value={answers[index]}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      placeholder="Your answer..."
                    />
                  </div>
                ))}
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Candidate Summary:</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Name:</strong> {candidateData.name}</p>
                  <p><strong>Email:</strong> {candidateData.email}</p>
                  <p><strong>Experience:</strong> {candidateData.experience}</p>
                  <p><strong>Expected CTC:</strong> {candidateData.expectedCtc}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="flex-1"
                >
                  Submit Candidate
                </Button>
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CandidateForm


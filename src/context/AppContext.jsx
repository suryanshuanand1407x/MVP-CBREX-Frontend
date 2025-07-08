import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  // Vendors list as per requirements
  const vendors = [
    { id: 1, name: 'Vendor A' },
    { id: 2, name: 'Vendor B' }
  ]

  // Initial job data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      description: 'Looking for an experienced React developer with strong skills in modern React, TypeScript, and state management. The ideal candidate should have experience with large-scale applications and be comfortable working in an agile environment.',
      skills: 'React, JavaScript, TypeScript, Redux, Node.js',
      location: 'Remote',
      ctc: '15-20 LPA',
      experience: '3-5 years',
      noticePeriod: '30 days',
      status: 'Open',
      isOnHold: false,
      assignedVendors: [1],
      candidates: []
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      description: 'We are seeking a talented Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.',
      skills: 'React, Node.js, MongoDB, Express.js, AWS',
      location: 'Bangalore',
      ctc: '12-18 LPA',
      experience: '2-4 years',
      noticePeriod: '45 days',
      status: 'Open',
      isOnHold: false,
      assignedVendors: [1, 2],
      candidates: []
    }
  ])

  const [nextJobId, setNextJobId] = useState(3)

  // Job management functions
  const addJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: nextJobId,
      candidates: []
    }
    setJobs(prev => [...prev, newJob])
    setNextJobId(prev => prev + 1)
    return newJob
  }

  const updateJob = (jobId, jobData) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...jobData, id: jobId, candidates: job.candidates } : job
    ))
  }

  const deleteJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId))
  }

  const toggleJobHold = (jobId) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, isOnHold: !job.isOnHold } : job
    ))
  }

  const toggleJobStatus = (jobId) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: job.status === 'Open' ? 'Closed' : 'Open' } : job
    ))
  }

  // Candidate management functions
  const addCandidate = (jobId, candidateData) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, candidates: [...job.candidates, candidateData] }
        : job
    ))
  }

  const removeCandidate = (jobId, candidateId) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, candidates: job.candidates.filter(c => c.id !== candidateId) }
        : job
    ))
  }

  // Helper functions
  const getJobsForVendor = (vendorId) => {
    return jobs.filter(job => 
      job.status === 'Open' && 
      !job.isOnHold && 
      job.assignedVendors.includes(vendorId)
    )
  }

  const getAllCandidates = () => {
    return jobs.flatMap(job => 
      job.candidates.map(candidate => ({
        ...candidate,
        jobTitle: job.title,
        jobId: job.id
      }))
    )
  }

  const getVendorNames = (vendorIds) => {
    return vendorIds.map(id => vendors.find(v => v.id === id)?.name).filter(Boolean).join(', ') || 'None'
  }

  const value = {
    // Data
    jobs,
    vendors,
    
    // Job management
    addJob,
    updateJob,
    deleteJob,
    toggleJobHold,
    toggleJobStatus,
    
    // Candidate management
    addCandidate,
    removeCandidate,
    
    // Helper functions
    getJobsForVendor,
    getAllCandidates,
    getVendorNames
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext


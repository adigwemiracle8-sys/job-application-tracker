import { useEffect, useState } from 'react'
import JobCard from './JobCard'

function Dashboard() {
  const API_URL = import.meta.env.VITE_API_URL
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingJob, setEditingJob] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [status, setStatus] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Load jobs from the API
  function loadJobs() {
  fetch(`${API_URL}/api/jobs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load jobs')
        }

        return response.json()
      })
      .then((data) => {
        setJobs(data)
        setError('')
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }

  // Load jobs when the component first appears
  useEffect(() => {
    loadJobs()
  }, [])

  // Add or edit a job
  function handleSubmit(e) {
    e.preventDefault()

    if (!company.trim()) {
      setFormError('Company is required')
      return
    }

    if (!position.trim()) {
      setFormError('Position is required')
      return
    }

    if (!location.trim()) {
      setFormError('Location is required')
      return
    }

    if (!status.trim()) {
      setFormError('Status is required')
      return
    }

    setFormError('')
    setError('')
    
    // Edit existing job
    if (editingJob) {
      const updatedJob = {
        company,
        position,
        location,
        status
      }

      fetch(`${API_URL}/api/jobs/${editingJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJob)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update job')
          }

          return response.json()
        })
        .then(() => {
          loadJobs()
        })
        .catch((error) => {
          setError(error.message)
        })

      setShowForm(false)
      setEditingJob(null)
      setCompany('')
      setPosition('')
      setStatus('')
      setLocation('')

      return
    }

    // Add new job
    const newJob = {
      company,
      position,
      location,
      status
    }

    fetch(`${API_URL}/api/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create job')
        }

        return response.json()
      })
      .then(() => {
        loadJobs()
      })
      .catch((error) => {
        setError(error.message)
      })

    setShowForm(false)
    setCompany('')
    setPosition('')
    setStatus('')
    setLocation('')
  }

  // Edit a job
  function handleEdit(job) {
    setEditingJob(job)
    setShowForm(true)
    setError('')
    setFormError('')
    setCompany(job.company)
    setPosition(job.position)
    setStatus(job.status)
    setLocation(job.location)
  }

  // Delete a job
  function handleDelete(job) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    )

    if (!confirmed) {
      return
    }

    setError('')

    fetch(`${API_URL}/api/jobs/${job.id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete job')
        }

        return response.json()
      })
      .then(() => {
        loadJobs()
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  // Clear search and status filters
  function handleClearFilters() {
    setSearchTerm('')
    setStatusFilter('All')
  }

  // Filter jobs
  const filteredJobs = jobs.filter((job) =>
    (
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.location || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (
      statusFilter === 'All' ||
      job.status === statusFilter
    )
  )

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <div className="header-text">
          <h1>Job Application Tracker</h1>
          <p>Track and manage your job applications.</p>
        </div>

        <button
          onClick={() => {
            setShowForm(true)
            setError('')
            setFormError('')
            setEditingJob(null)
            setCompany('')
            setPosition('')
            setStatus('')
            setLocation('')
          }}
        >
          Add Job
        </button>
      </header>

      {/* API error message */}
      {error && <p className="api-error">{error}</p>}

      {showForm && (
        <div className="job-form">

          <h2 className="form-title">
            {editingJob ? 'Edit Job Application' : 'Add Job Application'}
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Form validation message */}

            <label>
              Company
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </label>
            {formError === 'Company is required' && (
            <p>Company is required</p>
                 )}

            <label>
              Position
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </label>
            {formError === 'Position is required' && (
          <p>Position is required</p>
        )}

            <label>
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </label>
            {formError === 'Status is required' && (
          <p>Status is required</p>
               )}

            <label>
              Location
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            {formError === 'Location is required' && (
            <p>Location is required</p>
                )}

            <button className="submit-button" type="submit">
              {editingJob ? 'Save Changes' : 'Add Job'}
            </button>

            <button
              className="cancel-button"
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingJob(null)
                setFormError('')
                setCompany('')
                setPosition('')
                setStatus('')
                setLocation('')
              }}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

      <section>
        <h2>Application Summary</h2>

        <div className="summary-cards">

          <div>
            <h3>{jobs.length}</h3>
            <p>Total Applications</p>
          </div>

          <div>
            <h3>
              {jobs.filter((job) => job.status === 'Applied').length}
            </h3>
            <p>Applied</p>
          </div>

          <div>
            <h3>
              {jobs.filter((job) => job.status === 'Interview').length}
            </h3>
            <p>Interviews</p>
          </div>

          <div>
            <h3>
              {jobs.filter((job) => job.status === 'Offer').length}
            </h3>
            <p>Offers</p>
          </div>

          <div>
            <h3>
              {jobs.filter((job) => job.status === 'Rejected').length}
            </h3>
            <p>Rejected</p>
          </div>

        </div>
      </section>

      <section>
        <h2 className="section-title">Job Applications</h2>

        <div className="search-filter">

          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          {(searchTerm !== '' || statusFilter !== 'All') && (
            <button
              className="clear-filters-button"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}

        </div>

        {loading ? (
          <p className="empty-state">
            Loading applications...
          </p>
        ) : filteredJobs.length === 0 ? (
          <p className="empty-state">
            No applications found. Try changing your search or filter.
          </p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}

      </section>

    </div>
  )
}

export default Dashboard
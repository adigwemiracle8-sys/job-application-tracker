function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="job-card">
      <div className="job-info">
        <h3>{job.position}</h3>
        <p className="job-company">{job.company}</p>
        <p className="job-location">{job.location}</p>
      </div>

      <div className="job-status-container">
        <p className={`job-status ${job.status.toLowerCase()}`}>
  {job.status}
</p>
      </div>

      <div className="job-actions">
        <button
          className="edit-button"
          onClick={() => onEdit(job)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(job)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default JobCard
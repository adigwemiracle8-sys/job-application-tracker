# Job Application Tracker — Backend

A REST API built with Python, Flask, and SQLite for managing job applications.

## Features

- Retrieve all job applications
- Retrieve a single job application
- Create a new job application
- Update an existing job application
- Delete a job application
- Store application data in an SQLite database

## Technologies

- Python
- Flask
- Flask-CORS
- SQLite
- Gunicorn for production deployment

## Local Setup

1. Create and activate a Python virtual environment.
2. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask application:

   ```bash
   python app.py
   ```

4. The API will be available at `http://127.0.0.1:5000`.

## API Endpoints

| Method | Endpoint         | Purpose           |
| ------ | ---------------- | ----------------- |
| GET    | `/`              | Check the API     |
| GET    | `/api/jobs`      | Retrieve all jobs |
| GET    | `/api/jobs/<id>` | Retrieve one job  |
| POST   | `/api/jobs`      | Create a job      |
| PUT    | `/api/jobs/<id>` | Update a job      |
| DELETE | `/api/jobs/<id>` | Delete a job      |

## Database

Application records are stored in an SQLite database named `job_tracker.db`.

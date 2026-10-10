# Job Application Tracker

A React web application for managing job applications, tracking application statuses, and keeping job-search information organized.

## Features

- View job applications
- Add new job applications
- Edit existing applications
- Delete applications
- Search applications by company, position, location, or status
- Filter applications by status
- View application summary counts
- Store application data using a Flask REST API and SQLite database
- Display loading states and error messages

## Technologies

- React
- JavaScript
- Vite
- HTML and CSS
- Python and Flask REST API
- SQLite
- Git and GitHub

## Project Structure

```text
application-tracker/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
└── job-application-tracker/
    ├── src/
    ├── public/
    ├── package.json
    └── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Install frontend dependencies

```bash
cd job-application-tracker
npm install
```

### 3. Configure the API URL

Create a `.env` file in the frontend project folder:

```text
VITE_API_URL=http://127.0.0.1:5000
```

### 4. Start the frontend

```bash
npm run dev
```

The development server will display the local URL where you can open the application.

### 5. Start the backend

Follow the setup instructions in the backend README to install Python dependencies and start the Flask API.

**Note:** The frontend requires the backend API to be running to retrieve and manage job applications.

## Future Improvements

- User authentication
- Individual accounts for job seekers
- Deployment with persistent database storage

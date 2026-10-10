# Job Application Tracker

A full-stack web application that helps users organize and manage their job applications in one place.

The project demonstrates my skills in frontend development, backend development, REST API integration, and database management.

## Features

- Add new job applications
- View all saved applications
- Edit existing application details
- Delete applications
- Search applications
- Filter applications by status
- View application summary statistics
- Store application data in an SQLite database
- Handle loading states and API errors

## Technologies Used

**Frontend**

- React
- JavaScript
- HTML
- CSS
- Vite

**Backend**

- Python
- Flask
- Flask-CORS
- REST API

**Database**

- SQLite

**Tools**

- Git
- GitHub
- npm

## Project Structure

```text
application-tracker/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── README.md
│   └── job_tracker.db
├── job-application-tracker/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
```

Note: The SQLite database file is created locally and is excluded from version control.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/adigwemiracle8-sys/job-application-tracker.git
cd job-application-tracker
```

### 2. Set up the backend

Open a terminal in the `backend` folder and install the dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask API:

```bash
python app.py
```

The backend runs at `http://127.0.0.1:5000`.

### 3. Set up the frontend

Open a second terminal in the `job-application-tracker` folder and install the dependencies:

```bash
npm install
```

Create a `.env` file in that folder containing:

```text
VITE_API_URL=http://127.0.0.1:5000
```

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## What I Learned

Through this project, I practised building React components, managing application state, working with forms, connecting a frontend to a Flask REST API, implementing CRUD operations, and storing data in an SQLite database.

## Future Improvements

- User authentication and individual user accounts
- Improved form validation and user experience
- Deployment so the application can be accessed online

## Author

**Miracle Adigwe**

GitHub: [@adigwemiracle8-sys](https://github.com/adigwemiracle8-sys)

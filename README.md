# Todo Management Application

A modern, production-ready Todo Management Application with full CRUD functionality, real-time search, filtering, and PDF report generation.

## Tech Stack

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling and responsive design
- **Axios** - HTTP client
- **React Icons** - Icon library
- **jsPDF** - PDF generation
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

---

## Features

- **Create Task** - Add new tasks with title and description
- **View Tasks** - Modern card layout with status badges
- **Update Task** - Edit title and description
- **Delete Task** - Remove tasks with confirmation
- **Mark as Completed** - One-click completion with automatic date
- **Search** - Real-time search by title
- **Filter** - Filter by All, Pending, or Completed
- **PDF Report** - Generate reports for tasks within a date range

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### 1. Navigate to project root

```bash
cd TODOLIST
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

---

## Running the Application

### Backend

```bash
cd backend
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The API runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm run dev
```

The app runs on `http://localhost:3000`

**Note:** Ensure MongoDB is running before starting the backend.

---

## How to Generate PDF Report

1. Select a **Start Date** using the date picker
2. Select an **End Date** using the date picker
3. Click **"Generate PDF Report"**
4. The PDF will download automatically with the filename `todo-report.pdf`

The report includes only tasks **created** within the selected date range, with:
- Task Title
- Description
- Created Date
- Completion Status
- Completed Date

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| PATCH | `/tasks/:id/complete` | Mark task as completed |
| GET | `/tasks/report?startDate=&endDate=` | Get tasks for PDF report |

---

## Project Structure

```
todo-app/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       ├── services/    # API services
│       └── utils/       # Helper functions
└── README.md
```

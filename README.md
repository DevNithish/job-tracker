# MERN Stack - Job Application Tracker

This is a full-stack MERN (MongoDB, Express, React, Node.js) application built for the Gidy software developer assessment. It allows a user to create, read, update, and delete their job applications through a clean, multi-page interface.

## Features

- **Create Application:** Add a new job application via a dedicated form with frontend and backend validation.
- **View All Applications:** See a list of all submitted applications on the homepage.
- **View Single Application:** Click on any application to navigate to a dedicated page with its full details.
- **Update Application:** Edit the details of any existing application using the same form.
- **Delete Application:** Remove an application after a confirmation prompt.

## Tech Stack

- **Frontend:** React (with functional components and hooks)
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose

---

## How to Run Locally

Follow these steps to run the project on your local machine.

### Prerequisites

- Node.js (v18 or later)
- **MongoDB:** You need access to a MongoDB database. You can use:
  - A free **MongoDB Atlas** cloud account (Recommended).
  - A local **MongoDB Server** instance running on your machine.

### 1. Clone the Repository

- bash
- git clone https://github.com/DevNithish/job-tracker.git
- cd job-tracker

### 2. Backend Setup

- Navigate to the backend folder : Bash cd backend
- Install dependencies:
  - Bash npm install
- Create a .env file in the backend folder (/backend/.env).
- Choose one of the options below and add the corresponding connection string to your .env file.
  - **Option 1: MongoDB Atlas**
    - Create a free account at mongodb Atlas.
    - Create a new project and a free M0 cluster.
    - In "Network Access," add 0.0.0.0/0 (Allow Access From Anywhere) so your local machine and deployed server can connect.
    - In "Database Access," create a database user (e.g., myUser / myPassword123).
    - Go to your cluster, click "Connect," select "Connect your application," and copy the connection string.
    - Paste it into your .env file, replacing <username>, <password>, and your cluster info.Code snippet# /backend/.env
      MONGODB_URI=mongodb+srv://<your-atlas-username>:<your-atlas-password>@mycluster.xxxxx mongodb.net/job-tracker?retryWrites=true&w=majority
      (Note: job-tracker is the database name; it will be created automatically.)
  - **Option 2: Local MongoDB Server**
    - Use this if you have MongoDB Community Server installed and running locally.
    - In /backend/.env set the uri as _MONGODB_URI=mongodb://localhost:27017/job-tracker_
    - (This connects to your local MongoDB on the default port 27017 and uses a database named job-tracker.)
    - Start the backend server: Bash npm start
    - The server will be running on http://localhost:5001.

### 3. Frontend Setup

- Open a new terminal and navigate to the frontend folder: Bash cd frontend
- Install dependencies : Bash npm install
- Start the frontend development server: Bash npm run dev
- The application will open and run on http://localhost:5173 (or the port shown in your terminal).

## API Endpoints

- POST - /api/applications - Creates a new job application.
- GET - /api/applications - Retrieves a list of all job applications.
- GET - /api/applications/:id - Retrieves a single job application by its ID.
- PUT - /api/applications/:id - Updates an existing job application by its ID.
- DELETE - /api/applications/:id - Deletes a job application by its ID.

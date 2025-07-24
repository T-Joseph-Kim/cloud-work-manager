# Cloud Work Manager

A modern, cloud-based task management application built with React that helps teams organize, assign, and track work efficiently. The application provides a clean, intuitive interface for managing tasks, team members, and project workflows.

## Features

### Task Management
- **Create Tasks**: Add new tasks with detailed descriptions, due dates, and assignees
- **Edit Tasks**: Modify existing tasks with real-time updates
- **Delete Tasks**: Remove completed or obsolete tasks
- **Task Assignment**: Assign tasks to specific team members
- **Status Tracking**: Track task progress and completion status
- **Date Management**: Set and monitor due dates with visual status indicators

### User Management
- **Secure Authentication**: Employee ID-based login system
- **User Profiles**: View and manage user profile information
- **Team Member Directory**: Access to team member information

### User Interface
- **Modern Material-UI Design**: Clean, responsive interface with Material Design components
- **Real-time Updates**: Instant feedback and state updates using Redux
- **Mobile Responsive**: Optimized for desktop and mobile devices
- **Loading States**: Smooth transitions and loading indicators
- **Error Handling**: User-friendly error messages and validation

## Tech Stack

- **Frontend**: React 19.1.0
- **State Management**: Redux Toolkit with Redux Thunk
- **UI Framework**: Material-UI (MUI) 7.1.1
- **Routing**: React Router DOM 5.3.4
- **HTTP Client**: Axios 1.9.0
- **Animations**: Framer Motion 12.18.1
- **Testing**: React Testing Library, Jest

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cloud-work-manager.git
   cd cloud-work-manager
   ```

2. **Navigate to the client directory**
   ```bash
   cd client
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
   
   Edit the `.env` file with your actual values:
   ```bash
   REACT_APP_BUCKET_URL=your-bucket-url-here
   REACT_APP_TASKS_API_URL=your-tasks-api-url-here
   ```

## Environment Variables

The application requires the following environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_BUCKET_URL` | URL to your cloud storage bucket containing user data | `https://your-bucket.s3.amazonaws.com` |
| `REACT_APP_TASKS_API_URL` | Base URL for your tasks API endpoint | `https://api.yourapp.com/v1` |

### Setting Up Environment Variables

1. **For Development**: Create a `.env` file in the `client` directory
2. **For Production**: Set these variables in your deployment environment (Vercel, Netlify, etc.)

### Cloud Storage Setup

The application expects a `users.json` and `members.json` file in your cloud storage bucket with the following structure:
```json
{
  "employee123": {
    "password": "userpassword",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@company.com"
  }
}
```

### API Endpoints

Your tasks API should support the following endpoints:
- `GET /tasks` - Fetch all tasks
- `GET /tasks/:id` - Fetch a specific task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `POST /tasks` - Create a new task

## Running the Application

1. **Development Mode**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

### Logging In
1. Navigate to the application URL
2. Enter your employee ID and password
3. Click "Login" to access the dashboard

### Managing Tasks
1. **View Tasks**: Your assigned tasks appear on the main dashboard
2. **Add Task**: Click the "+" button to create a new task
3. **Edit Task**: Click on any task card to edit its details
4. **Delete Task**: Use the delete option within task details

### Profile Management
1. Click on your profile icon in the header
2. View and update your profile information

## Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── app/            # Redux store configuration
│   ├── components/     # Reusable UI components
│   │   ├── Header.js
│   │   ├── LoadingScreen.js
│   │   ├── Login/      # Authentication components
│   │   └── Tasks/      # Task-related components
│   ├── features/       # Redux slices
│   │   ├── auth/       # Authentication state
│   │   ├── members/    # Team members state
│   │   ├── profile/    # User profile state
│   │   └── tasks/      # Tasks state
│   ├── pages/          # Main application pages
│   ├── App.js          # Main application component
│   └── index.js        # Application entry point
└── package.json        # Dependencies and scripts
```


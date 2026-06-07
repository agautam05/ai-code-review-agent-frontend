# AI Code Review Agent Frontend

## Overview

AI Code Review Agent is a web application that helps developers improve code quality through AI-powered code analysis. Users can submit code snippets and receive detailed feedback, issue detection, quality scores, improvement suggestions, and personalized recommendations based on previous reviews.

This repository contains the frontend application built with React and Vite.

## Features

- User Authentication (Login & Registration)
- AI-Powered Code Review Interface
- Code Quality Score Visualization
- Security & Performance Issue Display
- Personalized Recommendations
- Review History Tracking
- Recurring Issue Analysis
- Dashboard Analytics
- PDF Report Export
- Responsive User Interface

## Tech Stack

- React.js
- Vite
- Axios
- React Router
- Chart.js
- CSS

## Screenshots

### Login Page
(Add Screenshot)

### Dashboard
(Add Screenshot)

### Code Review Result
(Add Screenshot)

### Recurring Issues Analysis
(Add Screenshot)

### Personalized Recommendations
(Add Screenshot)

## Project Structure

```text
src
├── api
├── assets
├── components
├── pages
├── utils
├── App.jsx
├── main.jsx
└── index.css
```

## Key Pages

### Dashboard
Provides insights into previous reviews, issue trends, and recommendations.

### Code Review
Allows users to submit source code and receive AI-generated feedback.

### History
Displays previously generated code reviews.

### Admin Dashboard
Provides analytics and user management features.

## How It Works

1. User submits code through the interface.
2. Frontend sends the request to the Spring Boot backend.
3. Backend processes the code using AI.
4. Results are displayed with:
   - Score
   - Issues
   - Suggestions
   - Improved Code
5. Historical reviews are used to generate personalized recommendations.

## Backend Repository

Backend:
https://github.com/agautam05/ai-code-review-agent

## Future Improvements

- GitHub Integration
- Pull Request Reviews
- Team Collaboration
- Real-time Review Suggestions
- Advanced Analytics

## Author

Aman Gautam

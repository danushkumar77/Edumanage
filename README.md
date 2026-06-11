# EduManage – College Management System

EduManage is a full-stack College Management System developed to manage and simplify academic and administrative activities in a college. The project is designed for three main users: Admin, Faculty, and Student. Each user has a separate dashboard and features based on their role.

The main purpose of this project is to reduce manual work in college management. Instead of maintaining student details, attendance, faculty records, courses, and notices manually, EduManage stores and manages everything digitally.

## Project Overview

EduManage provides a complete online platform where students can access their academic information, faculty members can manage student-related activities, and administrators can control the overall system.

The system includes public pages such as Home, About Us, Contact Us, FAQ, Privacy Policy, and Terms & Conditions. It also includes authentication pages like Login, Signup, and Forgot Password. After login, users are redirected to their respective dashboards based on their role.

## Frontend Details

The frontend is the user-facing part of the application. It is developed using React.js with Vite. It provides a clean, modern, and responsive interface for users.

The frontend is responsible for displaying pages, collecting user inputs, sending requests to the backend, and showing data received from the database.

### Frontend Technologies Used

* React.js
* Vite
* JavaScript
* HTML
* CSS
* React Router
* Fetch API

### Frontend Pages

The frontend contains the following pages:

Home Page:
The Home page gives an introduction to the EduManage system. It explains the purpose of the project and highlights the main features of the platform.

About Us Page:
The About page explains the goal of the project and how the system helps colleges manage their work digitally.

Contact Us Page:
The Contact page allows users to submit queries or feedback.

FAQ Page:
The FAQ page answers common questions about the system.

Privacy Policy Page:
This page explains how user data is handled and protected.

Terms and Conditions Page:
This page explains the basic rules and conditions for using the system.

Login Page:
The Login page allows Admin, Faculty, and Students to log in using their credentials. Based on the selected role, the user is redirected to the correct dashboard.

Signup Page:
The Signup page allows new users to register.

Forgot Password Page:
This page helps users recover or reset their login access.

Admin Dashboard:
The Admin Dashboard is the main control panel of the system. The admin can manage students, faculty, departments, courses, and notices.

Faculty Dashboard:
The Faculty Dashboard allows teachers to view students, manage attendance, update marks, and post announcements.

Student Dashboard:
The Student Dashboard allows students to view their profile, attendance, grades, assignments, notices, and course details.

## Backend Details

The backend is the server-side part of the project. It is developed using Node.js and Express.js. The backend receives requests from the frontend, processes the data, communicates with the database, and sends responses back to the frontend.

The backend helps the system work dynamically by storing and retrieving data from MongoDB Atlas.

### Backend Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* CORS
* dotenv

### Backend Responsibilities

The backend handles:

* User login
* User signup
* Student data management
* Faculty data management
* Department management
* Course management
* Notice management
* Admission application submission
* Data storage and retrieval
* Communication between frontend and database

## Database Details

MongoDB Atlas is used as the cloud database for this project. It stores all important information permanently.

The database stores:

* Student records
* Faculty records
* Department details
* Course details
* Attendance information
* Notices and announcements
* Admission application details
* Login credentials

Mongoose is used to create schemas and manage database operations in a structured way.

## Project Architecture

The project follows a full-stack architecture:

Frontend:
The frontend is built using React and hosted on Vercel. It displays the user interface and sends API requests to the backend.

Backend:
The backend is built using Node.js and Express.js and hosted on Render. It handles API requests and connects with the database.

Database:
MongoDB Atlas is used to store all project data in the cloud.

The data flow is:

User interacts with Frontend
Frontend sends API request to Backend
Backend processes request
Backend communicates with MongoDB Atlas
Database sends data back to Backend
Backend sends response to Frontend
Frontend displays the result to the user

## Deployment Details

Frontend Deployment:
The frontend is deployed on Vercel. Whenever changes are pushed to the GitHub frontend repository, Vercel automatically redeploys the project.

Frontend Repository:
https://github.com/danushkumar77/Edumanage.git

Frontend Live URL:
https://edumanage-fawn.vercel.app

Backend Deployment:
The backend is deployed on Render. It runs the Express server and handles API requests.

Backend Repository:
https://github.com/danushkumar77/Edumanage-Backend.git

Backend Live URL:
https://edumanage-backend-5y5v.onrender.com

Database:
MongoDB Atlas is used as the online database.

## Main Features

* Role-based login system
* Student dashboard
* Faculty dashboard
* Admin dashboard
* Student registration
* Faculty registration
* Department management
* Course management
* Attendance management
* Notice and announcement system
* Admission application system
* Profile management
* Responsive design
* Backend API integration
* MongoDB cloud database connection

## Admin Features

The admin can:

* Add students
* Edit student details
* Delete students
* Add faculty members
* Edit faculty details
* Delete faculty members
* Add departments
* Remove departments
* Add courses
* Remove courses
* Post notices
* Delete notices
* View activity logs
* Manage college data from one dashboard

## Faculty Features

Faculty members can:

* Log in to the faculty dashboard
* View student details
* Manage attendance
* Update student marks
* Post important announcements
* Monitor student academic details

## Student Features

Students can:

* Log in to the student dashboard
* View personal profile
* Check attendance
* View courses
* Check grades
* View assignments
* Submit application details
* Read notices and announcements

## API Integration

The frontend communicates with the backend using API requests. The API base URL is connected to the Render backend.

Example API URL:

https://edumanage-backend-5y5v.onrender.com/api

The frontend sends requests such as:

* Fetch students
* Fetch faculty
* Fetch departments
* Fetch courses
* Fetch notices
* Submit login data
* Submit signup data
* Submit application form
* Add or delete records

## Why This Project Is Useful

EduManage is useful because it brings important college activities into a single digital platform. It saves time, reduces paperwork, improves data management, and makes it easier for students, faculty, and administrators to access information.

This project also demonstrates practical knowledge of full-stack development, frontend design, backend API creation, database integration, deployment, and GitHub version control.

## Conclusion

EduManage is a complete full-stack web application created to manage college operations digitally. The frontend provides a smooth and responsive user experience, while the backend handles data processing and database communication. With Vercel, Render, and MongoDB Atlas, the project is fully deployed and accessible online.

This project shows the use of modern web development technologies and provides a practical solution for college management.

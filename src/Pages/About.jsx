import React from 'react';
import Navbar from '../Compound/Navbar';
import Footer from '../Compound/Footer';
import { useAppState } from '../Compound/StateContext';
import '../Asset/CSS/style.css';

export default function About() {
  const { appState } = useAppState();

  const studentsCount = appState?.allStudents?.length || 1200;
  const facultyCount = appState?.faculties?.length || 80;
  const deptsCount = appState?.departments?.length || 4;
  const coursesCount = appState?.allCourses?.length || 25;

  return (
    <>
      <Navbar />

      <div className="about-page-hero">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-10 mx-auto text-center">
              <div>
                <h1 style={{ 
                  color: '#ffffff', 
                  fontWeight: 'bold', 
                  margin: '0 0 15px 0', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1.5px', 
                  fontSize: '44px'
                }}>
                  About Us
                </h1>
                <p style={{ 
                  fontSize: '16px', 
                  lineHeight: '1.8', 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  margin: '0 auto',
                  maxWidth: '800px',
                  fontWeight: '400'
                }}>
                  The College Management System is a web-based platform developed to
                  automate and simplify academic and administrative activities. It helps
                  to manage students, faculty, attendance, exams, courses and
                  communication in one centralized system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blue-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="about-card">
                <h3>Our Mission</h3>
                <p>
                  To digitalize college management and reduce manual work,
                  paperwork and time-consuming processes.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="about-card">
                <h3>Our Vision</h3>
                <p>
                  To provide a smart, secure and user-friendly system for better
                  educational management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="section-title">Main Features</h2>
        <div className="row">
          <div className="col-12 col-md-3 mb-4">
            <div className="about-card text-center">
              <div className="icon">🎓</div>
              <h5>Student Management</h5>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="about-card text-center">
              <div className="icon">👨‍🏫</div>
              <h5>Faculty Management</h5>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="about-card text-center">
              <div className="icon">📅</div>
              <h5>Attendance Tracking</h5>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="about-card text-center">
              <div className="icon">📊</div>
              <h5>Result Management</h5>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="about-card text-center">
              <div className="icon">📚</div>
              <h5>Course Management</h5>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="about-card text-center">
              <div className="icon">🕒</div>
              <h5>Timetable Scheduling</h5>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="about-card text-center">
              <div className="icon">🔔</div>
              <h5>Notifications</h5>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="about-card text-center">
              <div className="icon">🔐</div>
              <h5>Secure Authentication</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="blue-section">
        <div className="container">
          <h2 className="section-title">User Roles</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="about-card">
                <h4>Students</h4>
                <p>
                  Students can view attendance, results, course details, timetable
                  and notifications.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="about-card">
                <h4>Faculty</h4>
                <p>
                  Faculty can manage attendance, upload marks, view students and
                  share announcements.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="about-card">
                <h4>Administrators</h4>
                <p>
                  Admins can manage students, faculty, courses, departments,
                  reports and system data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blue-section" style={{ borderTop: '1px solid #ddd' }}>
        <div className="container">
          <h2 className="section-title">System Statistics</h2>
          <div className="row text-center">
            <div className="col-6 col-md-3 stat">
              <h1>{studentsCount}+</h1>
              <p>Total Students</p>
            </div>
            <div className="col-6 col-md-3 stat">
              <h1>{facultyCount}+</h1>
              <p>Faculty Members</p>
            </div>
            <div className="col-6 col-md-3 stat">
              <h1>{coursesCount}+</h1>
              <p>Courses</p>
            </div>
            <div className="col-6 col-md-3 stat">
              <h1>{deptsCount}+</h1>
              <p>Departments</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

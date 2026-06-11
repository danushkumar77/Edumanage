import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Compound/Navbar';
import Footer from '../Compound/Footer';
import { useAppState } from '../Compound/StateContext';
import '../Asset/CSS/style.css';
import homeBenefitsImg from '../Asset/Images/home_benefits.png';

export default function Home() {
  const { appState } = useAppState();

  const studentsCount = appState?.allStudents?.length || 1200;
  const facultyCount = appState?.faculties?.length || 80;
  const deptsCount = appState?.departments?.length || 4;
  const coursesCount = appState?.allCourses?.length || 25;

  return (
    <>
      <Navbar />

      <section className="hero-modern">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-8 mx-auto text-center">
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.85)', 
                backdropFilter: 'blur(12px)', 
                padding: '40px', 
                borderRadius: '24px', 
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}>
                <p className="small-title" style={{ marginBottom: '10px' }}>SMART EDUCATION MANAGEMENT</p>
                <h1 className="main-heading" style={{ fontSize: '48px', lineHeight: '58px', marginBottom: '20px' }}>
                  Digital College
                  <span> Management System</span>
                </h1>
                <p className="hero-para" style={{ margin: '15px 0 25px 0', fontSize: '16px', lineHeight: '28px' }}>
                  EduManage is a web-based platform that helps colleges manage students,
                  faculty, attendance, courses, exams, results, fees and announcements
                  in one simple digital system.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <Link to="/login">
                    <button className="start-btn">Get Started</button>
                  </Link>
                  <Link to="/about">
                    <button className="learn-btn">Learn More</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5 text-center">
        <h2 className="title">Main Features</h2>
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="box">
              <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>🎓</div>
              <h3>Student Management</h3>
              <p>Manage student profiles, roll numbers, departments and academic records.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box">
              <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>👨‍🏫</div>
              <h3>Faculty Management</h3>
              <p>Store faculty details, subjects handled and department information.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box">
              <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>📅</div>
              <h3>Attendance Tracking</h3>
              <p>Track daily attendance and generate attendance reports easily.</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box">
              <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>📊</div>
              <h3>Result Management</h3>
              <p>Upload marks, view results and manage student performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="container">
          <h2 className="title text-center">How It Works</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="info-box">
                <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>🔑</div>
                <h3>1. Login</h3>
                <p>Students, faculty and admin can login using their role-based account.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-box">
                <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>⚙️</div>
                <h3>2. Manage Data</h3>
                <p>Admin can manage student details, faculty records, courses and reports.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-box">
                <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>📢</div>
                <h3>3. View Updates</h3>
                <p>Users can view attendance, marks, announcements and timetable updates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="title text-center">User Roles</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="role-card">
              <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>🧑‍🎓</div>
              <h3>Students</h3>
              <p>Students can view attendance, results, courses, timetable and announcements.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="role-card">
              <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>👩‍🏫</div>
              <h3>Faculty</h3>
              <p>Faculty can mark attendance, upload marks and manage subject-related updates.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="role-card">
              <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>🛡️</div>
              <h3>Admin</h3>
              <p>Admin can control students, faculty, departments, courses and overall system data.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="benefit-section">
        <div className="container">
          <h2 className="title text-center">Why This System Is Useful?</h2>
          <div className="row mt-4 g-4 align-items-stretch">
            <div className="col-md-4">
              <ul className="benefits" style={{ height: '100%', marginBottom: 0 }}>
                <li>Reduces manual paperwork</li>
                <li>Saves time for staff and students</li>
                <li>Provides centralized data access</li>
                <li>Improves communication between users</li>
                <li>Helps manage academic activities easily</li>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="info-box" style={{ height: '100%' }}>
                <h3>Project Purpose</h3>
                <p>
                  The main purpose of this College Management System is to make academic
                  and administrative work easier. Instead of maintaining records manually,
                  the system stores important data digitally and allows users to access
                  information quickly.
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="benefits-image-box" style={{ background: 'white', padding: '30px', borderRadius: '22px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '1px solid #e5e9ff', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src={homeBenefitsImg} 
                  alt="Students Collaboration" 
                  className="page-illustration floating-animation" 
                  style={{ maxWidth: '90%' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container stats py-5">
        <h2>Our College at a Glance</h2>
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="card">
              <h1>{studentsCount}+</h1>
              <p>Students</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <h1>{facultyCount}+</h1>
              <p>Faculty</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <h1>{coursesCount}+</h1>
              <p>Courses</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <h1>{deptsCount}+</h1>
              <p>Departments</p>
            </div>
          </div>
        </div>
      </section>

      <section className="light-section">
        <div className="container">
          <h2 className="title text-center">System Modules</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="info-box">
                <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>📝</div>
                <h3>Attendance Module</h3>
                <p>Maintains student attendance and percentage details.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-box">
                <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>✍️</div>
                <h3>Exam Module</h3>
                <p>Manages exam schedules, marks and result information.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-box">
                <div className="icon" style={{ fontSize: '36px', marginBottom: '12px' }}>💬</div>
                <h3>Communication Module</h3>
                <p>Shares announcements and important updates with users.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

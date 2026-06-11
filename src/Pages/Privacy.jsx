import React from 'react';
import Navbar from '../Compound/Navbar';
import Footer from '../Compound/Footer';
import '../Asset/CSS/style.css';
import privacyImg from '../Asset/Images/privacy_policy.png';

export default function Privacy() {
  return (
    <>
      <Navbar />

      <div className="page-hero">
        <h1>Privacy Policy</h1>
        <p>Your privacy and academic data security are important to us.</p>
      </div>

      <div className="container py-5">
        <div className="row g-4 align-items-center">
          {/* Privacy Illustration */}
          <div className="col-12 col-md-4 text-center">
            <div style={{ padding: '20px' }}>
              <img 
                src={privacyImg} 
                alt="Privacy Policy Shield" 
                className="page-illustration floating-animation" 
                style={{ maxWidth: '100%', maxHeight: '350px' }} 
              />
            </div>
          </div>

          {/* Privacy content */}
          <div className="col-12 col-md-8">
            <div className="policy-card" style={{ background: 'white', padding: '35px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', lineHeight: '1.7' }}>
              <h2><i className="fa-solid fa-database" style={{ marginRight: '10px', color: '#0026ff' }}></i> Information We Collect</h2>
              <p>EduManage collects student details, faculty information, attendance records, course details, exam results, and contact information for academic management.</p>

              <h2 style={{ marginTop: '25px' }}><i className="fa-solid fa-arrows-spin" style={{ marginRight: '10px', color: '#0026ff' }}></i> How We Use Your Data</h2>
              <p>The collected data is used for student management, attendance tracking, result management, communication, and administrative activities.</p>

              <h2 style={{ marginTop: '25px' }}><i className="fa-solid fa-shield-halved" style={{ marginRight: '10px', color: '#0026ff' }}></i> Data Security</h2>
              <p>This project stores demo data in browser Local Storage. No data is sent to an external server in this front-end version.</p>

              <h2 style={{ marginTop: '25px' }}><i className="fa-solid fa-user-check" style={{ marginRight: '10px', color: '#0026ff' }}></i> User Rights</h2>
              <p>Users can request correction of incorrect personal or academic information through the administrator.</p>

              <h2 style={{ marginTop: '25px' }}><i className="fa-solid fa-circle-question" style={{ marginRight: '10px', color: '#0026ff' }}></i> Contact</h2>
              <p>For privacy-related questions, contact us at <b>edumanage@college.com</b>.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

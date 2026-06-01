import React from 'react';
import Navbar from '../Compound/Navbar';
import Footer from '../Compound/Footer';
import '../Asset/CSS/style.css';

export default function Terms() {
  return (
    <>
      <Navbar />

      <div className="page-hero">
        <h1>Terms & Conditions</h1>
        <p>Governing guidelines and responsibilities for all students, faculty members, and administrators of the EduManage system.</p>
      </div>

      <div className="terms-container" style={{ width: '90%', maxWidth: '960px', margin: '50px auto', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 15px 45px rgba(0,0,0,0.05)', border: '1px solid #eef1ff' }}>
        <div className="terms-update" style={{ fontSize: '13px', color: '#718096', marginBottom: '30px', borderBottom: '1px solid #edf2f7', paddingBottom: '15px' }}>
          <strong>Last Updated:</strong> May 31, 2026 &bull; <strong>Agreement Version:</strong> 2.4
        </div>

        <div className="terms-section" style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#0026ff', fontSize: '20px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-file-contract"></i> 1. Introduction
          </h3>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568' }}>
            Welcome to EduManage. By accessing or using this College ERP Portal, you agree to comply with and be bound by these Terms and Conditions. These terms govern the access and use of features, including student registries, grading modules, attendance trackers, course syllabi, fee ledgers, and notice broadcast boards. Please read these terms carefully before accessing the platform.
          </p>
        </div>

        <div className="terms-section" style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#0026ff', fontSize: '20px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-user-check"></i> 2. User Eligibility
          </h3>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568' }}>
            Access to the EduManage ERP Portal is strictly restricted to authorized members of our academic community:
          </p>
          <ul className="terms-list" style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}><strong>Students</strong> who are currently enrolled in active courses.</li>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}><strong>Faculty Members</strong> appointed to teach, record attendance, and evaluate coursework.</li>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}><strong>Administrators</strong> authorized by the college to manage ERP system registries and datasets.</li>
          </ul>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568' }}>
            Unauthorized users attempting to log in, bypass authentication layers, or view sensitive academic directories will be reported to college authorities.
          </p>
        </div>

        <div className="terms-section" style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#0026ff', fontSize: '20px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-clipboard-user"></i> 3. User Responsibilities
          </h3>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568' }}>
            All portal users agree to maintain high academic and ethical standards while interacting with the ERP system:
          </p>
          <ul className="terms-list" style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>Users must submit only genuine, accurate personal records and deliverables (such as PDF files and fee receipts).</li>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>Students must ensure that all assignments submitted are original works, complying strictly with institutional academic integrity policies.</li>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>Faculty and administrators must record academic marks and registers fairly, accurately, and without bias.</li>
          </ul>
        </div>

        <div className="terms-section" style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#0026ff', fontSize: '20px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-shield-halved"></i> 4. Account Security
          </h3>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568' }}>
            Keeping accounts protected is a shared security priority:
          </p>
          <ul className="terms-list" style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>You are solely responsible for maintaining the confidentiality of your login credentials (email and password).</li>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>You agree not to share your account access with peers, parents, or outside third parties.</li>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>If you notice any suspicious dashboard transactions, unauthorized attendance changes, or security leaks, you must notify the ERP Administration immediately.</li>
          </ul>
        </div>

        <div className="terms-section" style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#0026ff', fontSize: '20px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-user-shield"></i> 5. Data Privacy
          </h3>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568' }}>
            EduManage values the privacy of its students and staff members. Personal identification documents, emergency contacts, transaction receipts, and scorecard records are stored in protected local database systems. We will never sell, lease, or distribute your private profiles to commercial third parties. For complete information, please refer directly to our Privacy Policy.
          </p>
        </div>

        <div className="terms-section" style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#0026ff', fontSize: '20px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-graduation-cap"></i> 6. Attendance and Academic Records
          </h3>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568' }}>
            Attendance registers and grading records have serious academic consequences:
          </p>
          <ul className="terms-list" style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>Students should maintain the minimum threshold of <strong>75% average attendance</strong> to remain qualified for end-semester examinations.</li>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>Faculty members evaluate and award grade points dynamically. Any disputes regarding exam grades, marks uploads, or lecture attendance records must be addressed directly to the appointed professor or dean of the department.</li>
          </ul>
        </div>

        <div className="terms-section" style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#0026ff', fontSize: '20px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-ban"></i> 7. Prohibited Activities
          </h3>
          <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568' }}>
            The following activities are strictly prohibited and may result in immediate suspension of portal access and disciplinary action:
          </p>
          <ul className="terms-list" style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>Injecting malicious scripts, attempting SQL injections, or running tools to scrape directories.</li>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>Using mock billing details to manipulate invoice ledger records.</li>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>Uploading unverified files, documents containing malware, or prohibited items to the coursework portals.</li>
            <li style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a5568', marginBottom: '8px' }}>Impersonating another student, professor, or admin credential.</li>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}

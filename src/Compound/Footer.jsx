import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <h3>EduManage College</h3>
        <p>College Management System</p>
        <p style={{ marginTop: '10px', fontWeight: 'bold', color: 'gold' }}>
          Founder & CEO: Danushkumar VS, Full Stack Developer
        </p>
        <p style={{ marginTop: '15px' }}>
          <Link to="/faq" style={{ marginRight: '15px', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>FAQ</Link>
          <Link to="/privacy" style={{ marginRight: '15px', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link to="/terms" style={{ fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>Terms & Conditions</Link>
        </p>
      </div>

      <div>
        <h3>Contact Information</h3>
        <p>Email: edumanage@college.com</p>
        <p>Phone: +91 9876543210</p>
        <p style={{ marginTop: '15px', fontSize: '12px', opacity: 0.8 }}>
          © {new Date().getFullYear()} EduManage ERP. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

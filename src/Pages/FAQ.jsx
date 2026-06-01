import React, { useState } from 'react';
import Navbar from '../Compound/Navbar';
import Footer from '../Compound/Footer';
import '../Asset/CSS/style.css';

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);

  const faqs = [
    { q: "How do I log into my account?", a: "Click on Login in the navigation bar, enter your registered email and password, then click Login." },
    { q: "How can students check attendance?", a: "Students can log in and view attendance records directly from their dashboard." },
    { q: "Can faculty upload marks?", a: "Yes. Faculty members can upload internal marks, assignment scores and semester results." },
    { q: "How do I submit an application form?", a: "Complete the application form with all required details and click Submit Application." },
    { q: "What is the minimum attendance requirement?", a: "Students should maintain at least 75% attendance to be eligible for examinations." },
    { q: "Who can manage student records?", a: "Administrators have permission to manage student records, courses, departments, and faculty details." },
    { q: "Can I reset my password if I forget it?", a: "Yes, you can click on the \"Forgot Password?\" link on the login screen. The ERP administrator can also reset credentials for students and faculty directly through the admin control registry console." },
    { q: "How does the system track fee payments?", a: "The fees tab lists all active academic ledgers (such as tuition, mess, and lab charges). You can pay off outstanding invoices simulating standard card checkouts, and successful receipts are instantly registered under your transactions history statement." },
    { q: "Is the portal accessible on mobile viewports?", a: "Absolutely. The EduManage College ERP Portal utilizes fluid responsive grids, flexible margins, and optimized padding templates to display beautifully across smartphones, tablets, and laptops." },
    { q: "How are announcements and notices broadcasted?", a: "Appointed faculty members and administrators can compose and post notices in the announcements tab. Once broadcasted, these circulars immediately populate the overview bulletin board on all student homepages." }
  ];

  const toggleFaq = (idx) => {
    setActiveIdx(prev => (prev === idx ? null : idx));
  };

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about EduManage College Management System.</p>
      </div>

      <div className="faq-container" style={{ width: '90%', maxWidth: '900px', margin: '50px auto' }}>
        {faqs.map((faq, idx) => (
          <div key={idx} className={`faq-card ${activeIdx === idx ? 'active' : ''}`} style={{ background: 'white', borderRadius: '15px', marginBottom: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <div 
              className="faq-question" 
              onClick={() => toggleFaq(idx)}
              style={{ padding: '20px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>{faq.q}</span>
              <i 
                className={`fa-solid ${activeIdx === idx ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                style={{ color: '#0026ff', transition: 'transform 0.2s' }}
              ></i>
            </div>
            <div 
              className="faq-answer" 
              style={{ 
                maxHeight: activeIdx === idx ? '250px' : '0', 
                overflow: 'hidden', 
                transition: 'max-height 0.4s ease-out', 
                background: '#f8fbff', 
                lineHeight: '1.7' 
              }}
            >
              <p style={{ padding: '20px', margin: 0 }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

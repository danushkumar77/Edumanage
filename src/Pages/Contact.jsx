import React, { useState } from 'react';
import Navbar from '../Compound/Navbar';
import Footer from '../Compound/Footer';
import '../Asset/CSS/style.css';
import contactImg from '../Asset/Images/contact_illustration.png';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all the contact form fields.');
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Your query message has been successfully sent to the EduManage helpdesk!');
    }, 500);
  };

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <h1>Contact Us</h1>
        <p>Get in touch with us for admissions, feedback, and technical support.</p>
      </div>

      <div className="container contact-section" style={{ padding: '60px 0' }}>
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-12 col-md-7">
            <div className="contact-box" style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 0 10px lightgray' }}>
              <h1 style={{ color: '#0026ff', marginBottom: '20px' }}>Contact Us</h1>
              <p style={{ marginBottom: '20px' }}>
                Feel free to contact us for admissions, support, course details and other information.
              </p>

              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter Your Name" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ marginBottom: '15px', padding: '12px' }}
                />
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter Your Email" 
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{ marginBottom: '15px', padding: '12px' }}
                />
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter Subject" 
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  style={{ marginBottom: '15px', padding: '12px' }}
                />
                <textarea 
                  className="form-control" 
                  rows="5" 
                  placeholder="Enter Your Message"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ marginBottom: '15px', padding: '12px' }}
                />
                <button type="submit" className="send-btn" style={{ background: '#0026ff', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '5px', cursor: 'pointer' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-12 col-md-5">
            <div className="contact-info" style={{ background: '#0026ff', color: 'white', padding: '30px', borderRadius: '15px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <img src={contactImg} alt="Contact Support" className="floating-animation" style={{ maxWidth: '80%', height: 'auto', borderRadius: '10px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }} />
                </div>
                <h3 style={{ marginBottom: '20px' }}>College Information</h3>
                <p>
                  📍 EduManage College,<br />
                  Erode, Tamil Nadu - 638001
                </p>
                <p>📞 +91 9876543210</p>
                <p>📧 edumanage@college.com</p>
                <p>🌐 www.edumanagecollege.com</p>
              </div>
              
              <div>
                <hr style={{ borderColor: 'white', margin: '20px 0' }} />

                <h4>Working Hours</h4>
                <p>Monday - Friday : 9:00 AM - 5:00 PM</p>
                <p>Saturday : 9:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

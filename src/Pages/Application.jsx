import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../Compound/StateContext';
import '../Asset/CSS/login.css';

export default function Application() {
  const { submitApplication } = useAppState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: '',
    registerNumber: '',
    department: '',
    year: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    nationality: '',
    applicationEmail: '',
    address: '',
    parentMobile: '',
    fatherName: '',
    fatherOccupation: '',
    fatherMobile: '',
    motherName: '',
    motherOccupation: '',
    motherMobile: '',
    guardianName: '',
    relationship: '',
    guardianMobile: ''
  });

  const handleApplicationSubmit = (e) => {
    e.preventDefault();

    const {
      studentName, registerNumber, department, year, dob, gender, bloodGroup,
      nationality, applicationEmail, address, parentMobile, fatherName,
      fatherOccupation, fatherMobile, motherName, motherOccupation, motherMobile,
      guardianName, relationship, guardianMobile
    } = formData;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;

    // Validation checks matching script.js
    if (
      !studentName || !registerNumber || !department || !year || !dob || !gender ||
      !bloodGroup || !nationality || !applicationEmail || !address || !parentMobile ||
      !fatherName || !fatherOccupation || !fatherMobile || !motherName || !motherOccupation || !motherMobile
    ) {
      alert('Please fill in all the required application details.');
      return;
    }

    if (!emailPattern.test(applicationEmail)) {
      alert('Enter valid email address');
      return;
    }

    if (!phonePattern.test(parentMobile)) {
      alert('Enter valid 10 digit parent mobile number');
      return;
    }

    if (!phonePattern.test(fatherMobile)) {
      alert('Enter valid 10 digit father mobile number');
      return;
    }

    if (!phonePattern.test(motherMobile)) {
      alert('Enter valid 10 digit mother mobile number');
      return;
    }

    if (guardianMobile && !phonePattern.test(guardianMobile)) {
      alert('Enter valid 10 digit guardian mobile number');
      return;
    }

    submitApplication(formData);
    alert('Application Form Submitted Successfully! Redirecting to login portal...');
    navigate('/login');
  };

  return (
    <div className="login-page-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff', padding: '40px 0' }}>
      <div className="login-box" style={{ maxWidth: '650px', margin: '0 auto' }}>
        <h1>Application Form</h1>
        
        <form onSubmit={handleApplicationSubmit}>
          {/* Student Details */}
          <h2 style={{ textAlign: 'left', fontSize: '18px', color: '#0026ff', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginTop: '20px' }}>
            Student Details
          </h2>

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Student Name *</label>
          <input 
            type="text" 
            value={formData.studentName}
            onChange={e => setFormData({ ...formData, studentName: e.target.value })}
            required
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Register Number *</label>
          <input 
            type="text" 
            value={formData.registerNumber}
            onChange={e => setFormData({ ...formData, registerNumber: e.target.value })}
            required
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Department *</label>
          <select 
            value={formData.department}
            onChange={e => setFormData({ ...formData, department: e.target.value })}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', background: '#fff' }}
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
            <option value="AI & DS">AI & DS</option>
            <option value="AIML">AIML</option>
            <option value="CSBS">CSBS</option>
          </select>

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Year *</label>
          <select 
            value={formData.year}
            onChange={e => setFormData({ ...formData, year: e.target.value })}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', background: '#fff' }}
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Date of Birth *</label>
          <input 
            type="date" 
            value={formData.dob}
            onChange={e => setFormData({ ...formData, dob: e.target.value })}
            required
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Gender *</label>
          <select 
            value={formData.gender}
            onChange={e => setFormData({ ...formData, gender: e.target.value })}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', background: '#fff' }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Blood Group *</label>
          <select 
            value={formData.bloodGroup}
            onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', background: '#fff' }}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Nationality *</label>
          <input 
            type="text" 
            value={formData.nationality}
            onChange={e => setFormData({ ...formData, nationality: e.target.value })}
            required
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Email Address *</label>
          <input 
            type="email" 
            value={formData.applicationEmail}
            onChange={e => setFormData({ ...formData, applicationEmail: e.target.value })}
            required
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Address *</label>
          <textarea 
            value={formData.address}
            onChange={e => setFormData({ ...formData, address: e.target.value })}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', minHeight: '80px' }}
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Parent Mobile Number *</label>
          <input 
            type="text" 
            value={formData.parentMobile}
            onChange={e => setFormData({ ...formData, parentMobile: e.target.value })}
            required
          />

          {/* Father Details */}
          <h2 style={{ textAlign: 'left', fontSize: '18px', color: '#0026ff', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginTop: '30px' }}>
            Father Details
          </h2>

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Father Name *</label>
          <input 
            type="text" 
            value={formData.fatherName}
            onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
            required
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Occupation *</label>
          <input 
            type="text" 
            value={formData.fatherOccupation}
            onChange={e => setFormData({ ...formData, fatherOccupation: e.target.value })}
            required
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Mobile Number *</label>
          <input 
            type="text" 
            value={formData.fatherMobile}
            onChange={e => setFormData({ ...formData, fatherMobile: e.target.value })}
            required
          />

          {/* Mother Details */}
          <h2 style={{ textAlign: 'left', fontSize: '18px', color: '#0026ff', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginTop: '30px' }}>
            Mother Details
          </h2>

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Mother Name *</label>
          <input 
            type="text" 
            value={formData.motherName}
            onChange={e => setFormData({ ...formData, motherName: e.target.value })}
            required
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Occupation *</label>
          <input 
            type="text" 
            value={formData.motherOccupation}
            onChange={e => setFormData({ ...formData, motherOccupation: e.target.value })}
            required
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Mobile Number *</label>
          <input 
            type="text" 
            value={formData.motherMobile}
            onChange={e => setFormData({ ...formData, motherMobile: e.target.value })}
            required
          />

          {/* Guardian Details */}
          <h2 style={{ textAlign: 'left', fontSize: '18px', color: '#0026ff', borderBottom: '1px solid #ddd', paddingBottom: '5px', marginTop: '30px' }}>
            Guardian Details (Optional)
          </h2>

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Guardian Name</label>
          <input 
            type="text" 
            value={formData.guardianName}
            onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Relationship</label>
          <input 
            type="text" 
            value={formData.relationship}
            onChange={e => setFormData({ ...formData, relationship: e.target.value })}
          />

          <label style={{ textAlign: 'left', display: 'block', fontWeight: 'bold', fontSize: '13px', marginTop: '10px' }}>Contact Number</label>
          <input 
            type="text" 
            value={formData.guardianMobile}
            onChange={e => setFormData({ ...formData, guardianMobile: e.target.value })}
          />

          <button type="submit" style={{ marginTop: '25px', padding: '15px' }}>
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

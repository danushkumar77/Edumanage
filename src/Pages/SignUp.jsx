import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../Compound/StateContext';
import '../Asset/CSS/login.css';

export default function SignUp() {
  const { signup } = useAppState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    const namePattern = /^[A-Za-z ]{3,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!namePattern.test(name)) {
      alert('Enter valid name (minimum 3 alphabet characters)');
      return;
    }

    if (!emailPattern.test(email)) {
      alert('Enter valid email address');
      return;
    }

    if (!phonePattern.test(phone)) {
      alert('Enter valid 10 digit phone number');
      return;
    }

    if (password.length < 6) {
      alert('Password must be minimum 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    signup(name, email, phone, password);
    alert('Sign Up Successful! Redirecting to student admission application...');
    navigate('/application');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-box">
        <h1>EduManage College</h1>
        <h2>Sign Up</h2>

        <form onSubmit={handleSignupSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input 
            type="text" 
            placeholder="Phone Number" 
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword}
            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="bottom-text" style={{ marginTop: '15px' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

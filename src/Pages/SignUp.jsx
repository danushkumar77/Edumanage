import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../Compound/StateContext';
import '../Asset/CSS/login.css';
import logoImg from '../Asset/Images/logo.png';

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="login-content">
          <div className="login-form-side">
            <Link to="/">
              <img src={logoImg} alt="EduManage Logo" style={{ cursor: 'pointer', maxWidth: '130px', marginBottom: '10px' }} />
            </Link>
            <h1>EduManage</h1>
            <h2>Create Your Account</h2>

            <form onSubmit={handleSignupSubmit}>
              {/* Full Name */}
              <div className="input-box">
                <span>👤</span>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Email */}
              <div className="input-box">
                <span>📧</span>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="input-box">
                <span>📞</span>
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              {/* Password */}
              <div className="input-box">
                <span>🔒</span>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Password" 
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <i 
                  className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                  style={{ cursor: 'pointer', color: showPassword ? '#0026ff' : '#718096', fontSize: '16px', marginLeft: '8px', transition: 'color 0.2s ease' }} 
                  onClick={() => setShowPassword(!showPassword)}
                  title="Toggle Password Visibility"
                ></i>
              </div>

              {/* Confirm Password */}
              <div className="input-box">
                <span>🔒</span>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword}
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
                <i 
                  className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                  style={{ cursor: 'pointer', color: showConfirmPassword ? '#0026ff' : '#718096', fontSize: '16px', marginLeft: '8px', transition: 'color 0.2s ease' }} 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  title="Toggle Password Visibility"
                ></i>
              </div>

              <button type="submit">Sign Up</button>
            </form>

            <p className="bottom-text">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../Compound/StateContext';
import '../Asset/CSS/login.css';
import logoImg from '../Asset/Images/logo.png';

export default function Login() {
  const { login } = useAppState();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in both email and password fields.');
      return;
    }

    const res = login(role, email, password);
    if (res.success) {
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'faculty') {
        navigate('/faculty');
      } else {
        navigate('/dashboard');
      }
    } else {
      alert(res.message || 'Invalid login credentials!');
    }
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
            <h2>Welcome Back</h2>

            <form onSubmit={handleLoginSubmit}>
              {/* Email Box */}
              <div className="input-box">
                <span>📧</span>
                <input 
                  type="email" 
                  id="login-email" 
                  placeholder="Enter Your Email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required 
                />
              </div>

              {/* Password Box */}
              <div className="input-box">
                <span>🔒</span>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="login-password" 
                  placeholder="Enter Your Password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required 
                />
                <i 
                  className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                  id="toggle-password" 
                  style={{ cursor: 'pointer', color: showPassword ? '#0026ff' : '#718096', fontSize: '16px', marginLeft: '8px', transition: 'color 0.2s ease' }} 
                  onClick={() => setShowPassword(!showPassword)}
                  title="Toggle Password Visibility"
                ></i>
              </div>

              {/* Forgot Password */}
              <p className="forgot">
                <Link to="/forgot">Forgot Password?</Link>
              </p>

              {/* Role Selection */}
              <label htmlFor="login-role" style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#555', display: 'block', textAlign: 'left' }}>
                Select Portal Role:
              </label>
              <select 
                id="login-role" 
                value={role}
                onChange={e => setRole(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #cbd5e0', borderRadius: '6px', fontSize: '14px', background: '#fff', fontWeight: 'bold' }}
              >
                <option value="student">Login as Student</option>
                <option value="faculty">Login as Faculty</option>
                <option value="admin">Login as Admin</option>
              </select>

              {/* Login Button */}
              <button type="submit">Login</button>
            </form>

            {/* Signup Link */}
            <p className="bottom-text">
              Don't have an account? <Link to="/signup">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

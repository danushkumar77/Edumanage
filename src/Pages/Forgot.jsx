import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Asset/CSS/login.css';

export default function Forgot() {
  const [email, setEmail] = useState('');

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please fill in your email or phone number.');
      return;
    }
    alert(`Reset instructions have been successfully sent to: ${email}`);
    setEmail('');
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-box">
        <h1>Reset Password</h1>
        
        <form onSubmit={handleResetSubmit}>
          <input 
            type="text" 
            placeholder="Enter your email or phone number" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>

        <p className="bottom-text" style={{ marginTop: '20px' }}>
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

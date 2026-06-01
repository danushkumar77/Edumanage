import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from './StateContext';
import logoImg from '../Asset/Images/logo.png';

export default function Navbar() {
  const { currentUser, logout } = useAppState();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'admin') return '/admin';
    if (currentUser.role === 'faculty') return '/faculty';
    return '/dashboard';
  };

  const getDashboardLabel = () => {
    if (!currentUser) return 'LOGIN';
    if (currentUser.role === 'admin') return 'ADMIN DASHBOARD';
    if (currentUser.role === 'faculty') return 'FACULTY DASHBOARD';
    return 'DASHBOARD';
  };

  return (
    <div className="main-navbar">
      <div className="logo">
        <Link to="/">
          <img src={logoImg} alt="EduManage Logo" style={{ cursor: 'pointer' }} />
        </Link>
      </div>

      <div className="menu">
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT US</Link>
        <Link to="/contact">CONTACT US</Link>
        
        <div className={`dropdown ${showDropdown ? 'show' : ''}`} onMouseLeave={() => setShowDropdown(false)}>
          <button 
            className="dropbtn" 
            onClick={() => setShowDropdown(prev => !prev)}
          >
            INFO <i className="fa-solid fa-caret-down"></i>
          </button>
          <div className="dropdown-content" style={{ display: showDropdown ? 'block' : 'none' }}>
            <Link to="/faq" onClick={() => setShowDropdown(false)}>FAQ</Link>
            <Link to="/privacy" onClick={() => setShowDropdown(false)}>Privacy Policy</Link>
            <Link to="/terms" onClick={() => setShowDropdown(false)}>Terms & Conditions</Link>
          </div>
        </div>

        {currentUser ? (
          <>
            <Link to={getDashboardPath()} style={{ color: 'gold' }}>{getDashboardLabel()}</Link>
            <a href="#logout" onClick={handleLogout}>LOGOUT</a>
          </>
        ) : (
          <Link to="/login">LOGIN</Link>
        )}
      </div>
    </div>
  );
}

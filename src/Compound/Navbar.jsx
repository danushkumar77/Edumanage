import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from './StateContext';
import logoImg from '../Asset/Images/logo.png';

export default function Navbar() {
  const { currentUser, logout } = useAppState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    setIsMobileOpen(false);
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

  const handleLinkClick = () => {
    setTimeout(() => {
      setShowDropdown(false);
      setIsMobileOpen(false);
    }, 150);
  };

  const handleNormalLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className="main-navbar">
      <div className="logo">
        <Link to="/" onClick={handleNormalLinkClick}>
          <img src={logoImg} alt="EduManage Logo" style={{ cursor: 'pointer' }} />
        </Link>
      </div>

      {/* Hamburger button visible only on mobile screens */}
      <button 
        className={`hamburger-btn ${isMobileOpen ? 'active' : ''}`}
        onClick={() => setIsMobileOpen(prev => !prev)}
        aria-label="Toggle navigation menu"
      >
        <i className={isMobileOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>

      <div className={`menu ${isMobileOpen ? 'active' : ''}`}>
        <Link to="/" onClick={handleNormalLinkClick}>HOME</Link>
        <Link to="/about" onClick={handleNormalLinkClick}>ABOUT US</Link>
        <Link to="/contact" onClick={handleNormalLinkClick}>CONTACT US</Link>
        
        <div 
          className={`dropdown ${showDropdown ? 'show' : ''}`} 
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button 
            className="dropbtn" 
            onClick={() => setShowDropdown(prev => !prev)}
          >
            INFO <i className="fa-solid fa-caret-down"></i>
          </button>
          <div className="dropdown-content" style={{ display: showDropdown ? 'block' : 'none' }}>
            <Link to="/faq" onClick={handleLinkClick}>FAQ</Link>
            <Link to="/privacy" onClick={handleLinkClick}>Privacy Policy</Link>
            <Link to="/terms" onClick={handleLinkClick}>Terms & Conditions</Link>
          </div>
        </div>

        {currentUser ? (
          <>
            <Link to={getDashboardPath()} onClick={handleNormalLinkClick} style={{ color: 'gold' }}>{getDashboardLabel()}</Link>
            <a href="#logout" onClick={handleLogout}>LOGOUT</a>
          </>
        ) : (
          <Link to="/login" onClick={handleNormalLinkClick}>LOGIN</Link>
        )}
      </div>
    </div>
  );
}

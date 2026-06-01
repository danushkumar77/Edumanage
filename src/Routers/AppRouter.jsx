import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import FAQ from '../Pages/FAQ';
import Privacy from '../Pages/Privacy';
import Terms from '../Pages/Terms';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Forgot from '../Pages/Forgot';
import Application from '../Pages/Application';
import StudentDashboard from '../Pages/StudentDashboard';
import FacultyDashboard from '../Pages/FacultyDashboard';
import AdminDashboard from '../Pages/AdminDashboard';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/application" element={<Application />} />

      {/* Dynamic Role-Based Dashboards */}
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/faculty" element={<FacultyDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

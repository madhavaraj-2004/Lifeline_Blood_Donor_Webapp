'use client';

import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar({ donorLoggedIn, adminLoggedIn, onDonorLogout, onAdminLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">LIFELINE</Link>
        
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/blood-search">Search Blood</Link>
          <Link to="/request-blood">Request Blood</Link>
          
          {donorLoggedIn ? (
            <>
              <Link to="/donor/dashboard">Dashboard</Link>
              <button onClick={onDonorLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/donor/register">Register</Link>
              <Link to="/donor/login">Donor Login</Link>
            </>
          )}

          {adminLoggedIn ? (
            <>
              <Link to="/admin/dashboard" className="admin-link">Admin Dashboard</Link>
              <button onClick={onAdminLogout} className="logout-btn">Admin Logout</button>
            </>
          ) : (
            <Link to="/admin/login" className="admin-link">Admin Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

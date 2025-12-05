import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/styles/Navbar.css';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);

  useEffect(() => {
  const storedToken = localStorage.getItem('token');
  setToken(storedToken);
}, [location]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');

    setToken(null);

    // ✅ Force Navbar update
    window.dispatchEvent(new Event('storage'));

    navigate('/signin');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="GP Logo" />
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/education">Education</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact Me</Link></li>

        {!token ? (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <li>
            <button className="signout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
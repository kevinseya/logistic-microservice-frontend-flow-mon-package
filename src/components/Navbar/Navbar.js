import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">🚀 Flow Moon Package </div>
      <ul className="navbar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;

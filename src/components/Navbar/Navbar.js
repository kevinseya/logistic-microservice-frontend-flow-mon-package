import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userRole, userName }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">🌟 Logistica y Envíos</div>
      <div className="navbar-welcome">
        Bienvenido, {userName || 'Usuario'}
      </div>
      <ul className="navbar-menu">
        <li><Link to="/dashboard">Dashboard</Link></li>
        {userRole === 'admin' && (
          <>
            <li><Link to="/usuarios">Gestión de Usuarios</Link></li>
            <li><Link to="/reportes">Reportes</Link></li>
          </>
        )}
        {userRole === 'cliente' && (
          <>
            <li><Link to="/compras">Mis Compras</Link></li>
            <li><Link to="/soporte">Soporte</Link></li>
          </>
        )}
        <li><button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
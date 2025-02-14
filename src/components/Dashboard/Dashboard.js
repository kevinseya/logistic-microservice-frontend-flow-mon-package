import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css'; // Importamos estilos

const Dashboard = () => {
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const role = sessionStorage.getItem('userRole');


  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('No estás autenticado. Redirigiendo...');
        setTimeout(() => navigate('/login'), 2000);
        return;
      }
    };
    fetchUserData();
  }, [navigate]);

  const renderModules = () => {
    if (!role) return <p>Cargando módulos...</p>;

    const modules = {
      ADMIN: [
        { name: 'Órdenes', icon: '📦', link: '/orders' },
        { name: 'Usuarios', icon: '👥', link: '/users' },
        { name: 'Clientes', icon: '🛒', link: '/customers' },
        { name: 'Envíos', icon: '🚚', link: '/envios' },
        { name: 'Pagos', icon: '💳', link: '/pagos' },
      ],
      CLIENT: [
        { name: 'Generar Orden', icon: '📦', link: '/order/create' },
        { name: 'Mis ordenes', icon: '🚚', link: '/order/List' },

      ],
      CARRIER: [
        { name: 'Envíos', icon: '🚚', link: '/envios' },
      ],
    };

    return (
      <div className="dashboard-grid">
        {modules[role]?.map((module, index) => (
          <Link key={index} to={module.link} className="dashboard-card">
            <span className="dashboard-icon">{module.icon}</span>
            <span className="dashboard-text">{module.name}</span>
          </Link>
        )) || <p>No tienes acceso a módulos.</p>}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <h1>Menú de {role}</h1>
      {error ? <p className="error-text">{error}</p> : renderModules()}
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem('authToken'); // ⚡ Usar sessionStorage en lugar de localStorage

      if (!token) {
        setError('No estás autenticado. Redirigiendo al login...');
        setTimeout(() => {
          navigate('/login'); // 🔥 Usa navigate para redirigir
        }, 2000);
        return;
      }

      try {
        const response = await fetch('http://apigateway.com', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener datos');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? (
        <div>
          <p>Nombre: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Rol: {userData.role}</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Dashboard;

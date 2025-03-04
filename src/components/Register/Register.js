import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);  // Nuevo estado para mensaje de éxito
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      lastname,
      email,
      phone,
      password,
      address,
    };

    try {
      // Aquí se coloca la URL de tu API Gateway
      console.log(userData);
      const response = await fetch(${API_CUSTOMERS_CREATE}, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccessMessage('¡Cliente registrado exitosamente!');  // Mensaje de éxito
        setTimeout(() => navigate('/login'), 2000);  // Redirige después de 2 segundos
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Hubo un error al registrar');
      }
    } catch (err) {
      setError('Error de conexión o al registrar');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="input-group">
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Apellido:</label>
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Teléfono:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Dirección:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}  {/* Mostrar mensaje de éxito */}

        <button type="submit" className="register-btn">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;

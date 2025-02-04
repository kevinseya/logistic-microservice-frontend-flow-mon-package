import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { login } from '../../services/authService';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(email, password, isClient);
      if (data.token) {
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('userRole', data.role);
        sessionStorage.setItem('userName', data.name);
        // Llamar a onLoginSuccess antes de navegar
        onLoginSuccess();
        
        navigate('/dashboard');
      } else {
        setError('No se recibió un token. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Credenciales incorrectas o error en el login');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>
            Soy Cliente
            <input type="checkbox" checked={isClient} onChange={() => setIsClient(!isClient)} />
          </label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-btn">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
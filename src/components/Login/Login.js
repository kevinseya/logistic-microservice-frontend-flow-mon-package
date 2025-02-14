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
    console.log("Formulario enviado"); // Asegúrate de que esto se imprima cuando se haga clic en el botón
    setError(null); // Limpiar errores previos

    try {
      // Llamamos al servicio login
      console.log("Enviando datos:", { email, password, isClient }); // Verifica que los datos estén bien
      const data = await login(email, password, isClient);
      if (data.token) {
        // Guardamos el token y datos del usuario en sessionStorage
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('userRole', data.role);
        sessionStorage.setItem('userName', data.name);
        
        onLoginSuccess(); // Llamar a la función del padre (App.js)
        navigate('/dashboard'); // Redirigir al dashboard
      }
    } catch (err) {
      setError('Credenciales incorrectas o error en el login');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirigir al registro
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/images/image.jpg" alt="Paquetería" className="login-image" />
      </div>
      <div className="login-right">
        <h2>Bienvenido a Flow Moon Package</h2>
        <p className="sub-title">Tu aliado confiable para la gestión de envíos y paquetería.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>
              Soy Cliente
              <input
                type="checkbox"
                checked={isClient}
                onChange={() => setIsClient(!isClient)}
              />
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Iniciar sesión</button>
        </form>
        <p>
          ¿No tienes cuenta?{' '}
          <button onClick={handleRegisterRedirect} className="register-link">
            Registrarse
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

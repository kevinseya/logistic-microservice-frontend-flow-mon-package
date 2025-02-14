import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Users from './components/Users/Users';
import CreateOrder from './components/Orders/CreateOrder';
import Register from './components/Register/Register';

const NavbarWrapper = ({ isAuthenticated, userRole, userName }) => {
  const location = useLocation();
  
  if (location.pathname === '/login'|| location.pathname === '/register') {
    return null;
  }

  return isAuthenticated ? <Navbar userRole={userRole} userName={userName} /> : null;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const role = sessionStorage.getItem('userRole');
    const name = sessionStorage.getItem('userName'); // Agregamos el nombre
 
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role || '');
      setUserName(name || '');
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setUserRole(sessionStorage.getItem('userRole') || '');
    setUserName(sessionStorage.getItem('userName') || '');
  };

  return (
    <Router>
      <NavbarWrapper 
        isAuthenticated={isAuthenticated} 
        userRole={userRole} 
        userName={userName}
      />
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={<Login onLoginSuccess={handleLoginSuccess} />} 
        />
        <Route
          path="/register"
          element={<Register />} 
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/users" 
        element={
        <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole}>
        <Users />
        </PrivateRoute >
        } 
        />
        <Route path="/order/create" 
        element={
        <PrivateRoute isAuthenticated={isAuthenticated}userRole={userRole}>
        <CreateOrder />
        </PrivateRoute >
        }
        />
      </Routes>
    </Router>
  );
};

export default App;
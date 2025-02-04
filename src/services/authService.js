// src/services/authService.js
import axios from 'axios';

// URL del microservicio de validación
const API_BASE_URL = process.env.REACT_APP_URL_VALIDATION;

export const login = async (email, password, isClient) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
      isClient,
    });

    return response.data; // Contiene el token y el rol
  } catch (error) {
    throw new Error('Error en la autenticación: ' + (error.response?.data?.message || error.message));
  }
};

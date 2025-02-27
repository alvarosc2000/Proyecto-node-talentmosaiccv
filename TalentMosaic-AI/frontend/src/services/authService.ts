import axios from 'axios';

// Función dummy para simular login
export const login = async (email: string, password: string) => {
  if (email === 'admin@example.com' && password === 'password') {
    return { token: 'dummy-jwt-token' };
  }
  throw new Error('Credenciales incorrectas');
};

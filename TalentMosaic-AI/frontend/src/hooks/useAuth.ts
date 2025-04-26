import { useState, useEffect } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Intentamos cargar el token del localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    // Eliminar el token del localStorage y resetear el estado
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    token,
    logout,
  };
}

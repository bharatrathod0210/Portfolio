import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../utils/api';

// Default value prevents null destructure crash when used outside provider
const AuthContext = createContext({
  admin: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      api.get('/auth/me')
        .then((res) => setAdmin(res.data))
        .catch(() => localStorage.removeItem('admin_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('admin_token', res.data.token);
    setAdmin(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

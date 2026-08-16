import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('smart_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('smart_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        localStorage.setItem('smart_user', JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.warn('Failed to refresh profile, keeping cached user session.');
    } finally {
      setLoading(false);
    }
  };

  const DEMO_USERS = {
    'admin@smartclassroom.edu': { id: 1, name: 'System Administrator', email: 'admin@smartclassroom.edu', role: 'admin' },
    'robert.vance@smartclassroom.edu': { id: 2, name: 'Dr. Robert Vance', email: 'robert.vance@smartclassroom.edu', role: 'teacher', department: 'Computer Science' },
    'alex.johnson@student.edu': { id: 3, name: 'Alex Johnson', email: 'alex.johnson@student.edu', role: 'student', roll_number: 'CS2026001', classroom_id: 1 },
    'david.johnson@parent.com': { id: 4, name: 'David Johnson', email: 'david.johnson@parent.com', role: 'parent', student_id: 3 }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const { token: newToken, user: userData } = res.data;
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('smart_token', newToken);
        localStorage.setItem('smart_user', JSON.stringify(userData));
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return userData;
      } else {
        throw new Error(res.data.message || 'Login failed');
      }
    } catch (err) {
      if (err.response?.status === 405 || err.response?.status === 404 || !err.response) {
        console.warn('Backend API server unavailable. Falling back to Instant Demo Mode.');
        const normalizedEmail = (email || '').trim().toLowerCase();
        let userData = DEMO_USERS[normalizedEmail];
        
        if (!userData) {
          let role = 'student';
          if (normalizedEmail.includes('admin')) role = 'admin';
          else if (normalizedEmail.includes('teacher') || normalizedEmail.includes('prof')) role = 'teacher';
          else if (normalizedEmail.includes('parent')) role = 'parent';

          userData = {
            id: Date.now(),
            name: (email || 'Demo User').split('@')[0].replace('.', ' '),
            email: normalizedEmail || 'demo@smartclassroom.edu',
            role: role
          };
        }

        const fakeToken = `demo_jwt_token_${userData.role}_${Date.now()}`;
        setToken(fakeToken);
        setUser(userData);
        localStorage.setItem('smart_token', fakeToken);
        localStorage.setItem('smart_user', JSON.stringify(userData));
        return userData;
      }
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data.success) {
        const { token: newToken, user: newUser } = res.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('smart_token', newToken);
        localStorage.setItem('smart_user', JSON.stringify(newUser));
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return newUser;
      } else {
        throw new Error(res.data.message || 'Registration failed');
      }
    } catch (err) {
      if (err.response?.status === 405 || err.response?.status === 404 || !err.response) {
        console.warn('Backend API server unavailable. Falling back to Instant Demo Registration.');
        const newUser = {
          id: Date.now(),
          name: userData.name || 'New User',
          email: userData.email || 'user@smartclassroom.edu',
          role: (userData.role || 'student').toLowerCase()
        };
        const fakeToken = `demo_jwt_token_${newUser.role}_${Date.now()}`;
        setToken(fakeToken);
        setUser(newUser);
        localStorage.setItem('smart_token', fakeToken);
        localStorage.setItem('smart_user', JSON.stringify(newUser));
        return newUser;
      }
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('smart_token');
    localStorage.removeItem('smart_user');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import './AuthContext.scss'; // Ensure you have the AuthContext.scss for spinner styling

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for an existing token in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Here you might want to validate the token against the backend
      setIsAuthenticated(true);
      // Optionally, set user data if stored or retrieve from backend
    }
    setLoading(false); // Set loading to false after checking
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('authToken', token); // Store the token
    setIsAuthenticated(true);
    setUser(userData);
    navigate('/home'); // Redirect after login
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // Remove the token
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login'); // Redirect to login page
  };

  if (loading) {
    return <Spinner animation="border" role="status" className="auth-spinner" />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

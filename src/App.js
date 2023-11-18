import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/layout/HomePage';
import AuthFailPage from './pages/AuthFailedPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './components/layout/authentication/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="auth-fail" element={<AuthFailPage />} />
            <Route path="login" element={<LoginPage />} />
            {/* ... other routes ... */}
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

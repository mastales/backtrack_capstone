import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/layout/HomePage';
import mockData from './data/mock_data.json'; // Replace with the correct path

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage mockData={mockData} />} />
          {/* Remove other routes related to authentication */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

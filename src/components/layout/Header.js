import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <span className="logo-emoji">🔂</span>
        <span className="app-name">BackTrack</span>
      </div>
      <nav className="navigation">
        <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
        <NavLink to="/how-to-play" activeClassName="active-link">How to Play</NavLink>
        <NavLink to="/about-us" activeClassName="active-link">About Us</NavLink>
      </nav>
    </header>
  );
};

export default Header;

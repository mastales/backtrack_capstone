import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content">
        <p>&copy; {new Date().getFullYear()} BackTrack</p>
      </div>
    </footer>
  );
};

export default Footer;

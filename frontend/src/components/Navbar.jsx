import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <div className="nav-inner">
        <Link to="/" className="logo">SUPPORT<span>VIJAYA_SRI</span></Link>
        <div className="nav-links">
        </div> 
      </div>
    </div>
  </nav>
);

export default Navbar;

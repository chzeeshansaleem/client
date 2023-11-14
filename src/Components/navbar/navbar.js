import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" className='logoText'>Focusteck</Link>
      </div>
      <div className="nav-links">
      <Link to="/" className='link'>Home</Link>
        <Link to="/email-validators" className='link'>Email Validators</Link>
        <Link to="/data-scraping" className='link'>Data Scraping</Link>
      </div>
    </div>
  );
};

export default Navbar;

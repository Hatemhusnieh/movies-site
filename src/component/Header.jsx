import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss';

function Header() {
  return (
    <div className="header">
      <Link to="./">
        <h1>Movies</h1>
      </Link>
    </div>
  );
}

export default Header;

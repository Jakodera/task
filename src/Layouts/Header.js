import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Task</h1>
      <Link style={linkStyle} to="/">Todo</Link>   |
      <Link style={linkStyle} to="/Album">Album</Link>   |
      <Link style={linkStyle} to="/Photos">Photos</Link>
    </header>
  )
}

const headerStyle = {
  background: '#497EFC',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

export default Header;
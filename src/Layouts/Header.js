import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Todo, Gallery  App</h1>
      <Link style={linkStyle} to="/">Albums</Link>   |
      <Link style={linkStyle} to="/Todos">Todo</Link>
    </header>
  )
}

const headerStyle = {
  background: '#49eafc',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

export default Header;
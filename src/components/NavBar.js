import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styleSheets/navBar.css';
import logo from './media/logob.png'; 
// xd
function NavBar({ title }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="nav-bar">
        <div className="logo">
          <Link to="/ventana1">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="title">{title}</div>
        <div className="menu-icon" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="side-menu-title">Menú de Opciones</div>
        <ul>
          <li>
            <Link to="/ventana5" onClick={toggleMenu}>Usuario</Link>
          </li>
          <li>
            <Link to="/" onClick={toggleMenu}>Cambiar de cuenta</Link>
          </li>
          <li>
            <Link to="/ventana4" onClick={toggleMenu}>Ayuda</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavBar;

// VentanaPrincipal.js
import React from 'react';
import { Link } from 'react-router-dom';


function VentanaPrincipal() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/ventana2">Ventana Secundaria</Link>
          </li>
          <li>
            <Link to="/ventana3">Ventana Tres</Link>
          </li>
          <li>
            <Link to="/ventana4">Ventana Cuatro</Link>
          </li>
          <li>
            <Link to="/ventana5">Ventana Editar</Link>
          </li>
          <li>
            <Link to="/ventana6">Ventana Seis</Link>
          </li>
          <li>
            <Link to="/ventana7">Ventana Siete</Link>
          </li>
          <li>
            <Link to="/ventana8">Ventana Ocho</Link>
          </li>
          <li>
            <Link to="/ventana9">Ventana Nueve</Link>
          </li>
          <li>
            <Link to="/ventana10">Ventana Diez</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default VentanaPrincipal;

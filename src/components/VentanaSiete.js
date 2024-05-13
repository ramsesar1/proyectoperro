// VentanaSiete.js
import React from 'react';
import { Link } from 'react-router-dom';

function VentanaTres() {
  return (
    <div>
      <h2>Ventana Cuatro</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Ir a Ventana Principal</Link>
          </li>
          <li>
            <Link to="/ventana2">Ir a Ventana Secundaria</Link>
          </li>
          {/* Agrega aquí más enlaces si es necesario */}
        </ul>
      </nav>
      {/* Contenido de la ventana Tres */}
    </div>
  );
}

export default VentanaTres;

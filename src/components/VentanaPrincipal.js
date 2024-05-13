// VentanaPrincipal.js
import React from 'react';
import { Link } from 'react-router-dom';

function VentanaPrincipal() {
  return (
    <div>
      <h2>Ventana Principal</h2>
      <ul>
        <li><Link to="/ventana2">Ventana Secundaria</Link></li>
        <li><Link to="/ventana3">Ventana Tres</Link></li>
        <li><Link to="/ventana4">Ventana Cuatro</Link></li>
        <li><Link to="/ventana5">Ventana Cuatro</Link></li>
        <li><Link to="/ventana6">Ventana Cuatro</Link></li>
        <li><Link to="/ventana7">Ventana Cuatro</Link></li>
        <li><Link to="/ventana8">Ventana Cuatro</Link></li>
        <li><Link to="/ventana9">Ventana Cuatro</Link></li>
        <li><Link to="/ventana10">Ventana Cuatro</Link></li>

        {/* Agregar enlaces para las nuevas ventanas aquí */}
        {/* Por ejemplo: */}
        {/* <li><Link to="/ventana5">Ventana Cinco</Link></li> */}
      </ul>
    </div>
  );
}

export default VentanaPrincipal;

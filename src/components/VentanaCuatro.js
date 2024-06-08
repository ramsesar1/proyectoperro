import React from 'react';
import { Link } from 'react-router-dom';
import './styleSheets/asoStyle.css';
import NavBar from './NavBar';

function VentanaCuatro() {
  return (
    <div>
      <div className="info-container">
        <NavBar title="Asociaciones civiles" />
      </div>
      <div className="title-container">
        <h1>Contactos</h1>
      </div>
      <div className="contact-container">
        <div className="contact-column">
          <h3>Veterinarios</h3>
          <p>Veterinaria Ramírez: 6121684331</p>
          <p>Veterinaria Michigan: 6121699331</p>
        </div>
        <div className="contact-column">
          <h3>Asociaciones civiles</h3>
          <p>Protección animal: 2911</p>
          <p>Denuncia anónima Protección animal: 3011</p>
          <p>Rescate de vida silvestre: 3111</p>
          <p>Rescate de vida marina: 3211</p>
          <p>Control de plagas: 6122899999</p>
          <p>Esterilización y castración: 6129885963</p>
        </div>
        <div className="contact-column">
          <h3>Desas ayudarnos? Contactanos</h3>
          <p>Celular: 6123456789</p>
          <p>Correo: ayudas@centro.com</p>
        </div>
      </div>
    </div>
  );
}

export default VentanaCuatro;

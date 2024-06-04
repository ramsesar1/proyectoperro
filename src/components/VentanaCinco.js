// VentanaCinco.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styleSheets/styleEditar.css';

function VentanaCinco() {
  return (
    <div className="container">
      <h2>Ventana Cinco</h2>
      <div className="option-container">
        <Link to="/ventanaEdiUsu" className="option">
          <div className="image-container">
            <img src="https://media.istockphoto.com/id/1211831502/es/foto/no-son-tan-lindos.jpg?s=612x612&w=0&k=20&c=wiBGL4KdMJw_Q9rEwK-Tfp-Jb8z9huvTTmcfps_Nsfw=" alt="Editar Usuario" />
            <div className="overlay-text">Editar Usuario</div>
          </div>
        </Link>
        <Link to="/ventanaEdiAni" className="option">
          <div className="image-container">
            <img src="https://www.shutterstock.com/image-photo/rhodesian-ridgeback-dog-bandage-on-600nw-1895440579.jpg" alt="Editar Animal" />
            <div className="overlay-text">Editar Animal</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default VentanaCinco;

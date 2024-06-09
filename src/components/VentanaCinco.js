// VentanaCinco.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styleSheets/styleEditar.css';
import NavBar from './NavBar';

function VentanaCinco() {
  return (
    <div className="container">
      <div className="nav-container">
        <NavBar title=" Usuario" />
      </div>
      <div className="option-container">
        <Link to="/ventanaEdiUsu" className="option">
          <div className="image">
            <img src="https://media.istockphoto.com/id/1211831502/es/foto/no-son-tan-lindos.jpg?s=612x612&w=0&k=20&c=wiBGL4KdMJw_Q9rEwK-Tfp-Jb8z9huvTTmcfps_Nsfw=" alt="Editar Usuario" />
            <div className="overlay-text">Información Usuario</div>
          </div>
        </Link>
        <Link to="/ventanaEdiAni" className="option">
          <div className="image">
            <img src="https://www.shutterstock.com/image-photo/veterinarian-checking-microchip-implant-under-600nw-1981023950.jpg" alt="Editar Animal" />
            <div className="overlay-text">Información Animales</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default VentanaCinco;

import React from 'react';
import { Link } from 'react-router-dom';
import './styleSheets/index.css';
import NavBar from './NavBar';

function VentanaPrincipal() {
  return (
    <div className="main-container">
      <div className="nav-container">
        <NavBar title="Página Principal" />
      </div>
      <div className="grid-container">
        <Link to="/ventana3" className="grid-item">
          <div className="image-container">
            <img src="https://media.istockphoto.com/id/1307238003/es/foto/la-vida-es-buena-con-un-amigo-fiel-a-tu-lado.jpg?s=612x612&w=0&k=20&c=6Qgx_Q5dmJPJ5py3MEVolOrsueEgvSxC-ojiJtqYdfY=" alt="Ventana 3" />
          </div>
          <div className="text-container">
            REGISTRAR ANIMAL
          </div>
        </Link>
        <Link to="/ventana5" className="grid-item">
          <div className="image-container">
            <img src="https://static5.depositphotos.com/1046751/518/i/450/depositphotos_5184243-stock-photo-close-up-of-business-person.jpg" alt="Ventana 5" />
          </div>
          <div className="text-container">
            EDITAR
          </div>
        </Link>
        <Link to="/ventana8" className="grid-item">
          <div className="image-container">
            <img src="https://www.shutterstock.com/image-photo/rhodesian-ridgeback-dog-bandage-on-600nw-1895440579.jpg" alt="Ventana 8" />
          </div>
          <div className="text-container">
            REPORTAR ANIMAL
          </div>
        </Link>
        <Link to="/ventana9" className="grid-item">
          <div className="image-container">
            <img src="https://www.shutterstock.com/image-photo/veterinarian-checking-microchip-implant-under-600nw-1981023950.jpg" alt="Ventana 9" />
          </div>
          <div className="text-container">
            VER REPORTES
          </div>
        </Link>
      </div>
    </div>
  );
}

export default VentanaPrincipal;

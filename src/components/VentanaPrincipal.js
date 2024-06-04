// VentanaPrincipal.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styleSheets/index.css';

function VentanaPrincipal() {
  return (
    <div className="main-container">
      <div className="nav-container">
        {/* Aquí se insertará la barra de navegación */}
      </div>
      <div className="grid-container">
        <Link to="/ventana3" className="grid-item">
          <div className="image-container">
            <img src="https://media.istockphoto.com/id/1307238003/es/foto/la-vida-es-buena-con-un-amigo-fiel-a-tu-lado.jpg?s=612x612&w=0&k=20&c=6Qgx_Q5dmJPJ5py3MEVolOrsueEgvSxC-ojiJtqYdfY=" alt="Ventana 3" />
          </div>
          <div className="text-container">
            Ventana Tres
          </div>
        </Link>
        <Link to="/ventana4" className="grid-item">
          <div className="image-container">
            <img src="https://media.istockphoto.com/id/1211831502/es/foto/no-son-tan-lindos.jpg?s=612x612&w=0&k=20&c=wiBGL4KdMJw_Q9rEwK-Tfp-Jb8z9huvTTmcfps_Nsfw=" alt="Ventana 4" />
          </div>
          <div className="text-container">
            Ventana Cuatro
          </div>
        </Link>
        <Link to="/ventana5" className="grid-item">
          <div className="image-container">
            <img src="https://media.istockphoto.com/id/1307238003/es/foto/la-vida-es-buena-con-un-amigo-fiel-a-tu-lado.jpg?s=612x612&w=0&k=20&c=6Qgx_Q5dmJPJ5py3MEVolOrsueEgvSxC-ojiJtqYdfY=" alt="Ventana 5" />
          </div>
          <div className="text-container">
            Ventana Editar
          </div>
        </Link>
        <Link to="/ventana6" className="grid-item">
          <div className="image-container">
            <img src="https://media.istockphoto.com/id/1211831502/es/foto/no-son-tan-lindos.jpg?s=612x612&w=0&k=20&c=wiBGL4KdMJw_Q9rEwK-Tfp-Jb8z9huvTTmcfps_Nsfw=" alt="Ventana 6" />
          </div>
          <div className="text-container">
            Ventana Seis
          </div>
        </Link>
        <Link to="/ventana7" className="grid-item">
          <div className="image-container">
            <img src="https://media.istockphoto.com/id/1211831502/es/foto/no-son-tan-lindos.jpg?s=612x612&w=0&k=20&c=wiBGL4KdMJw_Q9rEwK-Tfp-Jb8z9huvTTmcfps_Nsfw=" alt="Ventana 7" />
          </div>
          <div className="text-container">
            Ventana Siete
          </div>
        </Link>
        <Link to="/ventana8" className="grid-item">
          <div className="image-container">
            <img src="https://www.shutterstock.com/image-photo/rhodesian-ridgeback-dog-bandage-on-600nw-1895440579.jpg" alt="Ventana 8" />
          </div>
          <div className="text-container">
            Ventana Reportar
          </div>
        </Link>
        <Link to="/ventana9" className="grid-item">
          <div className="image-container">
            <img src="https://www.shutterstock.com/image-photo/rhodesian-ridgeback-dog-bandage-on-600nw-1895440579.jpg" alt="Ventana 9" />
          </div>
          <div className="text-container">
            Ventana Reportes
          </div>
        </Link>
        <Link to="/ventana10" className="grid-item">
          <div className="image-container">
            <img src="https://media.istockphoto.com/id/1211831502/es/foto/no-son-tan-lindos.jpg?s=612x612&w=0&k=20&c=wiBGL4KdMJw_Q9rEwK-Tfp-Jb8z9huvTTmcfps_Nsfw=" alt="Ventana 10" />
          </div>
          <div className="text-container">
            Ventana Diez
          </div>
        </Link>
      </div>
    </div>
  );
}

export default VentanaPrincipal;

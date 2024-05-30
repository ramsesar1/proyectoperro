// VentanaNueve.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './VentanaNueve.css'; 

const VentanaNueve = () => {
  const [reportes, setReportes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/reportes_animales');
        setReportes(response.data);
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
      }
    };

    fetchReportes();
  }, []);

  const filteredReportes = reportes.filter((reporte) => {
    return (
      reporte.tipo_animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporte.edad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporte.genero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporte.raza.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporte.tipo_reporte.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporte.nombre_reportador.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h2>Ventana Nueve</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Ir a Ventana Principal</Link>
          </li>
          <li>
            <Link to="/ventana2">Ir a Ventana Secundaria</Link>
          </li>
        </ul>
      </nav>

      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="reportes-list">
        {filteredReportes.map((reporte) => (
          <div key={reporte.id} className="reporte-card">
            {reporte.foto_reporte && (
              <img
                src={`data:image/jpeg;base64,${btoa(
                  new Uint8Array(reporte.foto_reporte.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                  )
                )}`}
                alt="Foto del reporte"
                className="reporte-foto"
              />
            )}
            <p><strong>Fecha del reporte:</strong> {new Date(reporte.fecha_reporte).toLocaleString()}</p>
            <p><strong>Tipo de reporte:</strong> {reporte.tipo_reporte}</p>
            <p><strong>Nombre del reportador:</strong> {reporte.nombre_reportador}</p>
            <p><strong>Teléfono del reportador:</strong> {reporte.telefono_reportador}</p>
            <p><strong>Tipo de animal:</strong> {reporte.tipo_animal}</p>
            <p><strong>Edad:</strong> {reporte.edad}</p>
            <p><strong>Género:</strong> {reporte.genero}</p>
            <p><strong>Raza:</strong> {reporte.raza}</p>
            <p><strong>Ciudad y estado/provincia:</strong> {reporte.ciudad}, {reporte.estado_provincia}</p>
            <p><strong>Circunstancias:</strong> {reporte.circunstancias}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VentanaNueve;

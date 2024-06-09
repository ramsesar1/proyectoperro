import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styleSheets/VentanaNueve.css';
import NavBar from './NavBar';

const VentanaNueve = () => {
  const [reportes, setReportes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [nuevosComentarios, setNuevosComentarios] = useState({});

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/reportes_animales');
        const reportesConComentarios = await Promise.all(response.data.map(async (reporte) => {
          const comentariosResponse = await axios.get(`http://localhost:3001/api/comentarios/${reporte.id}`);
          return { ...reporte, comentarios: comentariosResponse.data };
        }));
        setReportes(reportesConComentarios);
        const initialComentarios = {};
        reportesConComentarios.forEach(reporte => {
          initialComentarios[reporte.id] = '';
        });
        setNuevosComentarios(initialComentarios);
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
      }
    };

    fetchReportes();
  }, []);

  const handleAddComentario = async (reporteId) => {
    if (!nuevosComentarios[reporteId].trim()) return;
    try {
      await axios.post('http://localhost:3001/api/comentarios', {
        reporteId,
        comentario: nuevosComentarios[reporteId].trim(),
      });
      const comentariosResponse = await axios.get(`http://localhost:3001/api/comentarios/${reporteId}`);
      const updatedReportes = reportes.map(reporte => {
        if (reporte.id === reporteId) {
          return { ...reporte, comentarios: comentariosResponse.data };
        }
        return reporte;
      });
      setReportes(updatedReportes);
      const updatedComentarios = { ...nuevosComentarios, [reporteId]: '' };
      setNuevosComentarios(updatedComentarios);
    } catch (error) {
      console.error('Error al añadir el comentario:', error);
    }
  };

  const filterReportes = (reporte, searchTerm) => {
    const terms = searchTerm.toLowerCase().split(',').map(term => term.trim());
    return terms.every(term => 
      reporte.tipo_animal.toLowerCase().includes(term) ||
      reporte.edad.toLowerCase().includes(term) ||
      reporte.genero.toLowerCase().includes(term) ||
      reporte.raza.toLowerCase().includes(term) ||
      reporte.tipo_reporte.toLowerCase().includes(term) ||
      reporte.nombre_reportador.toLowerCase().includes(term) ||
      reporte.ciudad.toLowerCase().includes(term) ||
      reporte.estado_provincia.toLowerCase().includes(term) ||
      reporte.circunstancias.toLowerCase().includes(term) ||
      new Date(reporte.fecha_reporte).toLocaleDateString().includes(term)
    );
  };

  const filteredReportes = reportes.filter(reporte => filterReportes(reporte, searchTerm));

  return (
    <div>
      <div className="editUser-container">
        <NavBar title="Buscar reportes" />
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

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

            <div className="add-comentario">
              <input
                type="text"
                placeholder="Añadir comentario..."
                value={nuevosComentarios[reporte.id]}
                onChange={(e) => {
                  const updatedComentarios = {...nuevosComentarios};
                  updatedComentarios[reporte.id] = e.target.value;
                  setNuevosComentarios(updatedComentarios);
                }}
              />
              <button onClick={() => handleAddComentario(reporte.id)}>Enviar</button>
            </div>

            <div className="actualizaciones-section">
              <h3>Actualizaciones:</h3>
              {reporte.comentarios && reporte.comentarios.map((comentario, index) => (
                <p key={index}>{comentario}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VentanaNueve;

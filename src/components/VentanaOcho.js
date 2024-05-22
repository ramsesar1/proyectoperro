import React, { useState } from 'react';
import axios from 'axios';

const ReporteAnimal = () => {
  const [tipoReporte, setTipoReporte] = useState('perdido');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccionReportero, setDireccionReportero] = useState('');

  const [tipoAnimal, setTipoAnimal] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [tamano, setTamano] = useState('');
  const [raza, setRaza] = useState('');

  const [direccionAnimal, setDireccionAnimal] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [estado, setEstado] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');

  const [fechaAvistamiento, setFechaAvistamiento] = useState('');
  const [descripcionEstado, setDescripcionEstado] = useState('');
  const [circunstancias, setCircunstancias] = useState('');
  const [imagenes, setImagenes] = useState(null);

  const handleFileChange = (event) => {
    setImagenes(event.target.files);
  };

  const handleCancel = () => {
    setTipoReporte('perdido');
    setNombre('');
    setCorreo('');
    setTelefono('');
    setDireccionReportero('');
    setTipoAnimal('');
    setEdad('');
    setGenero('');
    setTamano('');
    setRaza('');
    setDireccionAnimal('');
    setCiudad('');
    setEstado('');
    setCodigoPostal('');
    setFechaAvistamiento('');
    setDescripcionEstado('');
    setCircunstancias('');
    setImagenes(null);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuario no autenticado');
      return;
    }

    const formData = new FormData();
    formData.append('usuario_id', userId);
    formData.append('tipoReporte', tipoReporte);
    formData.append('nombre', nombre);
    formData.append('correo', correo);
    formData.append('telefono', telefono);
    formData.append('direccionReportero', direccionReportero);
    formData.append('tipoAnimal', tipoAnimal);
    formData.append('edad', edad);
    formData.append('genero', genero);
    formData.append('tamano', tamano);
    formData.append('raza', raza);
    formData.append('direccionAnimal', direccionAnimal);
    formData.append('ciudad', ciudad);
    formData.append('estado', estado);
    formData.append('codigoPostal', codigoPostal);
    formData.append('fechaAvistamiento', fechaAvistamiento);
    formData.append('descripcionEstado', descripcionEstado);
    formData.append('circunstancias', circunstancias);
    if (imagenes) {
      for (const file of imagenes) {
        formData.append('imagenes', file);
      }
    }

    try {
      const response = await axios.post('http://localhost:3001/api/reporte_animal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('Reporte enviado exitosamente');
        handleCancel();
      } else {
        alert('Error al enviar el reporte');
      }
    } catch (error) {
      console.error('Error al enviar el reporte:', error);
    }
  };

  return (
    <div>
      <h2>Reporte de Animal</h2>
      <div>
        <label>Tipo de Reporte:</label>
        <select value={tipoReporte} onChange={(e) => setTipoReporte(e.target.value)}>
          <option value="perdido">Animal Perdido</option>
          <option value="adopcion">Adopción</option>
          <option value="maltrato">Maltrato</option>
          <option value="encontrado">Animal Encontrado</option>
        </select>
      </div>

      <h3>Información del Reportador</h3>
      <div>
        <label>Nombre Completo:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Correo Electrónico:</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>
      <div>
        <label>Número Telefónico:</label>
        <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </div>
      <div>
        <label>Dirección:</label>
        <input type="text" value={direccionReportero} onChange={(e) => setDireccionReportero(e.target.value)} />
      </div>

      <h3>Información del Animal</h3>
      <div>
        <label>Tipo de Animal:</label>
        <input type="text" value={tipoAnimal} onChange={(e) => setTipoAnimal(e.target.value)} />
      </div>
      <div>
        <label>Edad (aproximado):</label>
        <input type="text" value={edad} onChange={(e) => setEdad(e.target.value)} />
      </div>
      <div>
        <label>Género:</label>
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Seleccione</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Desconocido">Desconocido</option>
        </select>
      </div>
      <div>
        <label>Tamaño:</label>
        <input type="text" value={tamano} onChange={(e) => setTamano(e.target.value)} />
      </div>
      <div>
        <label>Raza (si es conocida):</label>
        <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} />
      </div>

      <h3>Ubicación</h3>
      <div>
        <label>Dirección donde se encontró al animal:</label>
        <input type="text" value={direccionAnimal} onChange={(e) => setDireccionAnimal(e.target.value)} />
      </div>
      <div>
        <label>Ciudad:</label>
        <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
      </div>
      <div>
        <label>Estado/Provincia:</label>
        <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
      </div>
      <div>
        <label>Código Postal:</label>
        <input type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
      </div>

      <h3>Detalles del Avistamiento o Situación</h3>
      <div>
        <label>Fecha y hora del avistamiento:</label>
        <input type="datetime-local" value={fechaAvistamiento} onChange={(e) => setFechaAvistamiento(e.target.value)} />
      </div>
      <div>
        <label>Descripción del estado del animal (salud, comportamiento, etc.):</label>
        <textarea value={descripcionEstado} onChange={(e) => setDescripcionEstado(e.target.value)}></textarea>
      </div>
      <div>
        <label>Circunstancias del hallazgo (abandonado, herido, perdido, etc.):</label>
        <textarea value={circunstancias} onChange={(e) => setCircunstancias(e.target.value)}></textarea>
      </div>

      <div>
        <label>Adjuntar Imágenes:</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>

      <div>
        <button onClick={handleCancel}>Cancelar</button>
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default ReporteAnimal;

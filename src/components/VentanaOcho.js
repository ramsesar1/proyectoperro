// ReporteAnimal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './styleSheets/ReporteStyle.css';
import { useNavigate } from 'react-router-dom';


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
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState(null);

  const [reportesUsuario, setReportesUsuario] = useState([]);
  const [selectedReporteId, setSelectedReporteId] = useState('');
  const navigate = useNavigate();


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImagen(file);

    const fileUrl = URL.createObjectURL(file);
    setImagenURL(fileUrl);
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
    setImagen(null);
    setImagenURL(null);
    navigate('/ventana1');

  };

  const [isEditMode, setIsEditMode] = useState(false);

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
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      const response = await axios.post('http://api.ramsseseses.com/api/reporte_animal', formData, {
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

  useEffect(() => {
    const fetchReportesUsuario = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(`http://api.ramsseseses.com/api/reportes_animales/${userId}`);
        setReportesUsuario(response.data);
      } catch (error) {
        console.error('Error al cargar los reportes del usuario:', error);
      }
    };

    fetchReportesUsuario();
  }, []);

  const handleUpdate = async () => {
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
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      const response = await axios.put(`http://api.ramsseseses.com/api/reporte_animal/${selectedReporteId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('Reporte actualizado exitosamente');
        handleCancel();
        setIsEditMode(false);
      } else {
        alert('Error al actualizar el reporte');
      }
    } catch (error) {
      console.error('Error al actualizar el reporte:', error);
    }
  };

  const handleSelectedReporteChange = (reporteId) => {
    setSelectedReporteId(reporteId);
    if (reporteId) {
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
    // Obtener el reporte seleccionado
    const reporteSeleccionado = reportesUsuario.find(reporte => reporte.id === parseInt(reporteId));
    // Llenar los campos con la información del reporte seleccionado
    if (reporteSeleccionado) {
      const fechaHoraAvistamiento = new Date(reporteSeleccionado.fecha_avistamiento);
      const formattedFechaHoraAvistamiento = `${fechaHoraAvistamiento.getFullYear()}-${('0' + (fechaHoraAvistamiento.getMonth() + 1)).slice(-2)}-${('0' + fechaHoraAvistamiento.getDate()).slice(-2)}T${('0' + fechaHoraAvistamiento.getHours()).slice(-2)}:${('0' + fechaHoraAvistamiento.getMinutes()).slice(-2)}`;

      setTipoReporte(reporteSeleccionado.tipo_reporte);
      setNombre(reporteSeleccionado.nombre_reportador);
      setCorreo(reporteSeleccionado.correo_reportador);
      setTelefono(reporteSeleccionado.telefono_reportador);
      setDireccionReportero(reporteSeleccionado.direccion_reportador);
      setTipoAnimal(reporteSeleccionado.tipo_animal);
      setEdad(reporteSeleccionado.edad);
      setGenero(reporteSeleccionado.genero);
      setTamano(reporteSeleccionado.tamano);
      setRaza(reporteSeleccionado.raza);
      setDireccionAnimal(reporteSeleccionado.direccion_animal);
      setCiudad(reporteSeleccionado.ciudad);
      setEstado(reporteSeleccionado.estado_provincia);
      setCodigoPostal(reporteSeleccionado.codigo_postal);
      setFechaAvistamiento(formattedFechaHoraAvistamiento);
      setDescripcionEstado(reporteSeleccionado.descripcion_estado);
      setCircunstancias(reporteSeleccionado.circunstancias);
      // Si hay imagen en el reporte, establecer la URL de la imagen
      if (reporteSeleccionado.foto_reporte) {
        const reader = new FileReader();
        reader.readAsDataURL(new Blob([reporteSeleccionado.foto_reporte.data]));
        reader.onloadend = () => {
          setImagenURL(reader.result);
        };
      } else {
        setImagenURL(null);
      }
    }
  };

  return (
    <div>
      <div className="nav-container">
        <NavBar title="Reporte de Animal" />
      </div>
      <div className="form-container">
        <form className="report-form">
          <div>
            <label>Seleccionar Reporte Existente:</label>
            <select value={selectedReporteId} onChange={(e) => handleSelectedReporteChange(e.target.value)}>
              <option value="">Nuevo Reporte</option>
              {reportesUsuario.map((reporte) => (
                <option key={reporte.id} value={reporte.id}>
                  {reporte.tipo_animal} - {reporte.ciudad} ({new Date(reporte.fecha_reporte).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>
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
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre Completo" />
          </div>
          <div>
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo Electrónico" />
          </div>
          <div>
            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Número Telefónico" />
          </div>
          <div>
            <input type="text" value={direccionReportero} onChange={(e) => setDireccionReportero(e.target.value)} placeholder="Dirección" />
          </div>

          <h3>Información del Animal</h3>
          <div>
            <input type="text" value={tipoAnimal} onChange={(e) => setTipoAnimal(e.target.value)} placeholder="Tipo de Animal" />
          </div>
          <div>
            <input type="text" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Edad (aproximado)" />
          </div>
          <div>
            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="">Seleccione</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Desconocido">Desconocido</option>
            </select>
          </div>
          <div>
            <input type="text" value={tamano} onChange={(e) => setTamano(e.target.value)} placeholder="Tamaño" />
          </div>
          <div>
            <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} placeholder="Raza (si es conocida)" />
          </div>

          <h3>Ubicación</h3>
          <div>
            <input type="text" value={direccionAnimal} onChange={(e) => setDireccionAnimal(e.target.value)} placeholder="Dirección donde se encontró al animal" />
          </div>
          <div>
            <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ciudad" />
          </div>
          <div>
            <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} placeholder="Estado/Provincia" />
          </div>
          <div>
            <input type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} placeholder="Código Postal" />
          </div>

          <h3>Detalles del Avistamiento o Situación</h3>
          <div>
            <input type="datetime-local" value={fechaAvistamiento} onChange={(e) => setFechaAvistamiento(e.target.value)} />
          </div>
          <div>
            <textarea value={descripcionEstado} onChange={(e) => setDescripcionEstado(e.target.value)} placeholder="Descripción del estado del animal (salud, comportamiento, etc.)"></textarea>
          </div>
          <div>
            <textarea value={circunstancias} onChange={(e) => setCircunstancias(e.target.value)} placeholder="Circunstancias del hallazgo (abandonado, herido, perdido, etc.)"></textarea>
          </div>

          <div>
            <label>Adjuntar Imágenes:</label>
            <input type="file" onChange={handleFileChange} />
            {imagenURL && <img src={imagenURL} alt="Reporte" style={{ width: '200px', height: '200px' }} />}
          </div>

          <div className="button-container">
            <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
            {isEditMode ? (
              <button className="submit-button" onClick={handleUpdate}>Editar</button>
            ) : (
              <button className="submit-button" onClick={handleSubmit}>Enviar</button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default ReporteAnimal;

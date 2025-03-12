import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styleSheets/editAnimalStyle.css';
import NavBar from './NavBar';

const Vacunas = () => {
  const [animales, setAnimales] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [vacunas, setVacunas] = useState([]);
  const [selectedVacuna, setSelectedVacuna] = useState('');
  const [nombrevacuna, setNombreVacuna] = useState('');
  const [fechavacuna, setFechaVacuna] = useState('');
  const [fechaSiguienteDosis, setFechaSiguienteDosis] = useState('');
  const [dosisCantidad, setDosisCantidad] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimales = async () => {
      const userId = localStorage.getItem('userId');
      const nivelAccess = localStorage.getItem('nivelAccess');
      const response = await axios.get(`http://localhost:3001/api/obtener_animales/${userId}?nivelAccess=${nivelAccess}`);
      setAnimales(response.data || []);
    };
    fetchAnimales();
  }, []);

  useEffect(() => {
    if (selectedAnimal) {
      const fetchVacunas = async () => {
        const response = await axios.get(`http://localhost:3001/api/obtener_vacunas/${selectedAnimal}`);
        setVacunas(response.data || []);
      };
      fetchVacunas();
    } else {
      setVacunas([]);
    }
  }, [selectedAnimal]);

  useEffect(() => {
    const selectedVacunaData = vacunas.find(vacuna => vacuna.id === parseInt(selectedVacuna));
    if (selectedVacunaData) {
      setNombreVacuna(selectedVacunaData.nombrevacuna);
      setFechaVacuna(formatDate(selectedVacunaData.fechavacuna));
      setFechaSiguienteDosis(formatDate(selectedVacunaData.fecha_siguiente_dosis));
      setDosisCantidad(selectedVacunaData.dosis_cantidad.toString());
    } else {
      setNombreVacuna('');
      setFechaVacuna('');
      setFechaSiguienteDosis('');
      setDosisCantidad('');
    }
  }, [selectedVacuna, vacunas]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleAddOrUpdateVacuna = async () => {
    if (!selectedAnimal) {
      alert('Selecciona un animal');
      return;
    }

    const vacunaData = {
      animalId: selectedAnimal,
      nombrevacuna,
      fechavacuna,
      fecha_siguiente_dosis: fechaSiguienteDosis,
      dosis_cantidad: dosisCantidad,
    };

    try {
      let response;
      if (selectedVacuna) {
        vacunaData.id = selectedVacuna;
        response = await axios.post('http://localhost:3001/api/actualizar_vacuna', vacunaData);
      } else {
        response = await axios.post('http://localhost:3001/api/crear_vacuna', vacunaData);
      }

      if (response.data.success) {
        alert('Vacuna registrada/actualizada exitosamente');
        const updatedVacunas = await axios.get(`http://localhost:3001/api/obtener_vacunas/${selectedAnimal}`);
        setVacunas(updatedVacunas.data || []);
        setSelectedVacuna('');
      } else {
        alert('Error al registrar/actualizar la vacuna');
      }
    } catch (error) {
      console.error('Error al registrar/actualizar la vacuna:', error);
    }
  };

  const handleDeleteVacuna = async () => {
    if (!selectedVacuna) {
      alert('Selecciona una vacuna');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/eliminar_vacuna', { vacunaId: selectedVacuna });
      if (response.data.success) {
        alert('Vacuna eliminada exitosamente');
        setVacunas(vacunas.filter(vacuna => vacuna.id !== parseInt(selectedVacuna)));
        setSelectedVacuna('');
        setNombreVacuna('');
        setFechaVacuna('');
        setFechaSiguienteDosis('');
        setDosisCantidad('');
      } else {
        alert('Error al eliminar la vacuna');
      }
    } catch (error) {
      console.error('Error al eliminar la vacuna:', error);
    }
  };

  return (
    <div>
      <div className="nav-container">
        <NavBar title="Cartilla de Vacunación" />
      </div>
      <div className="editAnForm-container">
        <form className="editAnForm">
          <div>
            <label>Seleccionar Animal:</label>
            <select value={selectedAnimal} onChange={(e) => setSelectedAnimal(e.target.value)}>
              <option value="">Seleccione</option>
              {animales.map(animal => (
                <option key={animal.id} value={animal.id}>{animal.nombre}</option>
              ))}
            </select>
          </div>
          {selectedAnimal && (
            <div>
              <label>Seleccionar Vacuna:</label>
              <select value={selectedVacuna} onChange={(e) => setSelectedVacuna(e.target.value)}>
                <option value="">Nueva Vacuna</option>
                {vacunas.map(vacuna => (
                  <option key={vacuna.id} value={vacuna.id}>{vacuna.nombrevacuna}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label>Nombre de la Vacuna:</label>
            <input type="text" value={nombrevacuna} onChange={(e) => setNombreVacuna(e.target.value)} />
          </div>
          <div>
            <label>Fecha de Vacunación:</label>
            <input type="date" value={fechavacuna} onChange={(e) => setFechaVacuna(e.target.value)} />
          </div>
          <div>
            <label>Fecha de Siguiente Dosis:</label>
            <input type="date" value={fechaSiguienteDosis} onChange={(e) => setFechaSiguienteDosis(e.target.value)} />
          </div>
          <div>
            <label>Cantidad de Dosis (ml/mg):</label>
            <input type="number" value={dosisCantidad} onChange={(e) => setDosisCantidad(e.target.value)} />
          </div>
          <div className="button-container">
            <button type="button" className="submit-button" onClick={handleAddOrUpdateVacuna}>
              {selectedVacuna ? 'Actualizar Vacuna' : 'Registrar Vacuna'}
            </button>
            {selectedVacuna && (
              <button type="button" className="cancel-button" onClick={handleDeleteVacuna}>
                Eliminar Vacuna
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Vacunas;

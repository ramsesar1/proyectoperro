import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './styleSheets/registroAnimalStyle.css';

const VentanaTres = () => {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [foto, setFoto] = useState(null);
  const [cartillaFoto, setCartillaFoto] = useState(null);

  const handleRegisterAnimal = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuario no autenticado');
      return;
    }

    const formData = new FormData();
    formData.append('usuario_id', userId);
    formData.append('nombre', nombre);
    formData.append('especie', especie);
    formData.append('raza', raza);
    formData.append('edad', edad);
    formData.append('peso', peso);
    if (foto) {
      formData.append('foto', foto);
    }
    if (cartillaFoto) {
      formData.append('cartillaFoto', cartillaFoto);
    }

    try {
      const response = await axios.post('http://api.ramsseseses.com/api/registro_animal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        alert('Animal registrado exitosamente');
        setNombre('');
        setEspecie('');
        setRaza('');
        setEdad('');
        setPeso('');
        setFoto(null);
        setCartillaFoto(null);
      } else {
        alert('Error al registrar el animal');
      }
    } catch (error) {
      console.error('Error al registrar el animal:', error);
    }
  };

  return (
    <div>
      <div className="navRegAni-container">
        <NavBar title="Registrar animal" />
      </div>
      <div className="formRegAni-container">
        <form className="register-form">
          <div>
            <label>Nombre del Animal:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div>
            <label>Especie:</label>
            <input type="text" value={especie} onChange={(e) => setEspecie(e.target.value)} />
          </div>
          <div>
            <label>Raza:</label>
            <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} />
          </div>
          <div>
            <label>Edad:</label>
            <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />
          </div>
          <div>
            <label>Peso:</label>
            <input type="number" step="0.01" value={peso} onChange={(e) => setPeso(e.target.value)} />
          </div>
          <div>
            <label>Foto:</label>
            <input type="file" onChange={(e) => setFoto(e.target.files[0])} />
          </div>
          <div>
            <label>Cartilla Foto:</label>
            <input type="file" onChange={(e) => setCartillaFoto(e.target.files[0])} />
          </div>
          <div className="button-container">
            <button type="button" onClick={handleRegisterAnimal} className="submit-button">Registrar Animal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VentanaTres;
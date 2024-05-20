import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:3001/api/registro_animal', formData, {
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
      <h2>Registrar Animal</h2>
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
      <button onClick={handleRegisterAnimal}>Registrar Animal</button>
    </div>
  );
};

export default VentanaTres;

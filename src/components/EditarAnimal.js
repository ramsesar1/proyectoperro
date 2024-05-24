import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VentanaEdiAnimal = () => {
  const [animales, setAnimales] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [foto, setFoto] = useState(null);
  const [cartillafoto, setCartillafoto] = useState(null);
  const [fotoUrl, setFotoUrl] = useState('');
  const [cartillafotoUrl, setCartillafotoUrl] = useState('');

  useEffect(() => {
    const selectedAnimalData = animales.find(animal => animal.id === parseInt(selectedAnimal));
    if (selectedAnimalData) {
      setNombre(selectedAnimalData.nombre);
      setEspecie(selectedAnimalData.especie);
      setRaza(selectedAnimalData.raza);
      setEdad(selectedAnimalData.edad.toString());
      setPeso(selectedAnimalData.peso.toString());
      if (selectedAnimalData.foto) {
        setFotoUrl(`data:image/jpeg;base64,${selectedAnimalData.foto}`);
      }
      if (selectedAnimalData.cartillafoto) {
        setCartillafotoUrl(`data:image/jpeg;base64,${selectedAnimalData.cartillafoto}`);
      }
    }
  }, [selectedAnimal, animales]);

  useEffect(() => {
    const fetchAnimales = async () => {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:3001/api/obtener_animales/${userId}`);
      setAnimales(response.data);
    };
    fetchAnimales();
  }, []);

  const handleUpdateAnimal = async () => {
    if (!selectedAnimal) {
      alert('Selecciona un animal');
      return;
    }

    const formData = new FormData();
    formData.append('animalId', selectedAnimal);
    if (nombre) formData.append('nombre', nombre);
    if (especie) formData.append('especie', especie);
    if (raza) formData.append('raza', raza);
    if (edad) formData.append('edad', edad);
    if (peso) formData.append('peso', peso);
    if (foto) formData.append('foto', foto);
    if (cartillafoto) formData.append('cartillafoto', cartillafoto);

    try {
      const response = await axios.post('http://localhost:3001/api/actualizar_animal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('Animal actualizado exitosamente');
        setNombre('');
        setEspecie('');
        setRaza('');
        setEdad('');
        setPeso('');
        setFoto(null);
        setCartillafoto(null);
        setFotoUrl('');
        setCartillafotoUrl('');
      } else {
        alert('Error al actualizar el animal');
      }
    } catch (error) {
      console.error('Error al actualizar el animal:', error);
    }
  };

  const handleFileChange = (event, setFile, setFileUrl) => {
    const file = event.target.files[0];
    setFile(file);

    const fileUrl = URL.createObjectURL(file);
    setFileUrl(fileUrl);
  };

  const handleDeleteAnimal = async () => {
    if (!selectedAnimal) {
      alert('Selecciona un animal');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/eliminar_animal', { animalId: selectedAnimal });
      if (response.data.success) {
        alert('Animal eliminado exitosamente');
        setAnimales(animales.filter(animal => animal.id !== parseInt(selectedAnimal)));
        setSelectedAnimal('');
        setNombre('');
        setEspecie('');
        setRaza('');
        setEdad('');
        setPeso('');
        setFoto(null);
        setCartillafoto(null);
        setFotoUrl('');
        setCartillafotoUrl('');
      } else {
        alert('Error al eliminar el animal');
      }
    } catch (error) {
      console.error('Error al eliminar el animal:', error);
    }
  };

  return (
    <div>
      <h2>Editar Animal</h2>
      <div>
        <label>Seleccionar Animal:</label>
        <select value={selectedAnimal} onChange={(e) => setSelectedAnimal(e.target.value)}>
          <option value="">Seleccione</option>
          {animales.map(animal => (
            <option key={animal.id} value={animal.id}>{animal.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Nombre:</label>
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
        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />
      </div>
      <div>
        <label>Foto:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setFoto, setFotoUrl)} />
        {fotoUrl && <img src={fotoUrl} alt="Foto del animal" width="100" />}
      </div>
      <div>
        <label>Cartilla Foto:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setCartillafoto, setCartillafotoUrl)} />
        {cartillafotoUrl && <img src={cartillafotoUrl} alt="Cartilla del animal" width="100" />}
      </div>
      <button onClick={handleUpdateAnimal}>Actualizar Animal</button>
      <button onClick={handleDeleteAnimal}>Eliminar Animal</button>
    </div>
  );
};

export default VentanaEdiAnimal;

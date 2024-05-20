import React, { useState } from 'react';
import axios from 'axios';

function RegistroUsuario() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que la contraseña no esté vacía
    if (!contrasena) {
      alert('Por favor, ingresa una contraseña');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('contrasena', contrasena);
    formData.append('telefono', telefono);
    formData.append('fechaNacimiento', fechaNacimiento);
    formData.append('genero', genero);
    if (fotoPerfil) {
      formData.append('fotoPerfil', fotoPerfil);
    }

    try {
      const response = await axios.post('http://localhost:3001/api/registro_usuario', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Usuario registrado:', response.data);
      setNombre('');
      setApellido('');
      setEmail('');
      setContrasena('');
      setTelefono('');
      setFechaNacimiento('');
      setGenero('');
      setFotoPerfil(null);
    } catch (error) {
      console.error('Error registrando usuario:', error);
    }
  };

  const handleFileChange = (event) => {
    setFotoPerfil(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </div>
      <div>
        <label>Género:</label>
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Seleccione</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div>
        <label>Foto de Perfil:</label>
        <input
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default RegistroUsuario;
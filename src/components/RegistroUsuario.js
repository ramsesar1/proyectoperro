import React, { useState } from 'react';
import axios from 'axios';

function RegistroUsuario() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/usuarios', {
        nombre,
        apellido,
        email,
        contraseña,
        telefono,
        fecha_nacimiento: fechaNacimiento,
        genero,
        foto_perfil: fotoPerfil,
      });
      console.log('Usuario registrado:', response.data);
      // Limpia los campos después del registro
      setNombre('');
      setApellido('');
      setEmail('');
      setContraseña('');
      setTelefono('');
      setFechaNacimiento('');
      setGenero('');
      setFotoPerfil('');
    } catch (error) {
      console.error('Error registrando usuario:', error);
    }
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
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
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
        <label>Foto de Perfil (URL):</label>
        <input
          type="text"
          value={fotoPerfil}
          onChange={(e) => setFotoPerfil(e.target.value)}
        />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default RegistroUsuario;

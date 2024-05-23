import React, { useState } from 'react';
import axios from 'axios';

const VentanaEdiUsu = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [contrasena, setContrasena] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState('');

  const handleUpdateUser = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuario no autenticado');
      return;
    }

    if (!contrasena) {
      alert('Por favor, ingresa tu contraseña actual para confirmar los cambios');
      return;
    }

    if (nuevaContrasena && nuevaContrasena !== confirmarNuevaContrasena) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    if (nombre) formData.append('nombre', nombre);
    if (apellido) formData.append('apellido', apellido);
    if (email) formData.append('email', email);
    if (telefono) formData.append('telefono', telefono);
    if (fechaNacimiento) formData.append('fechaNacimiento', fechaNacimiento);
    if (genero) formData.append('genero', genero);
    if (fotoPerfil) formData.append('fotoPerfil', fotoPerfil);
    formData.append('contrasena', contrasena);
    if (nuevaContrasena) formData.append('nuevaContrasena', nuevaContrasena);

    try {
      const response = await axios.post('http://localhost:3001/api/actualizar_usuario', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('Usuario actualizado exitosamente');
        setNombre('');
        setApellido('');
        setEmail('');
        setTelefono('');
        setFechaNacimiento('');
        setGenero('');
        setFotoPerfil(null);
        setContrasena('');
        setNuevaContrasena('');
        setConfirmarNuevaContrasena('');
      } else {
        alert('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleFileChange = (event) => {
    setFotoPerfil(event.target.files[0]);
  };

  return (
    <div>
      <h2>Editar Usuario</h2>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Apellido:</label>
        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Teléfono:</label>
        <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </div>
      <div>
        <label>Fecha de Nacimiento:</label>
        <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
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
        <input type="file" onChange={handleFileChange} />
      </div>
     
      <div>
        <label>Modificar Contraseña:</label>
        <input type="password" value={nuevaContrasena} onChange={(e) => setNuevaContrasena(e.target.value)} />
      </div>
      <div>
        <label>Confirmar Nueva Contraseña:</label>
        <input type="password" value={confirmarNuevaContrasena} onChange={(e) => setConfirmarNuevaContrasena(e.target.value)} />
      </div>
      <div>
        <label>Contraseña (Para confirmar cambios):</label>
        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
      </div>
      <button onClick={handleUpdateUser}>Actualizar Usuario</button>
    </div>
  );
};

export default VentanaEdiUsu;

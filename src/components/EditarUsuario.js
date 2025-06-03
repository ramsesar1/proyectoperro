import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styleSheets/editUserStyle.css';
import NavBar from './NavBar';

const EditarUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoPerfilUrl, setFotoPerfilUrl] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState('');
  const [nivelAccess, setNivelAccess] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showComboBox, setShowComboBox] = useState(false);
  const [showAccessLevelComboBox, setShowAccessLevelComboBox] = useState(false); 
  const [newAccessLevel, setNewAccessLevel] = useState(''); 
  const [passwordFieldsDisabled, setPasswordFieldsDisabled] = useState(false);
  const [mostrarCamposContrasena, setMostrarCamposContrasena] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Usuario no autenticado');
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:3001/api/obtener_usuario/${userId}`);
        if (response.data.success) {
          const userData = response.data.data;
          setNombre(userData.nombre);
          setApellido(userData.apellido);
          setEmail(userData.email);
          setTelefono(userData.telefono);
  
          const formattedDate = userData.fecha_nacimiento ? userData.fecha_nacimiento.split('T')[0] : '';
          setFechaNacimiento(formattedDate);
          
          setGenero(userData.genero);
  
          if (userData.foto_perfil) {
            setFotoPerfilUrl(`data:image/jpeg;base64,${userData.foto_perfil}`);
          }
  
          setNivelAccess(userData.nivel_access);
          setShowComboBox(userData.nivel_access === 2 || userData.nivel_access === 3);
          setShowAccessLevelComboBox(userData.nivel_access === 3); // combobox de nivel_access si el nivel es 3
  
          if (response.data.usuarios) {
            setUsuarios(response.data.usuarios);
          }
        } else {
          alert('Error al obtener la información del usuario');
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };
  
    fetchUserData();
  }, []);
  
  useEffect(() => {
    const fetchSelectedUserData = async () => {
      if (!selectedUserId) return;
  
      try {
        const response = await axios.get(`http://localhost:3001/api/obtener_usuario/${selectedUserId}`);
        if (response.data.success) {
          const userData = response.data.data;
          setNombre(userData.nombre);
          setApellido(userData.apellido);
          setEmail(userData.email);
          setTelefono(userData.telefono);
  
          const formattedDate = userData.fecha_nacimiento ? userData.fecha_nacimiento.split('T')[0] : '';
          setFechaNacimiento(formattedDate);
          
          setGenero(userData.genero);
  
          if (userData.foto_perfil) {
            setFotoPerfilUrl(`data:image/jpeg;base64,${userData.foto_perfil}`);
          }
  
          setNivelAccess(userData.nivel_access);
          
          // Bloquear los campos de contraseña 
          setPasswordFieldsDisabled(userData.id !== localStorage.getItem('userId'));
        } else {
          alert('Error al obtener la información del usuario seleccionado');
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario seleccionado:', error);
      }
    };
  
    fetchSelectedUserData();
  }, [selectedUserId]);
  
  const handleUpdateUser = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuario no autenticado');
      return;
    }
  
    if (nivelAccess > 1 && !selectedUserId) {
      alert('Por favor, selecciona un usuario');
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
    formData.append('selectedUserId', selectedUserId || userId); 
    if (nombre) formData.append('nombre', nombre);
    if (apellido) formData.append('apellido', apellido);
    if (email !== '') formData.append('email', email);
    if (telefono) formData.append('telefono', telefono);
    if (fechaNacimiento) formData.append('fechaNacimiento', fechaNacimiento);
    if (genero) formData.append('genero', genero);
    if (fotoPerfil) formData.append('fotoPerfil', fotoPerfil);
    formData.append('contrasena', contrasena);
    if (nuevaContrasena) formData.append('nuevaContrasena', nuevaContrasena);
    formData.append('newAccessLevel', newAccessLevel); // Agregar newAccessLevel al formData
  
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
        setFotoPerfilUrl('');  
      } else {
        alert('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFotoPerfil(file);

    const fileUrl = URL.createObjectURL(file);
    setFotoPerfilUrl(fileUrl);
  };

  const handleUserChange = (event) => {
    setSelectedUserId(event.target.value);
  };

  const handleAccessLevelChange = (event) => {
    setNewAccessLevel(event.target.value);
  }; 

  const toggleCamposContrasena = () => {
    setMostrarCamposContrasena(!mostrarCamposContrasena);
  };

  return (
    <div>
      <div className="editUser-container">
        <NavBar title="Información Usuario" />
      </div>
      <div className="formUser-container">
        <form className='formEditUser'>
          {showComboBox && ( 
            <div className="formEditUser-group">
              <label className="formEditUser-label">Seleccionar Usuario:</label>
              <select value={selectedUserId} onChange={handleUserChange} className="formEditUser-input">
                <option value="">Seleccione un usuario</option>
                {usuarios.map((user) => (
                  <option key={user.id} value={user.id}>{`${user.nombre} ${user.apellido}`}</option>
                ))}
              </select>
            </div>
          )}
          {showAccessLevelComboBox && (
            <div className="formEditUser-group">
              <label className="formEditUser-label">Nivel de Acceso:</label>
              <select value={newAccessLevel} onChange={handleAccessLevelChange} className="formEditUser-input">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          )}
          <div className="formEditUser-group">
            <label className="formEditUser-label">Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="formEditUser-input" />
          </div>
          <div className="formEditUser-group">
            <label className="formEditUser-label">Apellido:</label>
            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} className="formEditUser-input" />
          </div>
          <div className="formEditUser-group">
            <label className="formEditUser-label">Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="formEditUser-input" />
          </div>
          <div className="formEditUser-group">
            <label className="formEditUser-label">Teléfono:</label>
            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="formEditUser-input" />
          </div>
          <div className="formEditUser-group">
            <label className="formEditUser-label">Fecha de Nacimiento:</label>
            <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} className="formEditUser-input" />
          </div>
          <div className="formEditUser-group">
            <label className="formEditUser-label">Género:</label>
            <select value={genero} onChange={(e) => setGenero(e.target.value)} className="formEditUser-input">
              <option value="">Seleccione</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="formEditUser-group">
            <label className="formEditUser-label">Foto de Perfil:</label>
            <input type="file" onChange={handleFileChange} className="formEditUser-input" />
            {fotoPerfilUrl && <img className="formEditUser-img" src={fotoPerfilUrl} alt="Foto de Perfil" />}
          </div>
          <div className="formEditUser-group">
            <label className="formEditUser-label"></label>

              <button type="button" onClick={toggleCamposContrasena} className="formEditUser-button-toggle">
                {mostrarCamposContrasena ? "Cancelar Cambio de Contraseña" : "Modificar Contraseña"}
              </button>
            </div>
            {mostrarCamposContrasena && (
              <>
                <div className="formEditUser-group">
                  <label className="formEditUser-label">Nueva Contraseña:</label>
                  <input type="password" value={nuevaContrasena} onChange={(e) => setNuevaContrasena(e.target.value)} className="formEditUser-input" />
                </div>
                <div className="formEditUser-group">
                  <label className="formEditUser-label">Confirmar Nueva Contraseña:</label>
                  <input type="password" value={confirmarNuevaContrasena} onChange={(e) => setConfirmarNuevaContrasena(e.target.value)} className="formEditUser-input" />
                </div>
              </>
            )}


          <div className="formEditUser-group">
            <label className="formEditUser-label">Contraseña (Para confirmar cambios):</label>
            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="formEditUser-input" required />
          </div>
          <div className="formEditUser-button-container">
            <button type="button" onClick={handleUpdateUser} className="formEditUser-button">Actualizar Usuario</button>
          </div>
        </form>
      </div>
    </div>
  );  
};

export default EditarUsuario;

// inicio.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de inicio de sesión
    console.log('Iniciar sesión con:', username, password);
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <div>
        <label>Nombre de Usuario:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button onClick={handleLogin}>Iniciar Sesión</button>
      <div>
        <Link to="/registro">Registrar Usuario</Link>
      </div>
    </div>
  );
}

export default Inicio;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      if (response.data.success) {
        localStorage.setItem('userId', response.data.userId);
        navigate('/ventana1');
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <div>
        <label>Nombre de Usuario:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Iniciar Sesión</button>
      <div>
        <Link to="/registro">Registrar Usuario</Link>
      </div>
    </div>
  );
};

export default LoginComponent;

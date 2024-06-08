import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styleSheets/loginStyle.css'; 
import NavBar from './NavBar';


const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('nivelAccess', response.data.nivelAccess);
        navigate('/ventana1');
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="nav-container">
        <NavBar title="RAMNIMALES" />
      </div>
      <div className="login-box">
        <div className="login-content">
          <h2 className="login-title">Inicio de Sesión</h2>
          <div className="register-link">
            Ingrese sus datos de inicio de sesión o <Link to="/registro">registrar usuario</Link>
          </div>
          <div className="login-field">
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Nombre de Usuario" 
              className="input-field"
            />
            <label className="input-label">Nombre de Usuario</label>
          </div>
          <div className="login-field">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Contraseña" 
              className="input-field"
            />
            <label className="input-label">Contraseña</label>
          </div>
          <button className="login-button" onClick={handleLogin}>Iniciar Sesión</button>
        </div>
        <div className="login-image">
          <img src="https://www.anicura.es/cdn-cgi/image/f=auto,q=60,fit=cover,w=1440,h=1080,g=auto,sharpen=1/AdaptiveImages/powerinit/59231/Puppy%20Header.png?stamp=eedac2d7ef0f5ba3441583da00fd7add601ba375" alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './components/Inicio'; 
import VentanaPrincipal from './components/VentanaPrincipal';
import VentanaSecundaria from './components/VentanaSecundaria';
import VentanaTres from './components/VentanaTres'; 
import VentanaCuatro from './components/VentanaCuatro';
import VentanaCinco from './components/VentanaCinco';
import VentanaSeis from './components/VentanaSeis';
import VentanaSiete from './components/VentanaSiete';
import VentanaOcho from './components/VentanaOcho';
import VentanaNueve from './components/VentanaNueve';
import VentanaDiez from './components/VentanaDiez';
import RegistroUsuario from './components/RegistroUsuario';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log('Iniciar sesión con:', username, password);
    window.location.href = '/ventana1'; 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
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
        } />
        <Route path="/ventana1" element={<VentanaPrincipal />} />
        <Route path="/ventana2" element={<VentanaSecundaria />} />
        <Route path="/ventana3" element={<VentanaTres />} />
        <Route path="/ventana4" element={<VentanaCuatro />} />
        <Route path="/ventana5" element={<VentanaCinco />} />
        <Route path="/ventana6" element={<VentanaSeis />} />
        <Route path="/ventana7" element={<VentanaSiete />} />
        <Route path="/ventana8" element={<VentanaOcho />} />
        <Route path="/ventana9" element={<VentanaNueve />} />
        <Route path="/ventana10" element={<VentanaDiez />} />
        <Route path="/registro" element={<RegistroUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;

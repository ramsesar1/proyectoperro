import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import VentanaPrincipal from './components/VentanaPrincipal';
import VentanaTres from './components/VentanaTres'; 
import VentanaCuatro from './components/VentanaCuatro';
import VentanaCinco from './components/VentanaCinco';
import VentanaOcho from './components/VentanaOcho';
import VentanaNueve from './components/VentanaNueve';
import VentanaEdiAnim from './components/EditarAnimal';
import VentanaEdiUsuar from './components/EditarUsuario';
import RegistroUsuario from './components/RegistroUsuario';
import VacunasVentana from './components/Vacunas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/ventana1" element={<VentanaPrincipal />} />
        <Route path="/ventana3" element={<VentanaTres />} />
        <Route path="/ventana4" element={<VentanaCuatro />} />
        <Route path="/ventana5" element={<VentanaCinco />} />
        <Route path="/ventana8" element={<VentanaOcho />} />
        <Route path="/ventana9" element={<VentanaNueve />} />
        <Route path="/ventanaEdiUsu" element={<VentanaEdiUsuar />} />
        <Route path="/ventanaEdiAni" element={<VentanaEdiAnim />} />
        <Route path="/registro" element={<RegistroUsuario />} />
        <Route path="/vacuna" element={<VacunasVentana />} />
      </Routes>
    </Router>
  );
}

export default App;
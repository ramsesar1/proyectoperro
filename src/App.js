import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import VentanaPrincipal from './components/VentanaPrincipal';
import VentanaRegistro from './components/RegistroAnimal'; 
import VentanaAyuda from './components/VentanaAyuda';
import VentanaUsario from './components/VentanaUsario';
import ReporteAnimal from './components/ReporteAnimal';
import BuscarReporte from './components/BuscarReporte';
import VentanaEdiAnim from './components/EditarAnimal';
import VentanaEdiUsuar from './components/EditarUsuario';
import RegistroUsuario from './components/RegistroUsuario';
import VacunasVentana from './components/Vacunas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/Menu" element={<VentanaPrincipal />} />
        <Route path="/Registro" element={<VentanaRegistro />} />
        <Route path="/Ayuda" element={<VentanaAyuda />} />
        <Route path="/Usuario" element={<VentanaUsario />} />
        <Route path="/ReporteAnimal" element={<ReporteAnimal />} />
        <Route path="/BuscarReporte" element={<BuscarReporte />} />
        <Route path="/EditarUsuario" element={<VentanaEdiUsuar />} />
        <Route path="/EditarAnimal" element={<VentanaEdiAnim />} />
        <Route path="/registro" element={<RegistroUsuario />} />
        <Route path="/vacuna" element={<VacunasVentana />} />
      </Routes>
    </Router>
  );
}

export default App;
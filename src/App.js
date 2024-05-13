// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VentanaPrincipal from './components/VentanaPrincipal';
import VentanaSecundaria from './components/VentanaSecundaria';
import VentanaTres from './components/VentanaTres'; // Importar los componentes de las nuevas ventanas
import VentanaCuatro from './components/VentanaCuatro';
import VentanaCinco from './components/VentanaCinco';
import VentanaSeis from './components/VentanaSeis';
import VentanaSiete from './components/VentanaSiete';
import VentanaOcho from './components/VentanaOcho';
import VentanaNueve from './components/VentanaNueve';
import VentanaDiez from './components/VentanaDiez';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Ventana Principal</Link>
            </li>
            <li>
              <Link to="/ventana2">Ventana Secundaria</Link>
            </li>
            <li>
              <Link to="/ventana3">Ventana Tres</Link>
            </li>
            <li>
              <Link to="/ventana4">Ventana Cuatro</Link>
            </li>
            <li>
              <Link to="/ventana5">Ventana Cinco</Link>
            </li>
            <li>
              <Link to="/ventana6">Ventana Seis</Link>
            </li>
            <li>
              <Link to="/ventana7">Ventana Siete</Link>
            </li>
            <li>
              <Link to="/ventana8">Ventana Ocho</Link>
            </li>
            <li>
              <Link to="/ventana9">Ventana Nueve</Link>
            </li>
            <li>
              <Link to="/ventana10">Ventana Diez</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<VentanaPrincipal />} />
          <Route path="/ventana2" element={<VentanaSecundaria />} />
          <Route path="/ventana3" element={<VentanaTres />} />
          <Route path="/ventana4" element={<VentanaCuatro />} />
          <Route path="/ventana5" element={<VentanaCinco />} />
          <Route path="/ventana6" element={<VentanaSeis />} />
          <Route path="/ventana7" element={<VentanaSiete />} />
          <Route path="/ventana8" element={<VentanaOcho />} />
          <Route path="/ventana9" element={<VentanaNueve />} />
          <Route path="/ventana10" element={<VentanaDiez />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

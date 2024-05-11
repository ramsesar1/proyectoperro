// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VentanaPrincipal from './components/VentanaPrincipal';
import VentanaSecundaria from './components/VentanaSecundaria';

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
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<VentanaPrincipal />} />
          <Route path="/ventana2" element={<VentanaSecundaria />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

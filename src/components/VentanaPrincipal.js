// VentanaPrincipal.js
import React from 'react';

function VentanaPrincipal() {
  return (
    <div>
      <h2>Ventana Principal</h2>
      <button onClick={() => window.location.href='/ventana2'}>
        Ir a Ventana Secundaria
      </button>
    </div>
  );
}

export default VentanaPrincipal;

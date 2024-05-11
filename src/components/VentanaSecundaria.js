// VentanaSecundaria.js
import React from 'react';

function VentanaSecundaria() {
  return (
    <div>
      <h2>Ventana Secundaria</h2>
      <button onClick={() => window.location.href='/'}>Ir a Ventana Principal</button>
    </div>
  );
}

export default VentanaSecundaria;

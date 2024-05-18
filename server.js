// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('./src/db'); // Asegúrate de que db.js está en src
require('dotenv').config();

const app = express();
app.use(express.json());

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Endpoint para registrar un usuario
app.post('/api/registro_usuario', upload.single('fotoPerfil'), (req, res) => {
  const { nombre, apellido, email, contraseña, telefono, fechaNacimiento, genero } = req.body;
  const fotoPerfil = req.file ? req.file.path : null;

  const query = 'INSERT INTO usuarios (nombre, apellido, email, contraseña, telefono, fecha_nacimiento, genero, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [nombre, apellido, email, contraseña, telefono, fechaNacimiento, genero, fotoPerfil];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      res.status(500).send('Error al registrar el usuario');
    } else {
      res.status(200).send('Usuario registrado exitosamente');
    }
  });
});

// Endpoint para probar la conexión a la base de datos
app.get('/api/test-connection', (req, res) => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      res.status(500).send('Error conectando a la base de datos');
    } else {
      res.status(200).send('Conexión a la base de datos exitosa');
    }
  });
});

app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});

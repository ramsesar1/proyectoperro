const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('./src/db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Registro de usuario
app.post('/api/registro_usuario', upload.single('fotoPerfil'), (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;
  const contrasena = req.body.contrasena; 
  console.log(req.body);

  const telefono = req.body.telefono;
  const fechaNacimiento = req.body.fechaNacimiento;
  const genero = req.body.genero;
  const fotoPerfil = req.file ? req.file.path : null;

  const query = 'INSERT INTO usuarios (nombre, apellido, email, contraseña, nivel_access, telefono, fecha_nacimiento, genero, foto_perfil) VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?)';
  const values = [nombre, apellido, email, contrasena, telefono, fechaNacimiento, genero, fotoPerfil];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      res.status(500).send('Error al registrar el usuario');
    } else {
      res.status(200).send('Usuario registrado exitosamente');
    }
  });
});

// Inicio de sesión
app.post('/api/login', (req, res) => {
  console.log('Solicitud de inicio de sesión recibida:', req.body);
  const { username, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE nombre = ? AND contraseña = ?';
  const values = [username, password];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al verificar el inicio de sesión:', err);
      res.status(500).send({ success: false, error: 'Error en el servidor' });
    } else {
      if (results.length > 0) {
        res.status(200).send({ success: true });
      } else {
        res.status(401).send({ success: false, error: 'Nombre de usuario o contrasena incorrectos' });
      }
    }
  });
});

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
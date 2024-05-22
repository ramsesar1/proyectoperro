const express = require('express');
const multer = require('multer');
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

const storage = multer.memoryStorage(); 
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
  const fotoPerfil = req.file ? req.file.buffer : null; 

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


// Editar usuario
app.post('/api/actualizar_usuario', upload.single('fotoPerfil'), (req, res) => {
  const { userId, nombre, apellido, email, telefono, fechaNacimiento, genero, contrasena } = req.body;
  const fotoPerfil = req.file ? req.file.buffer : null;

  const queryVerifyPassword = 'SELECT contraseña FROM usuarios WHERE id = ?';
  db.query(queryVerifyPassword, [userId], (err, results) => {
    if (err) {
      console.error('Error al verificar la contraseña:', err);
      return res.status(500).send({ success: false, error: 'Error en el servidor' });
    }
    if (results.length === 0 || results[0].contraseña !== contrasena) {
      return res.status(401).send({ success: false, error: 'Contraseña incorrecta' });
    }

    let queryUpdate = 'UPDATE usuarios SET ';
    const values = [];
    if (nombre) {
      queryUpdate += 'nombre = ?, ';
      values.push(nombre);
    }
    if (apellido) {
      queryUpdate += 'apellido = ?, ';
      values.push(apellido);
    }
    if (email) {
      queryUpdate += 'email = ?, ';
      values.push(email);
    }
    if (telefono) {
      queryUpdate += 'telefono = ?, ';
      values.push(telefono);
    }
    if (fechaNacimiento) {
      queryUpdate += 'fecha_nacimiento = ?, ';
      values.push(fechaNacimiento);
    }
    if (genero) {
      queryUpdate += 'genero = ?, ';
      values.push(genero);
    }
    if (fotoPerfil) {
      queryUpdate += 'foto_perfil = ?, ';
      values.push(fotoPerfil);
    }

    // Elimina la última coma y espacio
    queryUpdate = queryUpdate.slice(0, -2);
    queryUpdate += ' WHERE id = ?';
    values.push(userId);

    db.query(queryUpdate, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el usuario:', err);
        return res.status(500).send({ success: false, error: 'Error al actualizar el usuario' });
      }
      res.status(200).send({ success: true });
    });
  });
});



// Registro de animal
app.post('/api/registro_animal', upload.fields([{ name: 'foto' }, { name: 'cartillaFoto' }]), (req, res) => {
  const { usuario_id, nombre, especie, raza, edad, peso } = req.body;
  const foto = req.files['foto'] ? req.files['foto'][0].buffer : null;
  const cartillaFoto = req.files['cartillaFoto'] ? req.files['cartillaFoto'][0].buffer : null;

  const query = 'INSERT INTO animales (usuario_id, nombre, especie, raza, edad, peso, foto, cartillafoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [usuario_id, nombre, especie, raza, edad, peso, foto, cartillaFoto];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al registrar el animal:', err);
      res.status(500).send({ success: false, error: 'Error al registrar el animal' });
    } else {
      console.log('Animal registrado exitosamente:');
      console.log(`Usuario ID: ${usuario_id}`);
      console.log(`Nombre: ${nombre}`);
      console.log(`Especie: ${especie}`);
      console.log(`Raza: ${raza}`);
      console.log(`Edad: ${edad}`);
      console.log(`Peso: ${peso}`);
      res.status(200).send({ success: true });
    }
  });
});

//Editar animal
app.get('/api/obtener_animales/:userId', (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM animales WHERE usuario_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener los animales:', err);
      return res.status(500).send({ success: false, error: 'Error en el servidor' });
    }
    res.status(200).send(results);
  });
});

// Actualizar animal
app.post('/api/actualizar_animal', upload.fields([{ name: 'foto' }, { name: 'cartillafoto' }]), (req, res) => {
  const { animalId, nombre, especie, raza, edad, peso } = req.body;
  const foto = req.files['foto'] ? req.files['foto'][0].buffer : null;
  const cartillafoto = req.files['cartillafoto'] ? req.files['cartillafoto'][0].buffer : null;

  let queryUpdate = 'UPDATE animales SET ';
  const values = [];
  if (nombre) {
    queryUpdate += 'nombre = ?, ';
    values.push(nombre);
  }
  if (especie) {
    queryUpdate += 'especie = ?, ';
    values.push(especie);
  }
  if (raza) {
    queryUpdate += 'raza = ?, ';
    values.push(raza);
  }
  if (edad) {
    queryUpdate += 'edad = ?, ';
    values.push(edad);
  }
  if (peso) {
    queryUpdate += 'peso = ?, ';
    values.push(peso);
  }
  if (foto) {
    queryUpdate += 'foto = ?, ';
    values.push(foto);
  }
  if (cartillafoto) {
    queryUpdate += 'cartillafoto = ?, ';
    values.push(cartillafoto);
  }

  queryUpdate = queryUpdate.slice(0, -2);
  queryUpdate += ' WHERE id = ?';
  values.push(animalId);

  db.query(queryUpdate, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el animal:', err);
      return res.status(500).send({ success: false, error: 'Error al actualizar el animal' });
    }
    res.status(200).send({ success: true });
  });
});

// Eliminar animal
app.post('/api/eliminar_animal', (req, res) => {
  const { animalId } = req.body;
  const query = 'DELETE FROM animales WHERE id = ?';
  db.query(query, [animalId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el animal:', err);
      return res.status(500).send({ success: false, error: 'Error al eliminar el animal' });
    }
    res.status(200).send({ success: true });
  });
});


//Reportar animales
app.post('/api/reporte_animal', upload.array('imagenes', 5), (req, res) => {
  const {
    tipoReporte,
    nombre,
    correo,
    telefono,
    direccionReportero,
    tipoAnimal,
    edad,
    genero,
    tamano,
    raza,
    direccionAnimal,
    ciudad,
    estado,
    codigoPostal,
    fechaAvistamiento,
    descripcionEstado,
    circunstancias,
    usuario_id 
  } = req.body;

  const imagenes = req.files ? req.files.map(file => file.buffer) : [];

  const query = ` 
    INSERT INTO reportes_animales (
      tipo_reporte, nombre_reportador, correo_reportador, telefono_reportador, direccion_reportador, 
      tipo_animal, edad, genero, tamano, raza, 
      direccion_animal, ciudad, estado_provincia, codigo_postal, 
      fecha_avistamiento, descripcion_estado, circunstancias, usuario_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    tipoReporte, nombre, correo, telefono, direccionReportero, 
    tipoAnimal, edad, genero, tamano, raza, 
    direccionAnimal, ciudad, estado, codigoPostal, 
    fechaAvistamiento, descripcionEstado, circunstancias, usuario_id
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar el reporte de animal:', err);
      res.status(500).send({ success: false, error: 'Error al insertar el reporte de animal' });
    } else {
      console.log('Reporte de animal insertado exitosamente:');
      res.status(200).send({ success: true });
    }
  });

  //  Logica para subir fotos (aun no)
});




// Inicio de sesión
app.post('/api/login', (req, res) => {
  console.log('Solicitud de inicio de sesión recibida:', req.body);
  const { username, password } = req.body;

  const query = 'SELECT id FROM usuarios WHERE nombre = ? AND contraseña = ?';
  const values = [username, password];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al verificar el inicio de sesión:', err);
      res.status(500).send({ success: false, error: 'Error en el servidor' });
    } else {
      if (results.length > 0) {
        const userId = results[0].id;
        res.status(200).send({ success: true, userId });
      } else {
        res.status(401).send({ success: false, error: 'Nombre de usuario o contraseña incorrectos' });
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

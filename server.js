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

// ---------------------Registro de usuario---------------------
app.post('/api/registro_usuario', upload.single('fotoPerfil'), (req, res) => {
  const { nombre, apellido, email, contrasena, telefono, fechaNacimiento, genero } = req.body;
  const fotoPerfil = req.file ? req.file.buffer : null;

  const query = 'INSERT INTO usuarios (nombre, apellido, email, contraseña, nivel_access, telefono, fecha_nacimiento, genero, foto_perfil) VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?)';
  console.log(query);
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



// Obtener información del usuario
app.get('/api/obtener_usuario/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT nombre, apellido, email, telefono, fecha_nacimiento, genero, foto_perfil, nivel_access FROM usuarios WHERE id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener la información del usuario:', err);
      return res.status(500).send({ success: false, error: 'Error en el servidor' });
    }
    if (results.length === 0) {
      return res.status(404).send({ success: false, error: 'Usuario no encontrado' });
    }
    const user = results[0];
    if (user.foto_perfil) {
      // Convertir la imagen a base64 si existe
      user.foto_perfil = user.foto_perfil.toString('base64');
    }
    if (user.nivel_access === 1) {
      res.status(200).send({ success: true, data: user });
    } else if (user.nivel_access === 2 || user.nivel_access === 3) {
      const queryUsers = 'SELECT id, nombre, apellido FROM usuarios';
      db.query(queryUsers, (err, users) => {
        if (err) {
          console.error('Error al obtener la lista de usuarios:', err);
          return res.status(500).send({ success: false, error: 'Error en el servidor' });
        }
        res.status(200).send({ success: true, data: user, usuarios: users });
      });
    } else {
      // Otros casos de nivel de acceso
      res.status(200).send({ success: true, data: user });
    }
  });
});

// ---------------Editar usuario---------------------
app.post('/api/actualizar_usuario', upload.single('fotoPerfil'), (req, res) => {
  const { userId, selectedUserId, nombre, apellido, email, telefono, fechaNacimiento, genero, contrasena, nuevaContrasena, newAccessLevel } = req.body;
  const fotoPerfil = req.file ? req.file.buffer : null;

  const queryGetAuthUserData = 'SELECT contraseña, nivel_access FROM usuarios WHERE id = ?';
  db.query(queryGetAuthUserData, [userId], (err, authUserResults) => {
    if (err) {
      console.error('Error al obtener la información del usuario autenticado:', err);
      return res.status(500).send({ success: false, error: 'Error en el servidor' });
    }

    if (authUserResults.length === 0) {
      return res.status(404).send({ success: false, error: 'Usuario autenticado no encontrado' });
    }

    const authUserData = authUserResults[0];
    const authUserPassword = authUserData.contraseña;
    const authUserAccessLevel = authUserData.nivel_access;

    // Verificar la contraseña 
    if (authUserPassword !== contrasena) {
      return res.status(401).send({ success: false, error: 'Contraseña incorrecta del usuario autenticado' });
    }

    // usuario autenticado tiene nivel de acceso 1
    if (authUserAccessLevel === 1) {
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
      if (nuevaContrasena) {
        queryUpdate += 'contraseña = ?, ';
        values.push(nuevaContrasena);
      }

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
      return;
    }

    // Si el nivel de acceso es 2 
    if (authUserAccessLevel === 2) {
      if (!selectedUserId) {
        return res.status(400).send({ success: false, error: 'ID del usuario seleccionado no proporcionado' });
      }

      const queryGetSelectedUserData = 'SELECT nivel_access FROM usuarios WHERE id = ?';
      db.query(queryGetSelectedUserData, [selectedUserId], (err, selectedUserResults) => {
        if (err) {
          console.error('Error al obtener la información del usuario seleccionado:', err);
          return res.status(500).send({ success: false, error: 'Error en el servidor' });
        }

        if (selectedUserResults.length === 0) {
          return res.status(404).send({ success: false, error: 'Usuario seleccionado no encontrado' });
        }

        const selectedUserAccessLevel = selectedUserResults[0].nivel_access;

      
        if (authUserAccessLevel < selectedUserAccessLevel) {
          return res.status(403).send({ success: false, error: 'No tienes permisos suficientes para modificar este usuario' });
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
        if (nuevaContrasena) {
          queryUpdate += 'contraseña = ?, ';
          values.push(nuevaContrasena);
        }
        
        queryUpdate = queryUpdate.slice(0, -2);
        queryUpdate += ' WHERE id = ?';
        values.push(selectedUserId);

        db.query(queryUpdate, values, (err, result) => {
          if (err) {
            console.error('Error al actualizar el usuario:', err);
            return res.status(500).send({ success: false, error: 'Error al actualizar el usuario' });
          }
          res.status(200).send({ success: true });
        });
      });
    }

    // nivel de acceso es 3
if (authUserAccessLevel === 3) {
  if (!selectedUserId) {
    return res.status(400).send({ success: false, error: 'ID del usuario seleccionado no proporcionado' });
  }

  const queryGetSelectedUserData = 'SELECT nivel_access FROM usuarios WHERE id = ?';
  db.query(queryGetSelectedUserData, [selectedUserId], (err, selectedUserResults) => {
    if (err) {
      console.error('Error al obtener la información del usuario seleccionado:', err);
      return res.status(500).send({ success: false, error: 'Error en el servidor' });
    }

    if (selectedUserResults.length === 0) {
      return res.status(404).send({ success: false, error: 'Usuario seleccionado no encontrado' });
    }

    const selectedUserAccessLevel = selectedUserResults[0].nivel_access;


    if (authUserAccessLevel !== 3) {
      return res.status(403).send({ success: false, error: 'No tienes permisos suficientes para modificar este usuario' });
    }

    // actualización del usuario seleccionado
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
    if (nuevaContrasena) {
      queryUpdate += 'contraseña = ?, ';
      values.push(nuevaContrasena);
    }
    if (newAccessLevel) { 
      queryUpdate += 'nivel_access = ?, ';
      values.push(newAccessLevel);
    }

    queryUpdate = queryUpdate.slice(0, -2);
    queryUpdate += ' WHERE id = ?';
    values.push(selectedUserId);

    db.query(queryUpdate, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el usuario:', err);
        return res.status(500).send({ success: false, error: 'Error al actualizar el usuario' });
      }
      res.status(200).send({ success: true });
    });
  });
}





  });
});






// ---------------------Registro de animal---------------------
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

// Obtener animales por usuario
app.get('/api/obtener_animales/:userId', (req, res) => {
  const { userId } = req.params;
  const nivelAccess = req.query.nivelAccess; // Nuevo

  let query;
  let values;

  if (nivelAccess === '2' || nivelAccess === '3') {
    query = 'SELECT id, nombre, especie, raza, edad, peso, foto, cartillafoto FROM animales';
    values = [];
  } else {
    query = 'SELECT id, nombre, especie, raza, edad, peso, foto, cartillafoto FROM animales WHERE usuario_id = ?';
    values = [userId];
  }

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al obtener los animales:', err);
      return res.status(500).send({ success: false, error: 'Error en el servidor' });
    }

    results.forEach(animal => {
      if (animal.foto) {
        animal.foto = animal.foto.toString('base64');
      }
      if (animal.cartillafoto) {
        animal.cartillafoto = animal.cartillafoto.toString('base64');
      }
    });

    res.status(200).send(results);
  });
});



// ---------------------Actualizar animal---------------------
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

// ---------------------Reportar animales---------------------
// Ruta para obtener todos los reportes de un usuario específico
app.get('/api/reportes_animales/:usuario_id', (req, res) => {
  const usuario_id = req.params.usuario_id;

  const query = `SELECT * FROM reportes_animales WHERE usuario_id = ?`;

  db.query(query, [usuario_id], (err, results) => {
    if (err) {
      console.error('Error al obtener los reportes de animal:', err);
      res.status(500).send({ success: false, error: 'Error al obtener los reportes de animal' });
    } else {
      res.status(200).send(results);
    }
  });
});

// Ruta para actualizar un reporte de animal
app.post('/api/reporte_animal', upload.single('imagen'), (req, res) => {
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

  const imagen = req.file ? req.file.buffer : null;

  const query = `
    INSERT INTO reportes_animales (
      tipo_reporte, nombre_reportador, correo_reportador, telefono_reportador, direccion_reportador, 
      tipo_animal, edad, genero, tamano, raza, 
      direccion_animal, ciudad, estado_provincia, codigo_postal, 
      fecha_avistamiento, descripcion_estado, circunstancias, usuario_id, foto_reporte
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    tipoReporte, nombre, correo, telefono, direccionReportero, 
    tipoAnimal, edad, genero, tamano, raza, 
    direccionAnimal, ciudad, estado, codigoPostal, 
    fechaAvistamiento, descripcionEstado, circunstancias, usuario_id, imagen
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar el reporte de animal:', err);
      res.status(500).send({ success: false, error: 'Error al insertar el reporte de animal' });
    } else {
      console.log('Reporte de animal insertado exitosamente');
      res.status(200).send({ success: true });
    }
  });
});

// Ruta para obtener el reporte de un usuario específico junto con la imagen
app.get('/api/reporte_animal/:usuario_id', (req, res) => {
  const usuario_id = req.params.usuario_id;

  const query = `SELECT * FROM reportes_animales WHERE usuario_id = ?`;

  db.query(query, [usuario_id], (err, results) => {
    if (err) {
      console.error('Error al obtener el reporte de animal:', err);
      res.status(500).send({ success: false, error: 'Error al obtener el reporte de animal' });
    } else {
      if (results.length > 0) {
        res.status(200).send(results[0]);
      } else {
        res.status(404).send({ success: false, error: 'Reporte no encontrado' });
      }
    }
  });
});


// ---------------------Inicio de sesión---------------------
app.post('/api/login', (req, res) => {
  console.log('Solicitud de inicio de sesión recibida:', req.body);
  const { username, password } = req.body;

  const query = 'SELECT id, nivel_access FROM usuarios WHERE nombre = ? AND contraseña = ?';
  const values = [username, password];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al verificar el inicio de sesión:', err);
      res.status(500).send({ success: false, error: 'Error en el servidor' });
    } else {
      if (results.length > 0) {
        const userId = results[0].id;
        const nivelAccess = results[0].nivel_access;
        res.status(200).send({ success: true, userId, nivelAccess });
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
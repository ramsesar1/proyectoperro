Use albergue;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    nivel_access INT NOT NULL,
    telefono VARCHAR(15),
    fecha_nacimiento DATE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    genero ENUM('Masculino', 'Femenino', 'Otro'),
    foto_perfil LONGBLOB
);

CREATE TABLE animales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raza VARCHAR(50),
    edad INT,
    peso DECIMAL(5,2),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foto LONGBLOB,
    cartillafoto LONGBLOB,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE reportes_animales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_reporte ENUM('perdido', 'adopcion', 'maltrato', 'encontrado') NOT NULL,
    nombre_reportador VARCHAR(100) NOT NULL,
    correo_reportador VARCHAR(100) NOT NULL,
    telefono_reportador VARCHAR(20),
    direccion_reportador VARCHAR(255),
    tipo_animal VARCHAR(50),
    edad VARCHAR(50),
    genero ENUM('Masculino', 'Femenino', 'Desconocido'),
    tamano VARCHAR(50),
    raza VARCHAR(50),
    direccion_animal VARCHAR(255),
    ciudad VARCHAR(100),
    estado_provincia VARCHAR(100),
    codigo_postal VARCHAR(20),
    fecha_avistamiento DATETIME,
    descripcion_estado TEXT,
    circunstancias TEXT,
    usuario_id VARCHAR(255),
    fecha_reporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foto_reporte LONGBLOB,
    comentario VARCHAR (3000)
);



CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reporte_id INT,
    comentario TEXT NOT NULL,
    fecha_comentario DATETIME NOT NULL,
    FOREIGN KEY (reporte_id) REFERENCES reportes_animales(id)
);


CREATE TABLE vacunas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombrevacuna VARCHAR(255) NOT NULL,
    fechavacuna DATE NOT NULL,
    fecha_siguiente_dosis DATE NOT NULL,
    dosis_cantidad INT NOT NULL,
    animal_id INT,
    FOREIGN KEY (animal_id) REFERENCES animales(id) 
);

CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(255),
    nombre VARCHAR(255),
    numero_contacto VARCHAR(20),
    notas TEXT
);

INSERT INTO contactos (categoria, nombre, numero_contacto, notas) VALUES
('Veterinarios', 'Veterinaria Ramírez', '6121684331', NULL),
('Veterinarios', 'Veterinaria Michigan', '6121699331', NULL),
('Asociaciones civiles', 'Protección animal', '2911', NULL),
('Asociaciones civiles', 'Denuncia anónima Protección animal', '3011', NULL),
('Asociaciones civiles', 'Rescate de vida silvestre', '3111', NULL),
('Asociaciones civiles', 'Rescate de vida marina', '3211', NULL),
('Asociaciones civiles', 'Control de plagas', '6122899999', NULL),
('Asociaciones civiles', 'Esterilización y castración', '6129885963', NULL);



CREATE USER 'ramses'@'localhost' IDENTIFIED BY 'ramses';
GRANT ALL PRIVILEGES ON * . * TO 'ramses'@'localhost';
FLUSH PRIVILEGES;



drop table comentarios;

ALTER TABLE usuarios MODIFY COLUMN contraseña VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL;

select * from reportes_animales;
select * from usuarios;
select * from animales;
select * from comentarios;
select * from vacunas;
select * from contactos;

INSERT INTO usuarios (nombre, apellido, email, contraseña, nivel_access, telefono, fecha_nacimiento, genero) 
VALUES 
('sech', 'Pérez', 'sech@sech.com', 'sech', 3, '555-1234', '1980-01-01', 'Masculino');



drop table usuarios;

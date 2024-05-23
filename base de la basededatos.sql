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
    fecha_reporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);


drop table animales;
drop table reportes_animales;


ALTER TABLE usuarios MODIFY COLUMN contraseña VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL;

select * from reportes_animales;
select * from usuarios;
select * from animales;


INSERT INTO usuarios (nombre, apellido, email, contraseña, nivel_access, telefono, fecha_nacimiento, genero) 
VALUES 
('Juan', 'Pérez', '123@123.com', '123', 1, '555-1234', '1980-01-01', 'Masculino');



drop table usuarios;

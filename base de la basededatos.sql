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
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

select * from usuarios;
select * from animales;


INSERT INTO usuarios (nombre, apellido, email, contraseña, nivel_access, telefono, fecha_nacimiento, genero) 
VALUES 
('Juan', 'Pérez', '123@123.com', '123', 1, '555-1234', '1980-01-01', 'Masculino');



drop table usuarios;

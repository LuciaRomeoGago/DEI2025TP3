CREATE DATABASE elTintero;
USE dbeader;

CREATE TABLE alumno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(100) not null,
    email text not null,
    telefono INT NOT NULL,
    fecha_nacimiento INT
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)

CREATE TABLE profesor (
    id int AUTO_INCREMENT PRIMARY key, 
    nombre varchar(100) not null,
    email text not null,
    telefono INT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)

CREATE TABLE materia (
    id int AUTO_INCREMENT PRIMARY key,
    nombre varchar(100) not null,
)

CREATE table contacto (
    id int AUTO_INCREMENT PRIMARY key, 
    nombre varchar(100) not null,
    email text not null,
    mensaje text not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)
-- Tabla intermedia para asignar materias a profesores (relación muchos a muchos)
CREATE TABLE profesor_materia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profesor_id INT NOT NULL,
    materia_id INT NOT NULL,
    FOREIGN KEY (profesor_id) REFERENCES profesor(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materia(id) ON DELETE CASCADE,
    UNIQUE(profesor_id, materia_id)
);

-- Tabla para gestionar horarios disponibles por profesor y materia
CREATE TABLE horario_profesor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profesor_id INT NOT NULL,
    materia_id INT NOT NULL,
    dia_semana ENUM('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    FOREIGN KEY (profesor_id) REFERENCES profesor(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materia(id) ON DELETE CASCADE
);

-- Tabla de reservas (clases reservadas)
CREATE TABLE reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id INT NOT NULL,
    profesor_id INT NOT NULL,
    materia_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado ENUM('pendiente','confirmada','cancelada') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alumno_id) REFERENCES alumno(id) ON DELETE CASCADE,
    FOREIGN KEY (profesor_id) REFERENCES profesor(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materia(id) ON DELETE CASCADE,
    UNIQUE(profesor_id, fecha, hora) -- evita reservas duplicadas para un profesor en misma fecha y hora
);
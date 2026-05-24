CREATE DATABASE IF NOT EXISTS bicitaxi_db;

USE bicitaxi_db;

CREATE TABLE IF NOT EXISTS bicitaxis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100),
    estado VARCHAR(50),
    ubicacion VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS conductores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    licencia VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS ruta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    origen VARCHAR(100),
    destion VARCHAR(100),
    precio int
);

CREATE TABLE IF NOT EXISTS viajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ruta_id INT,
    conductor_id INT,
    bicitaxi_id INT,

    FOREIGN KEY (ruta_id)
    REFERENCES ruta(id),

    FOREIGN KEY (conductor_id)
    REFERENCES conductores(id),

    FOREIGN KEY (bicitaxi_id)
    REFERENCES bicitaxis(id)
);
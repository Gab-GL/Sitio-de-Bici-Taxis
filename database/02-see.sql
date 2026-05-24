USE bicitaxi_db;

-- =========================
-- BICITAXIS
-- =========================
INSERT INTO bicitaxis (modelo, estado, ubicacion) VALUES
('BiciTaxi Eco 1', 'Disponible', 'Centro'),
('BiciTaxi Eco 2', 'En mantenimiento', 'Taller'),
('BiciTaxi Pro 1', 'Disponible', 'Terminal Norte'),
('BiciTaxi Pro 2', 'Ocupado', 'Zona Sur'),
('BiciTaxi City 1', 'Disponible', 'Centro'),
('BiciTaxi City 2', 'Disponible', 'Zona Oriente'),
('BiciTaxi Max 1', 'Ocupado', 'Zona Norte'),
('BiciTaxi Max 2', 'Disponible', 'Terminal Sur');

-- =========================
-- CONDUCTORES
-- =========================
INSERT INTO conductores (nombre, telefono, licencia) VALUES
('Juan Perez', '5512345678', 'LIC-1001'),
('Maria Lopez', '5523456789', 'LIC-1002'),
('Carlos Ramirez', '5534567890', 'LIC-1003'),
('Ana Torres', '5545678901', 'LIC-1004'),
('Luis Hernandez', '5556789012', 'LIC-1005'),
('Sofia Martinez', '5567890123', 'LIC-1006'),
('Pedro Gomez', '5578901234', 'LIC-1007'),
('Laura Diaz', '5589012345', 'LIC-1008');

-- =========================
-- RUTAS
-- =========================
INSERT INTO ruta (origen, destion, precio) VALUES
('Centro', 'Zona Norte', 25),
('Centro', 'Zona Sur', 30),
('Terminal Norte', 'Centro', 20),
('Zona Sur', 'Terminal Norte', 35),
('Zona Oriente', 'Centro', 28),
('Centro', 'Terminal Sur', 32),
('Zona Norte', 'Zona Sur', 40),
('Terminal Sur', 'Zona Oriente', 27);

-- =========================
-- VIAJES
-- =========================
INSERT INTO viajes (ruta_id, conductor_id, bicitaxi_id) VALUES
(1, 1, 1),
(2, 2, 4),
(3, 3, 3),
(4, 4, 2),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8);
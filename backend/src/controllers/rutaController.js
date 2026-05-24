const db = require('../config/db');

const obtenerRutas = (req, res) => {

    const sql = 'SELECT * FROM ruta';

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                error: 'Error al obtener rutas'
            });
        }

        res.json(results);
    });
};

const crearRuta = (req, res) => {

    const { origen, destion, precio } = req.body;

    const sql = `
        INSERT INTO ruta (origen, destion, precio)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [origen, destion, precio],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    error: 'Error al crear ruta'
                });
            }

            res.json({
                message: 'Ruta creada correctamente',
                id: result.insertId
            });
        }
    );
};

const eliminarRuta = (req, res) => {

    const { id } = req.params;

    const sql = 'DELETE FROM ruta WHERE id = ?';

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                error: 'Error al eliminar ruta'
            });
        }

        res.json({
            mensaje: 'Ruta eliminada'
        });
    });
};

const actualizarRuta = (req, res) => {

    const { id } = req.params;

    const { origen, destion, precio } = req.body;

    const sql = `
        UPDATE ruta
        SET origen = ?, destion = ?, precio = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [origen, destion, precio, id],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    error: 'Error al actualizar ruta'
                });
            }

            res.json({
                message: 'Ruta actualizada correctamente'
            });
        }
    );
};

module.exports = {
    obtenerRutas,
    crearRuta,
    eliminarRuta,
    actualizarRuta
};
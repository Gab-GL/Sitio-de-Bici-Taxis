const db = require('../config/db');

const obtenerConductores = (req, res) => {

    const sql = 'SELECT * FROM conductores';

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                error: 'Error al obtener conductores'
            });
        }

        res.json(results);
    });
};

const crearConductor = (req, res) => {

    const { nombre, telefono, licencia } = req.body;

    const sql = `
        INSERT INTO conductores (nombre, telefono, licencia)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [nombre, telefono, licencia],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    error: 'Error al crear conductor'
                });
            }

            res.json({
                message: 'Conductor creado correctamente',
                id: result.insertId
            });
        }
    );
};

const eliminarConductor = (req, res) => {

    const { id } = req.params;

    const sql = 'DELETE FROM conductores WHERE id = ?';

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                error: 'Error al eliminar conductor'
            });
        }

        res.json({
            mensaje: 'Conductor eliminado'
        });
    });
};

const actualizarConductor = (req, res) => {

    const { id } = req.params;

    const { nombre, telefono, licencia } = req.body;

    const sql = `
        UPDATE conductores
        SET nombre = ?, telefono = ?, licencia = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [nombre, telefono, licencia, id],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    error: 'Error al actualizar conductor'
                });
            }

            res.json({
                message: 'Conductor actualizado correctamente'
            });
        }
    );
};

module.exports = {
    obtenerConductores,
    crearConductor,
    eliminarConductor,
    actualizarConductor
};
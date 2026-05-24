const db = require('../config/db');

const obtenerViajes = (req, res) => {

    const sql = `
        SELECT
            viajes.id,

            conductores.id AS conductor_id,
            conductores.nombre AS conductor,

            ruta.id AS ruta_id,
            ruta.origen,
            ruta.destion,
            ruta.precio,

            bicitaxis.id AS bicitaxi_id,
            bicitaxis.modelo AS bicitaxi

        FROM viajes

        INNER JOIN conductores
            ON viajes.conductor_id = conductores.id

        INNER JOIN ruta
            ON viajes.ruta_id = ruta.id

        INNER JOIN bicitaxis
            ON viajes.bicitaxi_id = bicitaxis.id
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                error: 'Error al obtener viajes',
                detalle: err.message
            });
        }

        res.json(results);
    });
};

const crearViaje = (req, res) => {

    const {
        ruta_id,
        conductor_id,
        bicitaxi_id
    } = req.body;

    const sql = `
        INSERT INTO viajes (
            ruta_id,
            conductor_id,
            bicitaxi_id
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            ruta_id,
            conductor_id,
            bicitaxi_id
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    error: 'Error al crear viaje'
                });
            }

            res.json({
                message: 'Viaje creado correctamente',
                id: result.insertId
            });
        }
    );
};

const eliminarViaje = (req, res) => {

    const { id } = req.params;

    const sql = 'DELETE FROM viajes WHERE id = ?';

    db.query(sql, [id], (err) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                error: 'Error al eliminar viaje'
            });
        }

        res.json({
            mensaje: 'Viaje eliminado'
        });
    });
};

const actualizarViaje = (req, res) => {

    const { id } = req.params;

    const {
        ruta_id,
        conductor_id,
        bicitaxi_id
    } = req.body;

    const sql = `
        UPDATE viajes
        SET
            ruta_id = ?,
            conductor_id = ?,
            bicitaxi_id = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            ruta_id,
            conductor_id,
            bicitaxi_id,
            id
        ],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    error: 'Error al actualizar viaje'
                });
            }

            res.json({
                message: 'Viaje actualizado correctamente'
            });
        }
    );
};

module.exports = {
    obtenerViajes,
    crearViaje,
    eliminarViaje,
    actualizarViaje
};
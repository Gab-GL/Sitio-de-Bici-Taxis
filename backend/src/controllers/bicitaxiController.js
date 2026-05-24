const db = require('../config/db');

const obtenerBicitaxis = (req, res) => {

    const sql = 'SELECT * FROM bicitaxis';

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                error: 'Error al obtener bicitaxis'
            });
        }

        res.json(results);
    });
};

const crearBicitaxi = (req, res) => {

    const { modelo, estado, ubicacion } = req.body;

    const sql = `
        INSERT INTO bicitaxis (modelo, estado, ubicacion)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [modelo, estado, ubicacion],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    error: 'Error al crear bicitaxi'
                });
            }

            res.json({
                message: 'Bicitaxi creado correctamente',
                id: result.insertId
            });
        }
    );
};

const eliminarBicitaxi = (req, res) => {

    const { id } = req.params;

    const sql = 'DELETE FROM bicitaxis WHERE id = ?';

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.error(err);

            return res.status(500).json({
                error: 'Error al eliminar bicitaxi'
            });
        }

        res.json({
            mensaje: 'Bicitaxi eliminado'
        });
    });
};

const actualizarBicitaxi = (req, res) => {

    const { id } = req.params;

    const { modelo, estado, ubicacion } = req.body;

    const sql = `
        UPDATE bicitaxis
        SET modelo = ?, estado = ?, ubicacion = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [modelo, estado, ubicacion, id],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    error: 'Error al actualizar bicitaxi'
                });
            }

            res.json({
                message: 'Bicitaxi actualizado correctamente'
            });
        }
    );
};

module.exports = {
    obtenerBicitaxis,
    crearBicitaxi,
    eliminarBicitaxi,
    actualizarBicitaxi
};
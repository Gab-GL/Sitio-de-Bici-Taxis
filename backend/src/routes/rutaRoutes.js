const express = require('express');

const router = express.Router();

const {
    obtenerRutas,
    crearRuta,
    eliminarRuta,
    actualizarRuta
} = require('../controllers/rutaController');

router.get('/', obtenerRutas);

router.post('/', crearRuta);

router.put('/:id', actualizarRuta);

router.delete('/:id', eliminarRuta);

module.exports = router;
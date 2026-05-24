const express = require('express');

const router = express.Router();

const {
    obtenerViajes,
    crearViaje,
    eliminarViaje,
    actualizarViaje
} = require('../controllers/viajeController');

router.get('/', obtenerViajes);

router.post('/', crearViaje);

router.put('/:id', actualizarViaje);

router.delete('/:id', eliminarViaje);

module.exports = router;
const express = require('express');

const router = express.Router();

const {
    obtenerConductores,
    crearConductor,
    eliminarConductor,
    actualizarConductor
} = require('../controllers/conductorController');

router.get('/', obtenerConductores);

router.post('/', crearConductor);

router.put('/:id', actualizarConductor);

router.delete('/:id', eliminarConductor);

module.exports = router;
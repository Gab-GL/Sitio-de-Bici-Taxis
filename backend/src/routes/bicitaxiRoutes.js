const express = require('express');

const router = express.Router();

const {
    obtenerBicitaxis,
    crearBicitaxi,
    eliminarBicitaxi,
    actualizarBicitaxi
} = require('../controllers/bicitaxiController');

router.get('/', obtenerBicitaxis);

router.post('/', crearBicitaxi);

router.put('/:id', actualizarBicitaxi);

router.delete('/:id', eliminarBicitaxi);

module.exports = router;
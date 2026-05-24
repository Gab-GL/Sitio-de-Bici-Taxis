const express = require('express');
const cors = require('cors');

require('./config/db');

const bicitaxiRoutes = require('./routes/bicitaxiRoutes');
const conductorRoutes = require('./routes/conductorRoutes');
const rutaRoutes = require('./routes/rutaRoutes');
const viajeRoutes = require('./routes/viajeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/bicitaxis', bicitaxiRoutes);
app.use('/api/conductores', conductorRoutes);
app.use('/api/rutas', rutaRoutes);
app.use('/api/viajes', viajeRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Servidor funcionando correctamente'
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
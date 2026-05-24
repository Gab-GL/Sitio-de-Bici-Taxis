const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'mysql',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bicitaxi_db'
});

connection.connect((err) => {

    if (err) {
        console.error('Error de conexión:', err);
        return;
    }

    console.log('Conectado a MySQL');
});


module.exports = connection;
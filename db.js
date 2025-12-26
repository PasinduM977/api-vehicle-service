let mysql = require('mysql2')

let db;

function getConnection() {

if (!db) {

    db = mysql.createConnection({

        host: 'localhost',

        user: 'root',

        password: '1234',

        database: 'vehicleservice'

    });

}

return db;

}

module.exports = getConnection();
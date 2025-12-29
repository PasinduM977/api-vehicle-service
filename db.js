// let mysql = require('mysql2')

// let db;

// function getConnection() {

// if (!db) {

//     db = mysql.createConnection({

//         host: 'localhost',

//         user: 'root',

//         password: '1234',

//         database: 'vehicleservice'

//     });

// }

// return db;

// }

// module.exports = getConnection();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,   // adjust based on traffic
  queueLimit: 0
});

module.exports = pool;

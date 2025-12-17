const mysql = require('mysql2');

// DB connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'vehicleservice'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully');
  }
});

/**
 * Get all status
 * GET /
 */
const getAllStatusNames = (req, res) => {
  const sql = `SELECT * FROM status`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch customers' });
    }

    res.json(results);
  });
};

// Export methods
module.exports = {
  getAllStatusNames}
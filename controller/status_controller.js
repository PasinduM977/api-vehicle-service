// DB connection
const getConnection = require("../db");

getConnection.connect((err) => {
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
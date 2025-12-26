// DB connection
const getConnection = require("../db");
const connection =getConnection;

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
const getAllVehicleTypes = (req, res) => {
  const sql = `SELECT * FROM vehicleType`;

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
  getAllVehicleTypes}
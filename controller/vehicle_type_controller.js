// DB connection
const getConnection = require("../db");
const connection =getConnection;

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
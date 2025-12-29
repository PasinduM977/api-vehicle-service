const db = require('../db');

/**
 * GET /vehicle-types
 */
const getAllVehicleTypes = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM vehicletype'
    );

    res.json(rows);
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({
      message: 'Failed to fetch vehicle types'
    });
  }
};

module.exports = {
  getAllVehicleTypes
};

const db = require('../db');

/**
 * Get all status names
 * GET /vehicle-status
 */
const getAllStatusNames = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM status'
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching status names:', error);

    res.status(500).json({
      message: 'Failed to fetch status names'
    });
  }
};

module.exports = {
  getAllStatusNames
};

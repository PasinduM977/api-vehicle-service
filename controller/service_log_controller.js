const db = require('../db');

/**
 * Save new service log
 * POST /
 */
const saveServiceLog = async (req, res) => {
  try {
    const { dateTime, description, fk_serviceId } = req.body;

    if (!dateTime || !description || !fk_serviceId) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const sql = `
      INSERT INTO servicelog (dateTime, description, fk_serviceId)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      dateTime,
      description,
      fk_serviceId
    ]);

    res.status(201).json({
      message: 'Service log saved successfully',
      serviceLogId: result.insertId
    });

  } catch (error) {
    console.error('Save service log error:', error);

    res.status(500).json({
      message: 'Failed to save service log'
    });
  }
};

/**
 * Get service logs by serviceId
 * GET /:serviceId
 */
const getServiceLogsByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const sql = `
      SELECT
        id,
        dateTime,
        description,
        fk_serviceId
      FROM servicelog
      WHERE fk_serviceId = ?
      ORDER BY dateTime ASC
    `;

    const [rows] = await db.query(sql, [serviceId]);

    res.json(rows);

  } catch (error) {
    console.error('Fetch service logs error:', error);

    res.status(500).json({
      message: 'Failed to fetch service logs'
    });
  }
};

module.exports = {
  saveServiceLog,
  getServiceLogsByServiceId
};

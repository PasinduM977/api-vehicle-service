// DB connection
const getConnection = require("../db");
const connection =getConnection;

/**
 * Save new service log
 * POST /
 */
const saveServiceLog = (req, res) => {
  const { dateTime, description, fk_serviceId } = req.body;

  if (!dateTime || !description || !fk_serviceId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `
    INSERT INTO servicelog (dateTime, description, fk_serviceId)
    VALUES (?, ?, ?)
  `;

  connection.query(
    sql,
    [dateTime, description, fk_serviceId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to save service log' });
      }

      res.status(201).json({
        message: 'Service log saved successfully',
        serviceLogId: result.insertId
      });
    }
  );
};

/**
 * Get service logs by serviceId
 * GET /:serviceId
 */
const getServiceLogsByServiceId = (req, res) => {
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

  connection.query(sql, [serviceId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch service logs' });
    }

    res.json(results);
  });
};

// Export methods
module.exports = {
  saveServiceLog,
  getServiceLogsByServiceId
};

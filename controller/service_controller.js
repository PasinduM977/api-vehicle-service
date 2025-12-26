// DB connection
const getConnection = require("../db");
const connection =getConnection;


/**
 * Save new service
 * POST /
 */
const saveService = (req, res) => {
  const { date, fk_vehicleNo, fk_statusId } = req.body;

  if (!date || !fk_vehicleNo || !fk_statusId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `
    INSERT INTO service (date, fk_vehicleNo, fk_statusId)
    VALUES (?, ?, ?)
  `;

  connection.query(
    sql,
    [date, fk_vehicleNo, fk_statusId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.sqlMessage });
      }

      res.status(201).json({
        message: 'Service saved successfully',
        serviceId: result.insertId
      });
    }
  );
};

/**
 * Update service by serviceId
 * PUT /:serviceId
 */
const updateService = (req, res) => {
  const { serviceId } = req.params;
  const { date, fk_vehicleNo, fk_statusId } = req.body;

  const sql = `
    UPDATE service
    SET date = ?, fk_vehicleNo = ?, fk_statusId = ?
    WHERE id = ?
  `;

  connection.query(
    sql,
    [date, fk_vehicleNo, fk_statusId, serviceId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update service' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Service not found' });
      }

      res.json({ message: 'Service updated successfully' });
    }
  );
};

/**
 * Delete service by serviceId
 * DELETE /:serviceId
 */
const deleteService = (req, res) => {
  const { serviceId } = req.params;

  const sql = `DELETE FROM service WHERE id = ?`;

  connection.query(sql, [serviceId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete service' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  });
};

/**
 * Get all services
 * GET /
 * Includes:
 * fk_vehicleNo, nic, customerName, fk_statusId, status
 */
const getAllServices = (req, res) => {
  const sql = `
    SELECT
      s.id AS serviceId,
      s.date,
      s.fk_vehicleNo,
      c.nic,
      c.customerName,
      s.fk_statusId,
      st.status
    FROM service s
    JOIN vehicle v ON s.fk_vehicleNo = v.vehicleNo
    JOIN customer c ON v.fk_nic = c.nic
    JOIN status st ON s.fk_statusId = st.id
    ORDER BY s.date DESC
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch services' });
    }

    res.json(results);
  });
};

// Export methods
module.exports = {
  saveService,
  updateService,
  deleteService,
  getAllServices
};

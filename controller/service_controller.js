const db = require('../db');

/**
 * Save new service
 * POST /
 */
const saveService = async (req, res) => {
  try {
    const { date, fk_vehicleNo, fk_statusId } = req.body;

    if (!date || !fk_vehicleNo || !fk_statusId) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const sql = `
      INSERT INTO service (date, fk_vehicleNo, fk_statusId)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      date,
      fk_vehicleNo,
      fk_statusId
    ]);

    res.status(201).json({
      message: 'Service saved successfully',
      serviceId: result.insertId
    });

  } catch (error) {
    console.error('Save service error:', error);

    res.status(500).json({
      message: error.sqlMessage || 'Failed to save service'
    });
  }
};

/**
 * Update service by serviceId
 * PUT /:serviceId
 */
const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { date, fk_vehicleNo, fk_statusId } = req.body;

    const sql = `
      UPDATE service
      SET date = ?, fk_vehicleNo = ?, fk_statusId = ?
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [
      date,
      fk_vehicleNo,
      fk_statusId,
      serviceId
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    res.json({
      message: 'Service updated successfully'
    });

  } catch (error) {
    console.error('Update service error:', error);

    res.status(500).json({
      message: 'Failed to update service'
    });
  }
};

/**
 * Delete service by serviceId
 * DELETE /:serviceId
 */
const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const sql = `DELETE FROM service WHERE id = ?`;

    const [result] = await db.query(sql, [serviceId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    res.json({
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error('Delete service error:', error);

    res.status(500).json({
      message: 'Failed to delete service'
    });
  }
};

/**
 * Get all services
 * GET /
 * Includes vehicle, customer, and status info
 */
const getAllServices = async (req, res) => {
  try {
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

    const [rows] = await db.query(sql);

    res.json(rows);

  } catch (error) {
    console.error('Fetch services error:', error);

    res.status(500).json({
      message: 'Failed to fetch services'
    });
  }
};

module.exports = {
  saveService,
  updateService,
  deleteService,
  getAllServices
};

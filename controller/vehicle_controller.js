const db = require('../db');

/**
 * Save new vehicle
 * POST /
 */
const saveVehicle = async (req, res) => {
  try {
    const { vehicleNo, brand, model, fk_nic, fk_typeId } = req.body;

    if (!vehicleNo || !brand || !model || !fk_nic || !fk_typeId) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const sql = `
      INSERT INTO vehicle (vehicleNo, brand, model, fk_nic, fk_typeId)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      vehicleNo,
      brand,
      model,
      fk_nic,
      fk_typeId
    ]);

    res.status(201).json({
      message: 'Vehicle saved successfully'
    });

  } catch (error) {
    console.error('Save vehicle error:', error);

    res.status(500).json({
      message: error.sqlMessage || 'Failed to save vehicle'
    });
  }
};

/**
 * Update vehicle by vehicleNo
 * PUT /:vehicleNo
 */
const updateVehicle = async (req, res) => {
  try {
    const { vehicleNo1} = req.params;
    const { vehicleNo, brand, model, fk_nic, fk_typeId } = req.body;

    const sql = `
      UPDATE vehicle
      SET vehicleNo = ?, brand = ?, model = ?, fk_nic = ?, fk_typeId = ?
      WHERE vehicleNo = ?
    `;

    const [result] = await db.query(sql, [
      vehicleNo,
      brand,
      model,
      fk_nic,
      fk_typeId,
      vehicleNo1
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Vehicle not found'
      });
    }

    res.json({
      message: 'Vehicle updated successfully'
    });

  } catch (error) {
    console.error('Update vehicle error:', error);

    res.status(500).json({
      message: error.sqlMessage || 'Failed to update vehicle'
    });
  }
};

/**
 * Delete vehicle by vehicleNo
 * DELETE /:vehicleNo
 */
const deleteVehicle = async (req, res) => {
  try {
    const { vehicleNo } = req.params;

    const sql = `DELETE FROM vehicle WHERE vehicleNo = ?`;

    const [result] = await db.query(sql, [vehicleNo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Vehicle not found'
      });
    }

    res.json({
      message: 'Vehicle deleted successfully'
    });

  } catch (error) {
    console.error('Delete vehicle error:', error);

    res.status(500).json({
      message: error.sqlMessage || 'Failed to delete vehicle'
    });
  }
};

/**
 * Get all vehicles
 * GET /
 * Includes customer and vehicle type info
 */
const getAllVehicles = async (req, res) => {
  try {
    const sql = `
      SELECT 
        v.vehicleNo,
        v.brand,
        v.model,
        v.fk_nic,
        c.customerName,
        v.fk_typeId,
        vt.type
      FROM vehicle v
      JOIN customer c ON v.fk_nic = c.nic
      JOIN vehicletype vt ON v.fk_typeId = vt.id
    `;

    const [rows] = await db.query(sql);

    res.json(rows);

  } catch (error) {
    console.error('Fetch vehicles error:', error);

    res.status(500).json({
      message: error.sqlMessage || 'Failed to fetch vehicles'
    });
  }
};

/**
 * Get vehicle by vehicleNo
 * GET /byNIC/:vehicleNo
 */
const getVehicleByVehicleNo = async (req, res) => {
  try {
    const { vehicleNo } = req.params;

    const sql = `
      SELECT 
        v.vehicleNo,
        v.brand,
        v.model,
        v.fk_nic,
        c.customerName,
        v.fk_typeId,
        vt.type
      FROM vehicle v
      JOIN customer c ON v.fk_nic = c.nic
      JOIN vehicletype vt ON v.fk_typeId = vt.id
      WHERE v.vehicleNo = ?
    `;

    const [rows] = await db.query(sql, [vehicleNo]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Vehicle not found'
      });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error('Fetch vehicle error:', error);

    res.status(500).json({
      message: error.sqlMessage || 'Failed to fetch vehicle'
    });
  }
};

module.exports = {
  saveVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleByVehicleNo
};

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
 * Save new vehicle
 * POST /
 */
const saveVehicle = (req, res) => {
  const { vehicleNo, brand, model, fk_nic, fk_typeId } = req.body;

  if (!vehicleNo || !brand || !model || !fk_nic || !fk_typeId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `
    INSERT INTO vehicle (vehicleNo, brand, model, fk_nic, fk_typeId)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [vehicleNo, brand, model, fk_nic, fk_typeId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.sqlMessage });
      }
      res.status(201).json({ message: 'Vehicle saved successfully' });
    }
  );
};

/**
 * Update vehicle by vehicleNo
 * PUT /:vehicleNo
 */
const updateVehicle = (req, res) => {
  const { vehicleNo1 } = req.params;
  const { vehicleNo,brand, model, fk_nic, fk_typeId } = req.body;

  const sql = `
    UPDATE vehicle
    SET vehicleNo = ?, brand = ?, model = ?, fk_nic = ?, fk_typeId = ?
    WHERE vehicleNo = ?
  `;

  connection.query(
    sql,
    [vehicleNo,brand, model, fk_nic, fk_typeId, vehicleNo1],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.sqlMessage });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }

      res.json({ message: 'Vehicle updated successfully' });
    }
  );
};

/**
 * Delete vehicle by vehicleNo
 * DELETE /:vehicleNo
 */
const deleteVehicle = (req, res) => {
  const { vehicleNo } = req.params;

  const sql = `DELETE FROM vehicle WHERE vehicleNo = ?`;

  connection.query(sql, [vehicleNo], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.sqlMessage });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle deleted successfully' });
  });
};

/**
 * Get all vehicles
 * GET /
 * Includes:
 * fk_nic, customerName, fk_typeId, type
 */
const getAllVehicles = (req, res) => {
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

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.sqlMessage });
    }

    res.json(results);
  });
};

/**
 * Get vehicle by vehicleNo
 * GET /byNIC/:vehicleNo
 */
const getVehicleByVehicleNo = (req, res) => {
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

  connection.query(sql, [vehicleNo], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.sqlMessage });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json(results[0]);
  });
};

// Export methods
module.exports = {
  saveVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleByVehicleNo
};

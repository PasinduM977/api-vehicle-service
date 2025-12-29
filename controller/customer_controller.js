const db = require('../db');

/**
 * Save new customer
 * POST /
 */
const saveCustomer = async (req, res) => {
  try {
    const { nic, customerName, phone } = req.body;

    if (!nic || !customerName || !phone) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    const sql = `
      INSERT INTO customer (nic, customerName, phone)
      VALUES (?, ?, ?)
    `;

    await db.query(sql, [nic, customerName, phone]);

    res.status(201).json({
      message: 'Customer saved successfully'
    });

  } catch (error) {
    console.error('Save customer error:', error);

    res.status(500).json({
      message: error.sqlMessage || 'Failed to save customer'
    });
  }
};

/**
 * Update customer by NIC
 * PUT /:nic
 */
const updateCustomer = async (req, res) => {
  try {
    const { nic1} = req.params;
    const { nic, customerName, phone } = req.body;

    const sql = `
      UPDATE customer
      SET nic = ?, customerName = ?, phone = ?
      WHERE nic = ?
    `;

    const [result] = await db.query(sql, [
      nic,
      customerName,
      phone,
      nic1
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Customer not found'
      });
    }

    res.json({
      message: 'Customer updated successfully'
    });

  } catch (error) {
    console.error('Update customer error:', error);

    res.status(500).json({
      message: error.sqlMessage || 'Failed to update customer'
    });
  }
};

/**
 * Delete customer by NIC
 * DELETE /:nic
 */
const deleteCustomer = async (req, res) => {
  try {
    const { nic } = req.params;

    const sql = `DELETE FROM customer WHERE nic = ?`;

    const [result] = await db.query(sql, [nic]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Customer not found'
      });
    }

    res.json({
      message: 'Customer deleted successfully'
    });

  } catch (error) {
    console.error('Delete customer error:', error);

    res.status(500).json({
      message: 'Failed to delete customer'
    });
  }
};

/**
 * Get all customers
 * GET /
 */
const getAllCustomers = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM customer'
    );

    res.json(rows);

  } catch (error) {
    console.error('Fetch customers error:', error);

    res.status(500).json({
      message: 'Failed to fetch customers'
    });
  }
};

/**
 * Get customer by NIC
 * GET /byNIC/:nic
 */
const getCustomerByNIC = async (req, res) => {
  try {
    const { nic } = req.params;

    const sql = `SELECT * FROM customer WHERE nic = ?`;

    const [rows] = await db.query(sql, [nic]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Customer not found'
      });
    }

    res.json(rows[0]);

  } catch (error) {
    console.error('Fetch customer error:', error);

    res.status(500).json({
      message: 'Failed to fetch customer'
    });
  }
};

module.exports = {
  saveCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerByNIC
};

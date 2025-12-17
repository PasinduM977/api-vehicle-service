const mysql = require('mysql2');

// DB connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'vehicleservice'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully');
  }
});

/**
 * Save new customer
 * POST /
 */
const saveCustomer = (req, res) => {
  const { nic, customerName, phone } = req.body;

  if (!nic || !customerName || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `
    INSERT INTO customer (nic, customerName, phone)
    VALUES (?, ?, ?)
  `;

  connection.query(sql, [nic, customerName, phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.sqlMessage });
    }
    res.status(201).json({ message: 'Customer saved successfully' });
  });
};

/**
 * Update customer by NIC
 * PUT /:nic
 */
const updateCustomer = (req, res) => {
  const { nic1 } = req.params;
  const { nic,customerName, phone } = req.body;

  const sql = `
    UPDATE customer
    SET nic = ?, customerName = ?, phone = ?
    WHERE nic = ?
  `;

  connection.query(sql, [nic,customerName, phone, nic1], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err.sqlMessage });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer updated successfully' });
  });
};

/**
 * Delete customer by NIC
 * DELETE /:nic
 */
const deleteCustomer = (req, res) => {
  const { nic } = req.params;

  const sql = `DELETE FROM customer WHERE nic = ?`;

  connection.query(sql, [nic], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete customer' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  });
};

/**
 * Get all customers
 * GET /
 */
const getAllCustomers = (req, res) => {
  const sql = `SELECT * FROM customer`;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch customers' });
    }

    res.json(results);
  });
};

/**
 * Get customer by NIC
 * GET /byNIC/:nic
 */
const getCustomerByNIC = (req, res) => {
  const { nic } = req.params;

  const sql = `SELECT * FROM customer WHERE nic = ?`;

  connection.query(sql, [nic], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to fetch customer' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(results[0]);
  });
};

// Export methods
module.exports = {
  saveCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerByNIC
};

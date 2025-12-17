const express = require("express");
const router = express.Router();

const {
  saveCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerByNIC,
  
} = require("../controller/customer_controller");

router.post('/',saveCustomer);
router.put('/:nic1',updateCustomer);
router.delete('/:nic',deleteCustomer);
router.get('/',getAllCustomers);
router.get('/byNIC/:nic',getCustomerByNIC);

module.exports=router;

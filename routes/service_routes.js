const express = require('express')
const router=express.Router();

const {
  saveService,
  updateService,
  deleteService,
  getAllServices,

} = require("../controller/service_controller");

router.post('/',saveService);
router.put('/:serviceId',updateService);
router.delete('/:serviceId',deleteService);
router.get('/',getAllServices);

module.exports=router;
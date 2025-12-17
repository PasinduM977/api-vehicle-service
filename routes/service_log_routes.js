const express = require('express')
const router=express.Router();

const {
  saveServiceLog,
  getServiceLogsByServiceId,

} = require("../controller/service_log_controller");

router.post('/',saveServiceLog);
router.get('/:serviceId',getServiceLogsByServiceId);

module.exports=router;
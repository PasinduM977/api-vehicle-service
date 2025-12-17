const express = require('express')
const router=express.Router();

const {
  saveVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleByVehicleNo,
  
} = require("../controller/vehicle_controller");

router.post('/',saveVehicle);
router.put('/:vehicleNo1',updateVehicle);
router.delete('/:vehicleNo',deleteVehicle);
router.get('/',getAllVehicles);
router.get('/byVehicleNo/:vehicleNo',getVehicleByVehicleNo);

module.exports=router;

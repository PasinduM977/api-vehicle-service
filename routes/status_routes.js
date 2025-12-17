const express = require('express')
const router=express.Router();

const {
  getAllStatusNames,
} = require("../controller/status_controller");


router.get('/',getAllStatusNames);

module.exports=router;
const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");

//  Enable CORS
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded())

// parse application/json
app.use(express.json())

//routes
const customerRoute=require("./routes/customer_routes");
const vehicleRoute=require("./routes/vehicle_routes");
const serviceRoute=require("./routes/service_routes");
const serviceLogRoute=require("./routes/service_log_routes");
const statusRoute=require("./routes/status_routes");
const vehicleTypeRoute=require("./routes/vehicle_type_routes");

app.use('/api/v1/customer',customerRoute);
app.use('/api/v1/vehicle',vehicleRoute);
app.use('/api/v1/service',serviceRoute);
app.use('/api/v1/serviceLog',serviceLogRoute);
app.use('/api/v1/status',statusRoute);
app.use('/api/v1/vehicleType',vehicleTypeRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

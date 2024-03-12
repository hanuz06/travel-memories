const express = require("express");
const bodyParser = require("body-parser");

const locationsRoutes = require("./routes/locations");

const app = express();

app.use("/api/locations", locationsRoutes);

app.listen(5000);
 
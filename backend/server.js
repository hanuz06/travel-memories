const express = require("express");
const bodyParser = require("body-parser");

const locationsRoutes = require("./routes/locations");

const app = express();

app.use("/api/locations", locationsRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error!"});
});

app.listen(5000);

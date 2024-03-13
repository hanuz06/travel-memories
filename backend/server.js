const express = require("express");
const bodyParser = require("body-parser");

const locationsRoutes = require("./routes/locations");
const usersRoutes = require("./routes/users");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/locations", locationsRoutes);
app.use("/api/users", usersRoutes);

app.use(() => {
  throw new HttpError("Could not find this route: ", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error!" });
});

app.listen(5000);

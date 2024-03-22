const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

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

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER_ID}:${process.env.MONGO_USER_PASSWORD}@cluster0.dakk8.mongodb.net/locations?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => app.listen(5000))
  .catch((e) => {
    console.log(e);
  });

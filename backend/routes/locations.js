const express = require("express");
const {
  getLocationsByUserId,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locations");
const { check } = require("express-validator");

const router = express.Router();

router.get("/:pid", getLocationById);

router.get("/user/:uid", getLocationsByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createLocation
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updateLocation
);

router.delete("/:pid", deleteLocation);

module.exports = router;

const express = require("express");
const { getUsers, signup, login } = require("../controllers/users");
const { check } = require("express-validator");

const router = express.Router();

router.get("/", getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 3 }),
  ],
  signup
);

router.post("/login", login);

module.exports = router;

const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  { id: "u1", name: "Kevin Kim", email: "kim@mail.com", password: "1234" },
  {
    id: "u2",
    name: "Jane Lee",
    email: "jen@mail.com",
    password: "1234",
  },
  {
    id: "u3",
    name: "Lou Park",
    email: "moon@mail.com",
    password: "1234",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("User already exists!", 400);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const foundUser = DUMMY_USERS.find((u) => u.email === email);

  if (!foundUser || foundUser.password !== password) {
    throw new HttpError("Please check your credendials", 400);
  }

  res.json({ message: "Logged in" });
};

module.exports = {
  getUsers,
  signup,
  login,
};

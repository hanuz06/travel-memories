const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Failed to fetch users", 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs during signup", 422));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = User.findOne({ email });
  } catch (err) {
    return next(new HttpError("Failed to find user", 500));
  }
  if (existingUser?.id) {
    return next(new HttpError("User already exists!", 422));
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: req.file.path,
    locations: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Failed to sign up!", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError("Failed to login", 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError("Please check your credendials", 400));
  }

  res.status(200).json({
    message: "Logged in",
    user: existingUser.toObject({ getters: true }),
  });
};

module.exports = {
  getUsers,
  signup,
  login,
};

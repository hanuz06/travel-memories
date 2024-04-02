const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    next(new HttpError("Failed to create user!", 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    locations: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Failed to sign up!", 500));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    return next(new HttpError("Failed to sign up!", 500));
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError("Failed to login", 500));
  }

  if (!existingUser) {
    return next(new HttpError("Please check your credendials", 400));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError("Failed to login", 500));
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid credentials", 403));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    return next(new HttpError("Failed to login!", 500));
  }

  res
    .status(200)
    .json({ userId: existingUser.id, email: existingUser.email, token });
};

module.exports = {
  getUsers,
  signup,
  login,
};

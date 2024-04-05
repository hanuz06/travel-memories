const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const fs = require("fs");

const HttpError = require("../models/http-error");
const Location = require("../models/location");
const User = require("../models/user");

const getLocationById = async (req, res, next) => {
  const locationId = req.params.pid;

  let location;
  try {
    location = await Location.findById(locationId);
  } catch (err) {
    return next(new HttpError("Failed to find location", 500));
  }

  if (!location) {
    return next(new HttpError("Could not find a location for the id", 404));
  }

  res.json({ location: location.toObject({ getters: true }) });
};

const getLocationsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithLocations;
  try {
    userWithLocations = await User.findById(userId).populate("locations");
  } catch (err) {
    return next(new HttpError("Failed to find locations", 500));
  }

  if (!userWithLocations || !userWithLocations?.locations?.length) {
    userWithLocations = { locations: [] };
  }

  res.json({
    locations: userWithLocations?.locations?.map((location) =>
      location.toObject({ getters: true })
    ),
  });
};

const createLocation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    next(new HttpError("Invalid inputs", 422));
  }

  const { title, description, address } = req.body;

  try {
  } catch (error) {
    return next(error);
  }

  const createdLocation = new Location({
    title,
    description,
    address,
    location: {
      lat: 40.74857864692124,
      lng: -73.9852674364135,
    },
    image: req.file.path,
    creator: req?.userData?.userId,
  });

  let user;
  try {
    user = await User.findById(req?.userData?.userId);
  } catch (err) {
    return next(new HttpError("Failed to find user: " + err.message, 404));
  }

  if (!user) {
    return next(new HttpError("Failed to find user by provided id.", 500));
  }

  console.log(user);

  try {
    const currentSession = await mongoose.startSession();
    currentSession.startTransaction();
    await createdLocation.save({ session: currentSession });
    user.locations.push(createdLocation);
    await user.save({ session: currentSession });
    await currentSession.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Creating a new location failed: " + err.message, 500)
    );
  }

  res.status(201).json(createdLocation);
};

const updateLocation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const locationId = req.params.pid;
  const { title, description } = req.body;

  let location;
  try {
    location = await Location.findById(locationId);
  } catch (err) {
    return next(new HttpError("Failed to find location", 500));
  }

  if (location.creator.toString() !== req.userData.userId) {
    return next(new HttpError("You're not allowed to edit this location", 401));
  }

  location.title = title;
  location.description = description;

  try {
    await location.save();
  } catch (err) {
    return next(new HttpError("Failed to update location", 500));
  }

  res.status(200).json({
    location: location.toObject({ getters: true }),
  });
};

const deleteLocation = async (req, res, next) => {
  const locationId = req.params.pid;

  let location;
  try {
    location = await Location.findById(locationId).populate("creator");
  } catch (err) {
    return next(new HttpError("Failed to find location", 500));
  }

  if (!location) {
    return next(new HttpError("Failed to find location by provided id.", 404));
  }

  if (location.creator.id !== req.userData.userId) {
    return next(
      new HttpError("You're not allowed to delete this location", 401)
    );
  }

  const imagePath = location.image;

  try {
    const currentSession = await mongoose.startSession();
    currentSession.startTransaction();
    await location.deleteOne({ session: currentSession });
    location.creator.locations.pull(location);
    await location.creator.save({ session: currentSession });
    await currentSession.commitTransaction();
  } catch (err) {
    return next(new HttpError("Failed to delete location", 500));
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({
    message: "Location deleted.",
  });
};

module.exports = {
  getLocationById,
  getLocationsByUserId,
  createLocation,
  updateLocation,
  deleteLocation,
};

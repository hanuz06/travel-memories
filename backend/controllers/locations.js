const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Location = require("../models/location");

let DUMMY_LOCATIONS = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

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

  let locations;
  try {
    locations = await Location.find({ creator: userId });
  } catch (err) {
    return next(new HttpError("Failed to find locations", 500));
  }

  if (!locations?.length) {
    return next(new HttpError("Could not find locations for the user id", 404));
  }

  res.json({
    locations: locations.map((location) =>
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

  const { title, description, address, creator } = req.body;

  let coordinates;

  try {
  } catch (error) {
    return next(error);
  }

  console.log(coordinates);
  const createdLocation = new Location({
    title,
    description,
    address,
    location: {
      lat: 40.74857864692124,
      lng: -73.9852674364135,
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/375px-Empire_State_Building_%28aerial_view%29.jpg",
    creator,
  });

  // DUMMY_LOCATIONS.push(createdLocation);
  try {
    await createdLocation.save();
  } catch (err) {
    const error = new HttpError(
      "Creating a new location failed, please try again.",
      500
    );
  }

  res.status(201).json(createdLocation);
};

const updateLocation = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs", 422);
  }

  const locationId = req.params.pid;
  const { title, description } = req.body;

  let location;
  try {
    location = await Location.findById(locationId);
  } catch (err) {
    return next(new HttpError("Failed to find location", 500));
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
    location = await Location.findById(locationId);
  } catch (err) {
    return next(new HttpError("Failed to find location", 500));
  }

  try {
    await location.deleteOne();
  } catch (err) {
    return next(new HttpError("Failed to delete location", 500));
  } 

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

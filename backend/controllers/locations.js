const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");

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

const getLocationById = (req, res, next) => {
  const locationId = req.params.pid;

  const location = DUMMY_LOCATIONS.find((p) => p.id === locationId);

  if (!location) {
    throw new HttpError("Could not find a location for the id", 404);
  }

  res.json({ location });
};

const getLocationsByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const locations = DUMMY_LOCATIONS.filter((p) => p.creator === userId);

  if (!locations?.length) {
    return next(new HttpError("Could not find locations for the user id", 404));
  }

  res.json({ locations });
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
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }
console.log(coordinates)
  const createdLocation = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_LOCATIONS.push(createdLocation);

  res.status(201).json(createdLocation);
};

const updateLocation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs", 422);
  }

  const locationId = req.params.pid;
  const { title, description } = req.body;

  const updatedLocation = {
    ...DUMMY_LOCATIONS.find((p) => p.id === locationId),
  };
  const locationIndex = DUMMY_LOCATIONS.findIndex((p) => p.id === locationId);
  updatedLocation.title = title;
  updatedLocation.description = description;

  DUMMY_LOCATIONS[locationIndex] = updatedLocation;

  res.status(200).json({
    location: updatedLocation,
  });
};

const deleteLocation = (req, res, next) => {
  const locationId = req.params.pid;

  if (!DUMMY_LOCATIONS.find((p) => p.id === locationId)) {
    throw new HttpError("Location not found for deletion", 404);
  }

  DUMMY_LOCATIONS = DUMMY_LOCATIONS.filter((p) => p.id !== locationId);

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

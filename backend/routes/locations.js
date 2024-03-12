const express = require("express");

const router = express.Router();

const DUMMY_LOCATIONS = [
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

router.get("/:pid", (req, res, next) => {
  const locationId = req.params.pid;

  const location = DUMMY_LOCATIONS.find((p) => p.id === locationId);

  res.json({ location });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const location = DUMMY_LOCATIONS.find((p) => p.creator === userId);

  res.json({ location });
});

module.exports = router;

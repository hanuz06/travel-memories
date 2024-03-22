const { default: axios } = require("axios");
const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
      process.env.MAP_API
    }`
  );
console.log(response?.data);
  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError("Location for the specified address not found");
  }
  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;

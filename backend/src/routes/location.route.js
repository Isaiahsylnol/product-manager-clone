const { executeQuery } = require("../../db");
const express = require("express");
const {
  getAllLocations,
  getLocationByBunk,
  getProductLocations,
  getLocationsProducts,
} = require("../controllers/location.controller");

const router = express.Router();
const endpoint = "/api/locate";

router.get(endpoint + "/", getAllLocations);
router.get(endpoint + "/:code", getLocationByBunk);
router.get(endpoint + "/bunk/:location_code", getLocationsProducts);

module.exports = { router };

const { executeQuery } = require("../../db");
const express = require("express");
const {
  getAllLocations,
  getLocationByBunk,
  getProductLocations,
  getLocationsProducts,
  removeProduct,
} = require("../controllers/location.controller");

const router = express.Router();
const endpoint = "/api/locate";

router.get(endpoint + "/", getAllLocations);
router.get(endpoint + "/:code", getLocationByBunk);
router.get(endpoint + "/bunk/:location_code", getLocationsProducts);
router.delete(endpoint + "/bunk", removeProduct);

module.exports = { router };

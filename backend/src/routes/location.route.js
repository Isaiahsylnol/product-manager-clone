const { executeQuery } = require("../../db");
const express = require("express");
const {
  getAllLocations,
  getLocationByBunk,
  getProductLocations,
} = require("../controllers/location.controller");

const router = express.Router();
const endpoint = "/api/locate";

router.get(endpoint + "/", getAllLocations);
router.get(endpoint + "/:code", getLocationByBunk);
router.get(endpoint + "/bunk/:sku", getProductLocations);

module.exports = { router };

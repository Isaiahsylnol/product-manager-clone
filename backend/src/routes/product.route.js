const { executeQuery } = require("../../db");
const express = require("express");
const {
  getAllProducts,
  getProductBySku,
} = require("../controllers/product.controller");

const router = express.Router();
const endpoint = "/api/products";

router.get(endpoint + "/", getAllProducts);
router.get(endpoint + "/product-search/:sku", getProductBySku);

module.exports = { router };

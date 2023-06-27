"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_controller_1 = require("../controllers/product-controller");
var express = require('express');
var router = express.Router();
router.get("/products", product_controller_1.getProducts);
router.post("/products", product_controller_1.getProductBySku);
router.post("/fast-find", product_controller_1.fastFindProduct);
module.exports = router;

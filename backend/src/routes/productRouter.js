"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_controller_1 = require("../controllers/product-controller");
var express = require('express');
var router = express.Router();
router.get("/product", product_controller_1.getLocatedProduct);
router.post("/product", product_controller_1.getProductBySku);
router.post("/fast-find", product_controller_1.createProductLocation);
module.exports = router;

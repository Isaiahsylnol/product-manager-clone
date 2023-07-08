import { getProductBySku, getLocatedProduct, createProductLocation } from "../controllers/product-controller";

const express = require('express');
const router = express.Router();

router.get("/product", getLocatedProduct);
router.post("/product", getProductBySku);
router.post("/fast-find", createProductLocation);


module.exports = router;
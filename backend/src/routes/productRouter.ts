
import { myDataSource } from "../../app-data-source";
import { fastFindProduct, getProductBySku, getProducts } from "../controllers/product-controller";
import { Product } from "../entity/product.entity";

const express = require('express');
const router = express.Router();

router.get("/products", getProducts);
router.post("/products", getProductBySku);
router.post("/fast-find", fastFindProduct);

module.exports = router;
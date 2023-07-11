import { getProductsByLocation } from "../controllers/product.controller";
import { getBunks, getBunkBySku } from "../controllers/location.controller";

const express = require('express');
const router = express.Router();

router.get("/locate", getBunks);
router.post("/locate", getProductsByLocation);
router.post("/bunk", getBunkBySku);

module.exports = router;

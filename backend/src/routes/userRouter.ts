import { getAlUsers, getUserById, loginWithPin, registerPin } from "../controllers/user.controller";

const express = require('express');
const router = express.Router();

router.get("/user", getAlUsers)
router.post("/user", getUserById);
router.post("/register", registerPin);
router.post("/login", loginWithPin);

module.exports = router;
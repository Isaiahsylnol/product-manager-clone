const { executeQuery } = require("../../db");
const express = require("express");
const { getAllUsers, findByPin } = require("../controllers/user.controller");

const router = express.Router();
const endpoint = "/api/user";

router.get(endpoint + "/", getAllUsers);

router.post(endpoint + "/login", findByPin);

module.exports = { router };

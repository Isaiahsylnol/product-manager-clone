const { executeQuery } = require("../../db");
const express = require("express");
const router = express.Router();

const endpoint = "/api/products";

router.get(endpoint + "/allStudents", async (req, res) => {
  const query = "SELECT * FROM Product";
  const values = [];
  const paramNames = [];
  const isStoredProcedure = false;
  try {
    const result = await executeQuery(
      query,
      values,
      paramNames,
      isStoredProcedure
    );
    res.send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get(endpoint + "/product-search/:sku", async (req, res) => {
  const { sku } = req.params;

  if (!sku) {
    return res.status(400).send({ error: `Product sku is required: ${sku}` });
  }

  const query = "SELECT * FROM Product WHERE sku = @sku";
  const values = [sku];
  const paramNames = ["sku"];
  const isStoredProcedure = false;

  try {
    const result = await executeQuery(
      query,
      values,
      paramNames,
      isStoredProcedure
    );
    res.status(200).send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = { router };

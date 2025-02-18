const { executeQuery } = require("../../db");

class ProductLocationRepository {
  constructor() {
    this.tableName = "ProductLocations";
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    try {
      const result = await executeQuery(query, [], [], false);
      return result.recordset;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch all locations.");
    }
  }

  async findByBunk(code) {
    if (!code) {
      throw new Error("Bunk code is required.");
    }

    const query = `SELECT * FROM ${this.tableName} WHERE location_id = @code`;
    const values = [code];
    const paramNames = ["code"];

    try {
      const result = await executeQuery(query, values, paramNames, false);
      return result.recordset;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch location by code.");
    }
  }

  async getProductLocations(sku) {
    if (!sku) {
      throw new Error("Product SKU is required.");
    }

    const query = `SELECT * FROM ${this.tableName} WHERE product_sku = @sku`;
    const values = [sku];
    const paramNames = ["sku"];

    try {
      const result = await executeQuery(query, values, paramNames, false);
      return result.recordset;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch product's location(s).");
    }
  }

  async getLocationsProducts(location_code) {
    if (!location_code) {
      throw new Error("Location code is required.");
    }

    const query = `SELECT * FROM ${this.tableName} WHERE location_id = @location_code`;
    const values = [location_code];
    const paramNames = ["location_code"];

    try {
      const result = await executeQuery(query, values, paramNames, false);
      return result.recordset;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch location's product(s).");
    }
  }

  async removeProduct(sku, location_id) {
    if (!sku || !location_id) {
      throw new Error("Both product SKU and location ID are required.");
    }

    const query = `DELETE FROM ${this.tableName} WHERE product_sku = @sku AND location_id = @location_id`;
    const values = [sku, location_id];
    const paramNames = ["sku", "location_id"];

    try {
      const result = await executeQuery(query, values, paramNames, false);
      return result.rowsAffected;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to remove product by SKU and Location ID.");
    }
  }
}

module.exports = ProductLocationRepository;

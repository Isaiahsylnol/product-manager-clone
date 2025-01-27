const { executeQuery } = require("../../db");

class ProductRepository {
  constructor() {
    this.tableName = "Product";
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    try {
      const result = await executeQuery(query, [], [], false);
      return result.recordset;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch all products.");
    }
  }

  async findBySku(sku) {
    if (!sku) {
      throw new Error("Product SKU is required.");
    }

    const query = `SELECT * FROM ${this.tableName} WHERE sku = @sku`;
    const values = [sku];
    const paramNames = ["sku"];

    try {
      const result = await executeQuery(query, values, paramNames, false);
      return result.recordset;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch product by SKU.");
    }
  }
}

module.exports = ProductRepository;

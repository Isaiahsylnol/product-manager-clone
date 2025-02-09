const { executeQuery } = require("../../db");

class LocationRepository {
  constructor() {
    this.tableName = "Locations";
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
}

module.exports = LocationRepository;

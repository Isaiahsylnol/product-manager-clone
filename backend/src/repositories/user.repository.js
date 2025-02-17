const { executeQuery } = require("../../db");

class UserRepository {
  constructor() {
    this.tableName = "Users";
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    try {
      const result = await executeQuery(query, [], [], false);
      return result.recordset;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch all users.");
    }
  }

  async findByPin(pin) {
    if (!pin) {
      throw new Error("PIN is required.");
    }

    const query = `SELECT * FROM ${this.tableName} WHERE pin = @pin`;
    const values = [pin];
    const paramNames = ["pin"];

    try {
      const result = await executeQuery(query, values, paramNames, false);
      return result.recordset;
    } catch (error) {
      console.error("Database query failed:", error);
      throw new Error("Failed to fetch User by pin.");
    }
  }
}

module.exports = UserRepository;

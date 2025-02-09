const sql = require("mssql");

const config = {
  server: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,

  options: {
    trustedConnection: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

// Utility function for logging errors consistently
function logError(error, query, values, paramNames) {
  console.error("Database operation failed.");
  console.error("Query:", query);
  console.error("Values:", values);
  console.error("Parameter Names:", paramNames);
  console.error("Error:", error.message);
}

// Normal queries to the database
async function executeQuery(
  query,
  values = [],
  paramNames = [],
  isStoredProcedure = true,
  outputParamName = null
) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    // Bind input parameters
    if (values.length !== paramNames.length) {
      throw new Error("Mismatch between values and parameter names.");
    }

    values.forEach((value, index) => {
      if (value === undefined) {
        console.warn(
          `Warning: Undefined value for parameter '${paramNames[index]}'`
        );
      }
      request.input(paramNames[index], value);
    });

    // Handle output parameter
    if (outputParamName) {
      request.output(outputParamName, sql.Int);
    }

    // Execute query or stored procedure
    const result = isStoredProcedure
      ? await request.execute(query)
      : await request.query(query);

    // Include output parameter if specified
    if (outputParamName) {
      return {
        ...result,
        [outputParamName]: request.parameters[outputParamName].value,
      };
    }

    return result;
  } catch (error) {
    logError(error, query, values, paramNames);
    throw error;
  }
}

// Bulk queries with table-valued parameters
async function executeTableValuedQuery(
  query,
  table,
  paramName,
  isStoredProcedure = true,
  outputParamName = null
) {
  try {
    if (!(table instanceof sql.Table)) {
      throw new Error(
        "Invalid table parameter. Expected an instance of sql.Table."
      );
    }

    const pool = await sql.connect(config);
    const request = pool.request();

    // Bind table-valued parameter
    request.input(paramName, table);

    // Handle output parameter
    if (outputParamName) {
      request.output(outputParamName, sql.Int);
    }

    // Execute query or stored procedure
    const result = isStoredProcedure
      ? await request.execute(query)
      : await request.query(query);

    // Include output parameter if specified
    if (outputParamName) {
      return {
        ...result,
        [outputParamName]: request.parameters[outputParamName].value,
      };
    }

    return result;
  } catch (error) {
    logError(error, query, [table], [paramName]);
    throw error;
  }
}

module.exports = {
  connect: () => sql.connect(config),
  sql,
  executeQuery,
  executeTableValuedQuery,
};

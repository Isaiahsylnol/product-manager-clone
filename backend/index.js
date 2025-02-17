require("dotenv").config();
const express = require("express");
const { connect } = require("./db.js");

const productRoutes = require("./src/routes/product.route.js");
const locationRoutes = require("./src/routes/location.route.js");
const userRoutes = require("./src/routes/user.route.js");

const port = 3000;
const app = express();

var cors = require("cors");
app.use(cors());

app.use(express.json());

connect()
  .then((connection) => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.log("Database connection failed!");
    console.log(error);
  });

app.use("/", productRoutes.router);
app.use("/", locationRoutes.router);
app.use("/", userRoutes.router);

app.listen(port, () => console.log(`Server listening on port ${port}!`));

const express = require("express");
const { connect } = require("./db.js");
const productRoutes = require("./src/routes/product.route.js");
const port = 3000;
const app = express();

var cors = require("cors");
app.use(cors());

connect()
  .then((connection) => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.log("Database connection failed!");
    console.log(error);
  });

app.use("/", productRoutes.router);
app.listen(port, () => console.log(`Dolphin app listening on port ${port}!`));

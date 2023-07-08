"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_data_source_1 = require("../app-data-source");
var cors = require("cors");
// establish database connection
app_data_source_1.myDataSource
    .initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization:", err);
});
// create and setup express app
var app = express();
app.use(express.json());
app.use(cors());
var productRouter = require('./routes/productRouter');
var locateRouter = require('./routes/locationRouter');
app.use("/api", productRouter);
app.use("/api", locateRouter);
// start express server
app.listen(8080);

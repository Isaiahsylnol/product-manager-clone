import * as express from 'express'
import { myDataSource } from "../app-data-source"
import * as cors from 'cors';

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()
app.use(express.json())
app.use(cors());

const productRouter = require('./routes/productRouter');
const locateRouter = require('./routes/locationRouter');
const userRouter = require('./routes/userRouter');

app.use("/api", locateRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);

// start express server
app.listen(8080)
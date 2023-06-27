import * as express from 'express'
import { Request, Response } from "express"
import { User } from "./entity/user.entity"
import { Product } from "./entity/product.entity"
import { myDataSource } from "../app-data-source"

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

const productRouter = require('./routes/productRouter');

// register routes
app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find()
    res.json(users)
})

app.get("/products", async function (req: Request, res: Response) {
    const prods = await myDataSource.getRepository(Product).find()
    res.json(prods)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).findOneBy({
        id: req.body.id,
    })
    return res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.post("/user/login", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({ pin: req.body.pin})
    return res.send(user)
})

app.post("/product", async function (req: Request, res: Response) {
    const prod = await myDataSource.getRepository(Product).findOneBy({ sku: req.body.sku})
    return res.send(prod)
})

app.put("/users/:email", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: req.body.id,
    })
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.delete("/users/delete", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete({id: req.body.id})
    return res.send(results)
})

app.use("/api", productRouter);

// start express server
app.listen(8080)
import { myDataSource } from '../../app-data-source';
import { Product } from '../entity/product.entity';
import { Bunk } from '../entity/bunk.entity';
import { ProductLocation } from '../entity/product_location.entity';

export const getProducts = async (req, res) => {
  const prods = await myDataSource.getRepository(Product).find();
  res.send(prods);
};

export const getCategoryById = async (req, res) => {
  const prod = await myDataSource
    .getRepository(Bunk)
    .findOneBy({ sku: req.body.sku });
  res.send(prod);
};

export const getProductBySku = async (req, res) => {
  const { sku } = req.body;
  console.log(sku)
  const prod = await myDataSource
  .getRepository(Product)
  .createQueryBuilder("product")
  .leftJoinAndSelect("product.productLocations", "productLocation")
  .leftJoinAndSelect("productLocation.bunk", "bunk")
  .where("product.sku = :sku", { sku })
  .getOne();

  res.send(prod);
};

export const getLocatedProduct = async (req, res) => {
  const prod = await myDataSource
  .getRepository(ProductLocation)
  .createQueryBuilder("productLocation")
  .leftJoinAndSelect("productLocation.product", "product")
  .leftJoinAndSelect("productLocation.bunk", "bunk")
  .getMany();
  res.send(prod);
};

export const createProductLocation = async (req, res) => {
  const { prodSku, locSku } = req.body;

  try {
    const product = await myDataSource
      .getRepository(Product)
      .findOne({where: { sku: prodSku }});

    const bunk = await myDataSource
      .getRepository(Bunk)
      .findOne({where: { sku: locSku }});

    if (!product || !bunk) {
      return res.status(404).send({ message: "Product or Bunk not found" });
    }

    const productLocation = new ProductLocation();
    productLocation.product = product;
    productLocation.bunk = bunk;

    await myDataSource
      .getRepository(ProductLocation)
      .save(productLocation);

    res.send({ message: "Product successfully added to fast-find bunk" });
  } catch (error) {
    console.error("Error adding product to fast-find bunk:", error);
    res.status(500).send({ message: "Failed to add product to fast-find bunk" });
  }
};

export const getProductsByLocation = async (req, res) => {
  const { bunkLocationSku } = req.body;
  const products = await myDataSource
    .getRepository(Product)
    .createQueryBuilder("product")
    .innerJoin("product.productLocations", "productLocation")
    .innerJoin("productLocation.bunk", "bunk")
    .where("bunk.sku = :bunkLocationSku", { bunkLocationSku })
    .getMany();
    res.send(products);
};


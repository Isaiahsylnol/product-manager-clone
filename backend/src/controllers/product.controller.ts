import { myDataSource } from '../../app-data-source';
import { Product } from '../entity/product.entity';
import { Bunk } from '../entity/bunk.entity';
import { ProductLocation } from '../entity/product_location.entity';
import * as express from 'express';

export const getProducts = async (
  req: express.Request,
  res: express.Response
) => {
  const prods = await myDataSource.getRepository(Product).find();
  res.send(prods);
};

export const getProductBySku = async (
  req: express.Request,
  res: express.Response
) => {
  const { sku } = req.body;
  try {
    const prod = await myDataSource
      .getRepository(Product)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productLocations', 'productLocation')
      .leftJoinAndSelect('productLocation.bunk', 'bunk')
      .where('product.sku = :sku', { sku })
      .getOne();
    if (!prod) {
      res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ prod });
  } catch (error) {
    console.error('Error to fetch product by ID: ', error);
    res.status(500).send({ message: 'Error fetching product by sku.' });
  }
};

export const getLocatedProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const prod = await myDataSource
      .getRepository(ProductLocation)
      .createQueryBuilder('productLocation')
      .leftJoinAndSelect('productLocation.product', 'product')
      .leftJoinAndSelect('productLocation.bunk', 'bunk')
      .getMany();
    if (!prod) {
      res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ prod });
  } catch (error) {
    console.error('Error to fetch all located products: ', error);
    res.status(500).send({ message: 'Error fetching all located products.' });
  }
};

export const createProductLocation = async (
  req: express.Request,
  res: express.Response
) => {
  const { prodSku, locSku } = req.body;

  try {
    const product = await myDataSource
      .getRepository(Product)
      .findOne({ where: { sku: prodSku } });

    const bunk = await myDataSource
      .getRepository(Bunk)
      .findOne({ where: { sku: locSku } });

    if (!product || !bunk) {
      return res.status(404).send({ message: 'Product or Bunk not found' });
    }

    const productLocation = new ProductLocation();
    productLocation.product = product;
    productLocation.bunk = bunk;

    await myDataSource.getRepository(ProductLocation).save(productLocation);

    res
      .status(200)
      .send({ message: 'Product successfully added to fast-find bunk' });
  } catch (error) {
    console.error('Error adding product to fast-find bunk:', error);
    res
      .status(500)
      .send({ message: 'Failed to add product to fast-find bunk' });
  }
};

export const getProductsByLocation = async (
  req: express.Request,
  res: express.Response
) => {
  const { bunkLocationSku } = req.body;
  try {
    const products = await myDataSource
      .getRepository(Product)
      .createQueryBuilder('product')
      .innerJoin('product.productLocations', 'productLocation')
      .innerJoin('productLocation.bunk', 'bunk')
      .where('bunk.sku = :bunkLocationSku', { bunkLocationSku })
      .getMany();
    if (!products) {
      res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ products });
  } catch (error) {
    console.error('Failed to fetch product by location: ', error);
    res.status(500).send({ message: 'Failed to fetch product by location.' });
  }
};

import { myDataSource } from '../../app-data-source';
import { Product } from '../entity/product.entity';
import { Location } from '../entity/location';

export const getProducts = async (req, res) => {
  const prods = await myDataSource.getRepository(Product).find();
  res.send(prods);
};

export const getProductBySku = async (req, res) => {
  const prod = await myDataSource
    .getRepository(Product)
    .findOneBy({ sku: req.body.sku });
  res.send(prod);
};

export const fastFindProduct = async (req, res) => {
  const { bunk } = req.body;

  try {
    const prod = await myDataSource
    .getRepository(Location)
    .createQueryBuilder('location')
    .innerJoin('product.location', 'loc')
    .where('loc.bunk_id = :bunk_id', { bunk_id: bunk })
    .getMany();
    res.send(prod)
  
  } catch (error) {
    res.status(500).send('Error querying the composite/join table');
  }
};

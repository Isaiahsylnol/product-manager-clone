import { myDataSource } from '../../app-data-source';

import { Bunk } from '../entity/bunk.entity';

export const getBunks = async (req, res) => {
  const bunks = await myDataSource.getRepository(Bunk).find();
  res.send(bunks);
};

export const getCategoryById = async (req, res) => {
  const prod = await myDataSource
    .getRepository(Bunk)
    .findOneBy({ sku: req.body.sku });
  res.send(prod);
};


export const getBunkBySku = async (req, res) => {
    const prod = await myDataSource
      .getRepository(Bunk)
      .findOneBy({ sku: req.body.sku });
    res.send(prod);
  };
// export const getProductBySku = async (req, res) => {
//   const { sku } = req.body;
//   console.log(sku)
//   const prod = await myDataSource
//   .getRepository(Product)
//   .createQueryBuilder("product")
//   .leftJoinAndSelect("product.productLocations", "productLocation")
//   .leftJoinAndSelect("productLocation.bunk", "bunk")
//   .where("product.sku = :sku", { sku })
//   .getOne();

//   res.send(prod);
// };


 

 


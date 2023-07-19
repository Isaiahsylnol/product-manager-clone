import { myDataSource } from '../../app-data-source';
import { Bunk } from '../entity/bunk.entity';
import * as express from 'express';

export const getBunks = async (req: express.Request, res: express.Response) => {
  const bunks = await myDataSource.getRepository(Bunk).find();
  res.send(bunks);
};

export const getBunkBySku = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { sku } = req.body;

    if (!sku) {
      return res.status(400).send({
        message: 'Please enter valid SKU.',
      });
    }

    const bunk = await myDataSource
      .getRepository(Bunk)
      .findOne({ where: { sku } });

    if (!bunk) {
      return res.status(404).send({
        message: `Failed to find bunk with SKU: ${sku}`,
      });
    }

    return res.status(200).send({ data: bunk });
  } catch (error) {
    console.error('Failed to fetch bunk by SKU.', error);
    return res.status(500).send({
      message: 'Error fetching bunk by SKU.',
    });
  }
};

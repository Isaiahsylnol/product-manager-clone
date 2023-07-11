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
    const bunk = await myDataSource
      .getRepository(Bunk)
      .findOneBy({ sku: req.body.sku });

    if (!bunk) {
      res.status(404).send({
        message: `Failed to find bunk: ${bunk}`,
      });
    }
    res.status(200).send({ bunk });
  } catch (error) {
    console.error('Failed to fetch bunk by sku.');
    res.status(500).send({
      message: 'Error fetching bunk by sku.',
    });
  }
};

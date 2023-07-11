import { myDataSource } from '../../app-data-source';
import * as express from 'express';
import { User } from '../entity/user.entity';

export const getAlUsers = async (req, res) => {
  const users = await myDataSource.getRepository(User).find();
  res.status(200).send({ users });
};

export async function getUserById(req: express.Request, res: express.Response) {
  const { id } = req.body;
  try {
    const user = await myDataSource
      .getRepository(User)
      .findOne({ where: { id: id } });
    if (!user) {
      res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ user });
  } catch (error) {
    res.status(500).send({ message: 'Failed to find User' });
  }
};

export async function registerPin(req: express.Request, res: express.Response) {
  const { pin, name } = req.body;
  try {
    const user = new User();
    user.pin = pin;
    user.name = name;
    await myDataSource.getRepository(User).save(user);
    res.status(200).send({message: "User successfully created: ", name});
  } catch (error) {
    res.status(500).send({ message: 'Failed to create User PIN' });
  }
};

export async function loginWithPin(req: express.Request, res: express.Response) {
  const { pin } = req.body;
  try {
    const user = await myDataSource.getRepository(User).findOne({ where: { pin } });
    if (user) {
      return res.status(200).send({ message: 'Successful login!' });
    } else {
      return res.status(400).send({ message: 'Invalid PIN. Login failed!' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'Error occurred during login.' });
  }
}

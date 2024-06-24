import { Users } from '../../services/Users.service';
import { Request, Response } from 'express';

export const logIn = async (req: Request, res: Response) => {
  const { email } = req.body
  try {
    const userMethods = new Users(null);
    const userInfo = await userMethods.getUser(email);
    return res.json({ status: 200, userInfo });
  } catch (error) {
    return res.status(500).send({ error: String(error) });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const users = new Users(req.body);
    const userInfo = await users.createUser();
    return res.json({ status: 200, userInfo });
  } catch (error) {
    return res.status(500).send({ error: String(error) });
  }
};

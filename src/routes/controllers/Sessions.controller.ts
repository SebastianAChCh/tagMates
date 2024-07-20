import jwt from 'jsonwebtoken';
import { Users } from '../../services/Users.service';
import { Request, Response } from 'express';
import { getDataSession } from '../../types/Users';
import { NODE_ENV, SECRET_KEY } from '../../configurations/conf';
import { Token } from '../../services/Token.service';

export const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userMethods = new Users(null);

  try {
    const userInfo: getDataSession = await userMethods.logIn({ email, password });

    if (typeof userInfo === 'string') {
      return res.json({ status: 401, information: userInfo });
    }

    return res.cookie('access_token', userInfo.access_token, {
      httpOnly: true,
      secure: NODE_ENV === 'Production',
    }).json({ status: 200, information: userInfo.userInformation, refresh_token: userInfo.refreshToken });

  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const usersMethods = new Users(req.body);

  try {
    const userInfo: getDataSession = await usersMethods.createUser();

    if (typeof userInfo === 'string') {
      return res.json({ status: 404, error: userInfo });
    }

    return res.cookie('access_token', userInfo.access_token, {
      httpOnly: true,
      secure: NODE_ENV === 'Production',
    }).json({ status: 200, information: userInfo.userInformation, refresh_token: userInfo.refreshToken });

  } catch (error) {
    return res.status(500).send({ error: String(error) });
  }
};


export const refreshToken = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.json({ status: 401 });
  }

  const tokenMethods = new Token();

  try {
    const isUserAuth = jwt.verify(token, SECRET_KEY);

    if (!isUserAuth || typeof isUserAuth === 'string') {
      return res.json({ status: 401, information: 'There was an error' });
    }

    return res.cookie('access_token', tokenMethods.generateToken({ age: isUserAuth.age, email: isUserAuth.email, fullname: isUserAuth.fullname, duration: '1h' }), {
      httpOnly: true,
      secure: NODE_ENV === 'Production',
    }).json({ status: 200, information: isUserAuth });

  } catch (error) {
    if (error instanceof Error) {
      return res.json({ status: 500, error: error.message });
    }
  }
}


export const authAccessToken = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  const userMethods = new Users(null);
  if (!token) {
    return res.json({ status: 401, error: 'Something went wrong' });
  }

  try {
    const isValid = jwt.verify(token, SECRET_KEY);

    if (!isValid || typeof isValid === 'string') {
      return res.json({ status: 401, error: 'Something went wrong' });
    }

    const information = await userMethods.getUser(isValid.email);

    return res.json({ status: 200, information });

  } catch (error) {
    if (error instanceof Error) {
      return res.json({ status: 500, error: error.message });
    }
  }
};
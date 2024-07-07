import { Request, Response } from 'express';
import { Bans } from '../../services/Bans.service';

//controller to check wether the is banned or not from the app
export const checkUserBanApp = async (req: Request, res: Response) => {
  const { email } = req.body;
  const BansUsers = new Bans();
  try {
    const response = await BansUsers.checkUser({
      user: email,
      fromApp: true
    });
    return res.json({ status: 200, response });
  } catch (error) {
    return res.json({ status: 500, error });
  }
};

//controller to check wether the is blocked by other user
export const checkUserBan = async (req: Request, res: Response) => {
  const { email, user } = req.body;
  const BansUsers = new Bans();
  try {
    const response = await BansUsers.checkUser({ user, email, fromApp: false });
    return res.json({ status: 200, response });
  } catch (error) {
    return res.json({ status: 500, error });
  }
};


//it ban a user from the app
export const banApp = async (req: Request, res: Response) => {
  const { email } = req.body;
  const BansUsers = new Bans();

  try {
    const response = await BansUsers.banFromApp(email);
    if (response === '') return res.json({ status: 200, message: 'User ban from app successfully' });

    return res.json({ status: 409, message: response });
  } catch (error) {
    return res.json({ status: 500, error });
  }
};

//it allows to the users block other users
export const banUser = async (req: Request, res: Response) => {
  const BansUsers = new Bans();
  try {
    const response = await BansUsers.banUser({ email: req.body.email, userToBan: req.body.user });
    if (response === '') return res.json({ status: 200, message: 'User ban from app successfully' });

    return res.json({ status: 409, message: response });
  } catch (error) {
    return res.json({
      status: 500,
      error,
    });
  }
};

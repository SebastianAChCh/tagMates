import db from '../../configurations/firebaseAdmin';
import { Request, Response } from 'express';

//This arrow function checks if the user is ban from the app in firestore
const checkIfUserBan = async (email: string) => {
  try {
    const response = await db
      .collection('BansFromApp')
      .where('Email', '==', email)
      .get();

    return response.docs[0] != undefined;
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
};

//This arrow function is used for a route where the frontEnd goes to checks if a user is either ban or not
export const checkUserBan = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const response = await checkIfUserBan(email);

    return res.json({
      status: 200,
      response: !!response,
    });
  } catch (error) {
    return res.json({
      status: 500,
      error,
    });
  }
};

//it ban a user from the app
export const banApp = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const responseUserBan = await checkIfUserBan(email);

    if (responseUserBan) {
      return res.json({
        status: 409,
        message: 'The user is already ban',
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      error,
    });
  }

  try {
    await db.collection('BansFromApp').add({
      userBan: email,
    });

    return res.json({
      status: 200,
      message: 'User ban from app successfully',
    });
  } catch (error) {
    return res.json({
      status: 500,
      error,
    });
  }
};

//This arrow function checks if the user is blocked in firestore
const checkIfUserBlocked = async (userBlocked: string, userBlocking: string) => {
  try {
    const result = await db
      .collection('Bans')
      .where('userBlocked', '==', userBlocked.toString())
      .where('userBlocking', '==', userBlocking.toString())
      .limit(1)
      .get();

    return result.docs[0] != undefined;
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
};

//This arrow function is used for a route where the frontEnd goes to checks if a user is either blocked or not
export const checkUserBlocked = async (req: Request, res: Response) => {
  const { userBlocked, userBlocking } = req.query;
  try {
    //it calls the functions that actually verifies if the user is blocked
    const response = await checkIfUserBlocked(String(userBlocked), String(userBlocking));

    return res.json({
      status: 200,
      response: !!response,
    });
  } catch (error) {
    return res.json({
      status: 500,
      error,
    });
  }
};

//it allows to the users block other users
export const banUser = async (req: Request, res: Response) => {
  const { userBlocked, userBlocking } = req.body;
  try {
    const responseUserBlocked = await checkIfUserBlocked(
      userBlocked,
      userBlocking
    );

    if (responseUserBlocked) {
      return res.json({
        status: 409,
        message: 'The user is already blocked',
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      error,
    });
  }

  try {
    await db.collection('Bans').add({
      userBlocked,
      userBlocking,
    });

    return res.json({
      status: 200,
      message: 'User blocked successfully',
    });
  } catch (error) {
    return res.json({
      status: 500,
      error,
    });
  }
};

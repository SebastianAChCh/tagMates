import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../configurations/conf';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            error: 'There was an error with the authentication'
        });
    }
    try {
        const isUserAuth = jwt.verify(token, SECRET_KEY);

        if (!isUserAuth) {
            return res.status(401).json({
                error: 'There was a problem with the authentication'
            });
        }

        next();
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
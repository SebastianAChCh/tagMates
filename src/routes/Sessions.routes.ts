import { Router, Request, Response } from 'express';
import { refreshToken, authAccessToken, logIn, signUp } from './controllers/Sessions.controller';

const router = Router();

router.get('/logOut', (req: Request, res: Response) => {
    res.cookie('access_token', '', { expires: new Date(0) });
    return res.json({ message: 'cookie deleted' })
});

router.post('/signUp', signUp);

router.post('/logIn', logIn);

router.post('/refreshToken', refreshToken);

router.post('/authAccessToken', authAccessToken);

export default router;

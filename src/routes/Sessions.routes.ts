import { Router } from 'express';
import { refreshToken, authAccessToken, logIn, signUp, logOut } from './controllers/Sessions.controller';

const router = Router();

router.get('/logOut', logOut);

router.post('/signUp', signUp);

router.post('/logIn', logIn);

router.post('/refreshToken', refreshToken);

router.post('/authAccessToken', authAccessToken);

export default router;

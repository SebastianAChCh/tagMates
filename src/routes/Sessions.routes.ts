import { Router } from 'express';
import { logIn, signUp } from './controllers/Sessions.controller';

const router = Router();

router.post('/signUp', signUp);

router.post('/logIn', logIn);

export default router;

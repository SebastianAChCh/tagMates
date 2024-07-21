import { Router } from 'express';
import { userInformation, deleteUser } from './controllers/UserInformation.controller'
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.post('/getInformationUser', isAuth, userInformation);
router.post('/deleteUser', isAuth, deleteUser);

export default router;
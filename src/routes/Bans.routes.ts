import { Router } from 'express';
import {
  banApp,
  banUser,
  checkUserBan,
  checkUserBlocked,
} from './controllers/Bans.controller';

const router = Router();

router.get('/userBanApp', checkUserBan);
router.post('/banApp', banApp);
router.get('/userBlocked', checkUserBlocked);
router.post('/ban', banUser);

export default router;

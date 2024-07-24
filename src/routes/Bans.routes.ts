import { Router } from 'express';
import { banApp, banUser, checkUserBan } from './controllers/Bans.controller'

const router = Router();

router.post('/userBanApp', checkUserBan);
router.post('/banApp', banApp);
router.post('/userBlocked', checkUserBan);
router.post('/ban', banUser);

export default router;

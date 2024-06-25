import { Router } from 'express'
import { loadMessages, saveMessages } from './controllers/Messages.controller';

const router = Router();

router.post('/saveMessage', saveMessages);
router.get('/loadMessages', loadMessages);

export default router;
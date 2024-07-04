import { Router } from 'express'
import { loadMessages, saveTextMessages, saveFileMessages } from './controllers/Messages.controller';

const router = Router();

router.post('/saveTextMessage', saveTextMessages);
router.post('/saveFileMessage', saveFileMessages);
router.post('/loadMessages', loadMessages);

export default router;
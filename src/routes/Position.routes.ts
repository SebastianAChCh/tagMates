import { Router } from 'express';
import { updateCurrentPosition } from './controllers/Position.controller';

const router = Router();

router.post('/saveCurrentPos', updateCurrentPosition);

export default router;

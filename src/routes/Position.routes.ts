import { Router } from 'express';
import { updateCurrentPosition, changeProximityState, getProximityState } from './controllers/Position.controller';

const router = Router();

router.post('/saveCurrentPos', updateCurrentPosition);
router.post('/changeProximityState', changeProximityState);
router.post('/getProximityState', getProximityState);

export default router;

import { Router } from 'express';
import { saveHealthInfo, updateHealthInfo, loadHealthInfo } from './controllers/Health.controller'

const router = Router();

router.post('/saveHealthInfo', saveHealthInfo);
router.post('/updateHealthInfo', updateHealthInfo);
router.post('/loadHealthInfo', loadHealthInfo);

export default Router;
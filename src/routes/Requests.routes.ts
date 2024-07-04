import { Router } from 'express';
import { sendRequest } from './controllers/Requests.controller';

const router = Router();

router.post('/sendRequest', sendRequest);


export default router;
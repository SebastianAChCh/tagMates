import { Router } from 'express';
import { loadContacts, saveContact } from './controllers/Contacts.controller';

const router = Router();

router.post('/loadContacts', loadContacts);
router.post('/saveContact', saveContact);

export default router;
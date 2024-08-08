import { Router } from 'express';
import { userInformation, deleteUser, addTags, addPhoto, addPictures, addSummary, addDiary, getDiary, updateDiary, deleteDiary } from './controllers/UserInformation.controller'
import { isAuth } from '../middlewares/isAuth';

const router = Router();

router.post('/getInformationUser', userInformation);
router.post('/deleteUser', isAuth, deleteUser);

router.post('/addTags', addTags);
router.post('/addPhoto', addPhoto);
router.post('/addPictures', addPictures);
router.post('/addSummary', addSummary);

router.post('/addDiary', addDiary);
router.post('/getDiary', getDiary);
router.post('/updateDiary', updateDiary,);
router.post('/deleteDiary', deleteDiary);

export default router;
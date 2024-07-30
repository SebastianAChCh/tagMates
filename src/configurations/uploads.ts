import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storeImages = multer.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (_req, file, cb) => {
        cb(null, uuidv4() + file.originalname);
    },
});

const storeAvatarImgs = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (_req, file, cb) => {
        cb(null, uuidv4() + file.originalname);
    },
});

const storeFiles = multer.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, './uploads');
    },

    filename: (_req, file, cb) => {
        cb(null, uuidv4() + file.originalname);
    },
});

export const uploadImages = multer({
    storage: storeImages,
}).array('postImages', 10);

export const uploadFiles = multer({
    storage: storeFiles,
}).single('file');

export const uploadAvatars = multer({
    storage: storeAvatarImgs,
}).single('file');

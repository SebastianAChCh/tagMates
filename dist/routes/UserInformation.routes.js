"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserInformation_controller_1 = require("./controllers/UserInformation.controller");
const isAuth_1 = require("../middlewares/isAuth");
const router = (0, express_1.Router)();
router.post('/getInformationUser', isAuth_1.isAuth, UserInformation_controller_1.userInformation);
router.post('/deleteUser', isAuth_1.isAuth, UserInformation_controller_1.deleteUser);
router.post('/addTags', UserInformation_controller_1.addTags);
router.post('/addPhoto', UserInformation_controller_1.addPhoto);
router.post('/addPictures', UserInformation_controller_1.addPictures);
router.post('/addSummary', UserInformation_controller_1.addSummary);
router.post('/addDiary', UserInformation_controller_1.addDiary);
router.post('/getDiary', UserInformation_controller_1.getDiary);
router.post('/updateDiary', UserInformation_controller_1.updateDiary);
router.post('/deleteDiary', UserInformation_controller_1.deleteDiary);
exports.default = router;
//# sourceMappingURL=UserInformation.routes.js.map
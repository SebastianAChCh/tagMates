"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDiary = exports.updateDiary = exports.getDiary = exports.addDiary = exports.addSummary = exports.addPictures = exports.addPhoto = exports.addTags = exports.deleteUser = exports.userInformation = void 0;
const Users_service_1 = require("../../services/Users.service");
const Diary_service_1 = require("../../services/Diary.service");
const userInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const userInformation = new Users_service_1.Users(null);
    try {
        const informationUser = yield userInformation.getUser(email);
        if (typeof informationUser === 'string') {
            return res.json({ status: 404, error: informationUser });
        }
        return res.json({ status: 200, information: informationUser });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.userInformation = userInformation;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const userInformation = new Users_service_1.Users(null);
    try {
        userInformation.deleteUser(email);
        return res.json({ status: 200, information: 'user deleted successfully' });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.deleteUser = deleteUser;
const addTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInformation = new Users_service_1.Users(null);
    try {
        yield userInformation.addTags(req.body);
        return res.json({ status: 200, information: 'Tags added successfully' });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.addTags = addTags;
const addPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInformation = new Users_service_1.Users(null);
    try {
        yield userInformation.addPhoto(req.body);
        return res.json({ status: 200, information: 'Photo changed successfully' });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.addPhoto = addPhoto;
const addPictures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInformation = new Users_service_1.Users(null);
    try {
        yield userInformation.addPhotos(req.body);
        return res.json({ status: 200, information: 'Photo added successfully' });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.addPictures = addPictures;
const addSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInformation = new Users_service_1.Users(null);
    try {
        yield userInformation.addSummary(req.body);
        return res.json({ status: 200, information: 'Summary changed successfully' });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.addSummary = addSummary;
const addDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const diaryInformation = new Diary_service_1.Diary();
    try {
        yield diaryInformation.addDiary(req.body);
        return res.json({ status: 200, information: 'Diary added successfully' });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.addDiary = addDiary;
const getDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const diaryInformation = new Diary_service_1.Diary();
    try {
        const diary = yield diaryInformation.getDiary(req.body);
        if (typeof diary === 'string') {
            return res.json({ status: 404, error: diary });
        }
        return res.json({ status: 200, information: diary });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.getDiary = getDiary;
const updateDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const diaryInformation = new Diary_service_1.Diary();
    try {
        const response = yield diaryInformation.updateDiary(req.body);
        if (typeof response === 'string') {
            return res.json({ status: 404, error: response });
        }
        return res.json({ status: 200, information: 'Diary updated successfully' });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.updateDiary = updateDiary;
const deleteDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const diaryInformation = new Diary_service_1.Diary();
    try {
        const response = yield diaryInformation.deleteDiary(req.body);
        if (typeof response === 'string')
            return res.json({ status: 404, error: response });
        return res.json({ status: 200, information: 'The diary was deleted successfully' });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.deleteDiary = deleteDiary;
//# sourceMappingURL=UserInformation.controller.js.map
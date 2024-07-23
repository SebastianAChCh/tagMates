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
exports.banUser = exports.banApp = exports.checkUserBan = exports.checkUserBanApp = void 0;
const Bans_service_1 = require("../../services/Bans.service");
//controller to check wether the is banned or not from the app
const checkUserBanApp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const BansUsers = new Bans_service_1.Bans();
    try {
        const response = yield BansUsers.checkUser({
            user: email,
            fromApp: true
        });
        return res.json({ status: 200, response });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.checkUserBanApp = checkUserBanApp;
//controller to check wether the is blocked by other user
const checkUserBan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, user } = req.body;
    const BansUsers = new Bans_service_1.Bans();
    try {
        const response = yield BansUsers.checkUser({ user, email, fromApp: false });
        return res.json({ status: 200, response });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.checkUserBan = checkUserBan;
//it ban a user from the app
const banApp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const BansUsers = new Bans_service_1.Bans();
    try {
        const response = yield BansUsers.banFromApp(email);
        if (response === '')
            return res.json({ status: 200, message: 'User ban from app successfully' });
        return res.json({ status: 409, message: response });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.banApp = banApp;
//it allows to the users block other users
const banUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BansUsers = new Bans_service_1.Bans();
    try {
        const response = yield BansUsers.banUser({ email: req.body.email, userToBan: req.body.user });
        if (response === '')
            return res.json({ status: 200, message: 'User ban from app successfully' });
        return res.json({ status: 409, message: response });
    }
    catch (error) {
        return res.json({ status: 500, error: error.message });
    }
});
exports.banUser = banUser;
//# sourceMappingURL=Bans.controller.js.map
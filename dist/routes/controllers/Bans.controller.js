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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.banUser = exports.checkUserBlocked = exports.banApp = exports.checkUserBan = void 0;
const firebaseAdmin_1 = __importDefault(require("../../configurations/firebaseAdmin"));
//This arrow function checks if the user is ban from the app in firestore
const checkIfUserBan = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield firebaseAdmin_1.default
            .collection('BansFromApp')
            .where('Email', '==', email)
            .get();
        return response.docs[0] != undefined;
    }
    catch (error) {
        console.error(error);
        throw new Error(String(error));
    }
});
//This arrow function is used for a route where the frontEnd goes to checks if a user is either ban or not
const checkUserBan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const response = yield checkIfUserBan(email);
        return res.json({
            status: 200,
            response: !!response,
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            error,
        });
    }
});
exports.checkUserBan = checkUserBan;
//it ban a user from the app
const banApp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const responseUserBan = yield checkIfUserBan(email);
        if (responseUserBan) {
            return res.json({
                status: 409,
                message: 'The user is already ban',
            });
        }
    }
    catch (error) {
        return res.json({
            status: 500,
            error,
        });
    }
    try {
        yield firebaseAdmin_1.default.collection('BansFromApp').add({
            userBan: email,
        });
        return res.json({
            status: 200,
            message: 'User ban from app successfully',
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            error,
        });
    }
});
exports.banApp = banApp;
//This arrow function checks if the user is blocked in firestore
const checkIfUserBlocked = (userBlocked, userBlocking) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield firebaseAdmin_1.default
            .collection('Bans')
            .where('userBlocked', '==', userBlocked.toString())
            .where('userBlocking', '==', userBlocking.toString())
            .limit(1)
            .get();
        return result.docs[0] != undefined;
    }
    catch (error) {
        console.error(error);
        throw new Error(String(error));
    }
});
//This arrow function is used for a route where the frontEnd goes to checks if a user is either blocked or not
const checkUserBlocked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userBlocked, userBlocking } = req.query;
    try {
        //it calls the functions that actually verifies if the user is blocked
        const response = yield checkIfUserBlocked(String(userBlocked), String(userBlocking));
        return res.json({
            status: 200,
            response: !!response,
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            error,
        });
    }
});
exports.checkUserBlocked = checkUserBlocked;
//it allows to the users block other users
const banUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userBlocked, userBlocking } = req.body;
    try {
        const responseUserBlocked = yield checkIfUserBlocked(userBlocked, userBlocking);
        if (responseUserBlocked) {
            return res.json({
                status: 409,
                message: 'The user is already blocked',
            });
        }
    }
    catch (error) {
        return res.json({
            status: 500,
            error,
        });
    }
    try {
        yield firebaseAdmin_1.default.collection('Bans').add({
            userBlocked,
            userBlocking,
        });
        return res.json({
            status: 200,
            message: 'User blocked successfully',
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            error,
        });
    }
});
exports.banUser = banUser;
//# sourceMappingURL=Bans.controller.js.map
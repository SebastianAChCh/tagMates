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
exports.authAccessToken = exports.refreshToken = exports.signUp = exports.logIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_service_1 = require("../../services/Users.service");
const conf_1 = require("../../configurations/conf");
const Token_service_1 = require("../../services/Token.service");
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userMethods = new Users_service_1.Users(null);
    try {
        const userInfo = yield userMethods.logIn({ email, password });
        if (typeof userInfo === 'string') {
            return res.json({ status: 401, information: userInfo });
        }
        return res.cookie('access_token', userInfo.access_token, {
            httpOnly: true,
            secure: conf_1.NODE_ENV === 'Production',
        }).json({ status: 200, information: userInfo.userInformation, refresh_token: userInfo.refreshToken });
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
exports.logIn = logIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersMethods = new Users_service_1.Users(req.body);
    try {
        const userInfo = yield usersMethods.createUser();
        if (typeof userInfo === 'string') {
            return res.json({ status: 404, error: userInfo });
        }
        return res.cookie('access_token', userInfo.access_token, {
            httpOnly: true,
            secure: conf_1.NODE_ENV === 'Production',
        }).json({ status: 200, information: userInfo.userInformation, refresh_token: userInfo.refreshToken });
    }
    catch (error) {
        return res.status(500).send({ error: String(error) });
    }
});
exports.signUp = signUp;
const refreshToken = (req, res) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.json({ status: 401 });
    }
    const tokenMethods = new Token_service_1.Token();
    try {
        const isUserAuth = jsonwebtoken_1.default.verify(token, conf_1.SECRET_KEY);
        if (!isUserAuth || typeof isUserAuth === 'string') {
            return res.json({ status: 401, information: 'There was an error' });
        }
        return res.cookie('access_token', tokenMethods.generateToken({ age: isUserAuth.age, email: isUserAuth.email, fullname: isUserAuth.fullname, duration: '1h' }), {
            httpOnly: true,
            secure: conf_1.NODE_ENV === 'Production',
        }).json({ status: 200, information: isUserAuth });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.json({ status: 500, error: error.message });
        }
    }
};
exports.refreshToken = refreshToken;
const authAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.access_token;
    const userMethods = new Users_service_1.Users(null);
    if (!token) {
        return res.json({ status: 401, error: 'Something went wrong' });
    }
    try {
        const isValid = jsonwebtoken_1.default.verify(token, conf_1.SECRET_KEY);
        if (!isValid || typeof isValid === 'string') {
            return res.json({ status: 401, error: 'Something went wrong' });
        }
        const information = yield userMethods.getUser(isValid.email);
        return res.json({ status: 200, information });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.json({ status: 500, error: error.message });
        }
    }
});
exports.authAccessToken = authAccessToken;
//# sourceMappingURL=Sessions.controller.js.map
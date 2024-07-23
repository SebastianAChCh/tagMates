"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const conf_1 = require("../configurations/conf");
const isAuth = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            error: 'There was an error with the authentication'
        });
    }
    try {
        const isUserAuth = jsonwebtoken_1.default.verify(token, conf_1.SECRET_KEY);
        if (!isUserAuth || typeof isUserAuth === 'string') {
            return res.status(401).json({
                error: 'There was a problem with the authentication'
            });
        }
        if (isUserAuth.email !== req.body.email) {
            return res.status(401).json({
                error: 'Something went wrong'
            });
        }
        next();
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map
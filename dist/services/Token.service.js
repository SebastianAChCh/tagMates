"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const conf_1 = require("../configurations/conf");
class Token {
    validateToken(token) {
        try {
            const isValid = jsonwebtoken_1.default.verify(token, conf_1.SECRET_KEY);
            return isValid;
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
    generateToken(TokenData) {
        const Token = jsonwebtoken_1.default.sign(TokenData, conf_1.SECRET_KEY, {
            expiresIn: TokenData.duration,
        });
        return Token;
    }
}
exports.Token = Token;
//# sourceMappingURL=Token.service.js.map
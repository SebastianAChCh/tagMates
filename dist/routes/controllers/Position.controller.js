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
exports.updateCurrentPosition = void 0;
const Users_service_1 = require("../../services/Users.service");
const updateCurrentPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coordinates, email } = req.body;
    try {
        const userNewPos = new Users_service_1.Users(null);
        yield userNewPos.updateCoordinates(coordinates, email);
        return res.json({ status: 200 });
    }
    catch (error) {
        console.error(error);
        return res.json({ status: 500, error });
    }
});
exports.updateCurrentPosition = updateCurrentPosition;
//# sourceMappingURL=Position.controller.js.map
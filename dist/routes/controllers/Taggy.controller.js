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
exports.loadMessages = void 0;
const Taggy_service_1 = require("../../services/Taggy.service");
const loadMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TaggyMethods = new Taggy_service_1.Taggy();
    try {
        const messages = yield TaggyMethods.loadMessages(req.body);
        if (!messages) {
            return res.json({
                status: 404,
                error: 'There was an error getting the data'
            });
        }
        return res.json({
            status: 200,
            information: messages
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            error: error instanceof Error ? error.message : ''
        });
    }
});
exports.loadMessages = loadMessages;
//# sourceMappingURL=Taggy.controller.js.map
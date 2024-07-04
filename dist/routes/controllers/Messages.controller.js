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
exports.saveFileMessages = exports.loadMessages = exports.saveTextMessages = void 0;
const fs_1 = __importDefault(require("fs"));
const Messages_service_1 = require("../../services/Messages.service");
const saveTextMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = new Messages_service_1.MessagesSocket(req.body.email);
    try {
        yield messages.saveMessages(req.body.Message);
        return res.json({
            status: 200
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            error
        });
    }
});
exports.saveTextMessages = saveTextMessages;
const loadMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        return res.json({
            status: 200,
        });
    }
    catch (error) {
        return res.json({
            status: 500,
            error
        });
    }
});
exports.loadMessages = loadMessages;
const saveFileMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file, filename) => {
        const newFile = fs_1.default.createWriteStream(`/${filename}`);
        file.pipe(newFile);
        newFile.on('close', () => {
            res.json({
                status: 200,
                message: 'File saved successfully'
            });
        });
    });
});
exports.saveFileMessages = saveFileMessages;
//# sourceMappingURL=Messages.controller.js.map
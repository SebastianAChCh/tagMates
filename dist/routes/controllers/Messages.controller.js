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
const path_1 = require("path");
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
    try {
        const messages = new Messages_service_1.MessagesSocket(req.body.email);
        const response = yield messages.loadMessages(req.body.user);
        return res.json({
            status: 200,
            response
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
let responseSent = false;
const saveFileMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.pipe(req.busboy);
    const body = {};
    const pathSrc = (0, path_1.resolve)(__dirname, '../../');
    req.busboy.on('field', (fieldname, val) => body[fieldname] = val); //Save the data of the body in a object called "body"
    req.busboy.on('file', (_, file, filename) => {
        if (!fs_1.default.existsSync((0, path_1.join)(pathSrc, 'uploads', `${body['email']}`))) { //check if the folder exist
            fs_1.default.mkdirSync((0, path_1.join)(pathSrc, 'uploads', `${body['email']}`)); //if does not exist, then create it            
        }
        if (!fs_1.default.existsSync((0, path_1.join)(pathSrc, 'uploads', `${body['email']}`, `${body['type']}`))) { //check if the folder exist
            fs_1.default.mkdirSync((0, path_1.join)(pathSrc, 'uploads', `${body['email']}`, `${body['type']}`)); //if does not exist, then create it
        }
        const dirPath = (0, path_1.join)(pathSrc, 'uploads', `${body['email']}`, `${body['type']}`, String(filename.filename));
        const createFile = fs_1.default.createWriteStream(dirPath);
        file.pipe(createFile);
        createFile.on('close', () => {
            responseSent = true;
            return res.json({ status: 200, message: 'File saved successfully' });
        });
        createFile.on('error', (err) => {
            console.error('There was an error saving the file', err);
            if (!responseSent) {
                return res.json({ status: 200, message: 'There was an error saving the file' });
            }
        });
    });
});
exports.saveFileMessages = saveFileMessages;
//# sourceMappingURL=Messages.controller.js.map
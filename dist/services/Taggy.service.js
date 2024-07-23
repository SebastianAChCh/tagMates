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
exports.Taggy = void 0;
const openai_1 = __importDefault(require("openai"));
const firebaseAdmin_1 = require("../configurations/firebaseAdmin");
class Taggy {
    constructor() {
        this.openai = new openai_1.default();
    }
    getMessage(Message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stream = yield this.openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "system", content: 'You are a helpful assistant that helps the users with their doubts and problems' }, { role: "user", content: Message.message }],
                    stream: true,
                    response_format: { type: 'json_object' }
                });
                if (stream.choices[0].message.content) {
                    this.saveMessage(Message);
                }
                return stream.choices[0].message.content;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    saveMessage(Message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInformation = Object.assign(Object.assign({}, Message), { _user: Message.user });
                yield firebaseAdmin_1.dbFirestore.collection('TaggyMessages').doc(Message.user).collection('Messages').add({
                    userInformation,
                });
                return;
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    loadMessages(Message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield firebaseAdmin_1.dbFirestore.collection('TaggyMessages').doc(Message.user).collection('Messages').get();
                return messages.docs[0];
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
}
exports.Taggy = Taggy;
//# sourceMappingURL=Taggy.service.js.map
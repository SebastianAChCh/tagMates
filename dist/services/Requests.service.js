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
exports.Requests = void 0;
const firebaseAdmin_1 = require("../configurations/firebaseAdmin");
const Contacts_service_1 = require("./Contacts.service");
class Requests {
    addRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebaseAdmin_1.dbFirestore.collection('Requests').doc(data.receiver).collection(data.sender).add({
                    status: 'waiting'
                });
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    checkResponse(data) {
        const contacts = new Contacts_service_1.Contacts();
        switch (data.response) {
            case 'Accepted':
                contacts.saveContacts({
                    email: data.sender,
                    user: data.receiver
                });
                break;
            case 'Rejected':
                this.removeRequest({ receiver: data.receiver, sender: data.sender });
                break;
            default:
                console.error('That type is not supported.');
                break;
        }
    }
    removeRequest(data) {
        try {
            firebaseAdmin_1.dbFirestore.collection('Requests').doc(data.receiver).collection(data.sender);
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}
exports.Requests = Requests;
//# sourceMappingURL=Requests.service.js.map
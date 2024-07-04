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
exports.Contacts = void 0;
const firebaseAdmin_1 = require("../configurations/firebaseAdmin");
class Contacts {
    getContact(email, contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Contacts = yield firebaseAdmin_1.dbFirestore.collection('Contacts').where('email', '==', email).limit(1).get();
                if (Contacts.docs[0]) {
                    const users = Contacts.docs[0].data().Contacts;
                    const data = users.filter(user => user === contact);
                    return data;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        });
    }
    loadContacts(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ContactsResponse = yield firebaseAdmin_1.dbFirestore.collection('Contacts').doc(email).collection('Users').get();
                return ContactsResponse;
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        });
    }
    saveContacts(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebaseAdmin_1.dbFirestore.collection('Contacts').doc(contact.email).collection('Users').add({ email: contact.otherEmail });
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        });
    }
}
exports.Contacts = Contacts;
//# sourceMappingURL=Contacts.service.js.map
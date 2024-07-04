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
exports.MessagesSocket = void 0;
const firebaseAdmin_1 = require("../configurations/firebaseAdmin");
const Contacts_service_1 = require("./Contacts.service");
class MessagesSocket {
    constructor(email) {
        this.email = email;
        this.Contacts = new Contacts_service_1.Contacts();
    }
    saveMessages(Message) {
        return __awaiter(this, void 0, void 0, function* () {
            let otherEmail = ''; //it will contains the contact at which the user is talking
            if (Message.sender === this.email) {
                otherEmail = Message.receiver;
            }
            else {
                otherEmail = Message.sender;
            }
            const contactExist = yield this.Contacts.getContact(this.email, otherEmail);
            let ID;
            if (contactExist.length < 1) {
                ID = firebaseAdmin_1.dbFirestore.collection('Conversations').doc().id;
                const newContact = {
                    email: this.email,
                    otherEmail,
                    ID
                };
                this.Contacts.saveContacts(newContact);
            }
            else {
                ID = yield this.getMessagesId(this.email, otherEmail); //ID of the document where the messages are
            }
            try {
                yield firebaseAdmin_1.dbFirestore.collection('Conversations').doc(ID).collection('Messages').add(Message);
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        });
    }
    //This method will return the id of the document where the messages are in the collection "Conversations"
    getMessagesId(userA, userB) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultMessagesID = yield firebaseAdmin_1.dbFirestore.collection('MessagesID').doc(userA).collection('Contacts').where('User.Username', '==', userB).get();
                return resultMessagesID.docs[0].data().User.ID;
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        });
    }
    loadMessages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const Messages = await db.collection('Conversations').doc(id).collection('Messages').where();
                // return Messages;
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        });
    }
}
exports.MessagesSocket = MessagesSocket;
//# sourceMappingURL=Messages.service.js.map
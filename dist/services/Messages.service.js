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
const uuid_1 = require("uuid");
class MessagesSocket {
    constructor(email) {
        this.email = email;
    }
    saveMessages(Message) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = ''; //It w contains the contact at which the user is talking
            if (Message.sender === this.email)
                user = Message.receiver;
            else
                user = Message.sender;
            let ID;
            ID = yield this.getConversationId(user);
            if (!ID) {
                ID = (0, uuid_1.v7)(); //Generating and ID, it needs to be replaced in a future
                this.saveConversationID(user, ID); //Saving also the id of the document where the messages are
            }
            try {
                yield firebaseAdmin_1.dbFirestore.collection('Conversations').doc(ID).collection('Messages').add(Object.assign(Object.assign({}, Message), { date: firebaseAdmin_1.Timestamp.now() }));
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    saveConversationID(user, ID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebaseAdmin_1.dbFirestore.collection('ConversationID').doc(this.email).collection('Contacts').add({
                    'Username': user,
                    'Id': ID
                });
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
            try {
                yield firebaseAdmin_1.dbFirestore.collection('ConversationID').doc(user).collection('Contacts').add({
                    'Username': this.email,
                    'Id': ID
                });
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    //This method will return the id of the document where the messages are in the collection "Conversations"
    getConversationId(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultMessagesID = yield firebaseAdmin_1.dbFirestore.collection('ConversationID').doc(this.email).collection('Contacts').where('Username', '==', user).get();
                if (resultMessagesID.docs.length < 1) {
                    return null;
                }
                return resultMessagesID.docs[0].data().Id;
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    loadMessages(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversationID = yield this.getConversationId(user);
            let messages;
            try {
                messages = yield firebaseAdmin_1.dbFirestore.collection('Conversations').doc(conversationID).collection('Messages').where('sender', '==', user).get();
                if (!messages) {
                    messages = yield firebaseAdmin_1.dbFirestore.collection('Conversations').doc(conversationID).collection('Messages').where('receiver', '==', user).get();
                }
                return messages;
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
}
exports.MessagesSocket = MessagesSocket;
//# sourceMappingURL=Messages.service.js.map
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
exports.saveContact = exports.loadContacts = void 0;
const Contacts_service_1 = require("../../services/Contacts.service");
const loadContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = new Contacts_service_1.Contacts();
    try {
        const contactsLoaded = yield contacts.loadContacts(req.body.email);
        if (!contactsLoaded.docs[0]) {
            return res.json({
                status: 404,
                message: 'there are not contacts yet'
            });
        }
        const contactsResponse = contactsLoaded.docs.map(cts => cts.data().email);
        return res.json({
            status: 200,
            contactsResponse
        });
    }
    catch (error) {
        return res.json({
            status: 200,
            error
        });
    }
});
exports.loadContacts = loadContacts;
const saveContact = (req, res) => {
    const contacts = new Contacts_service_1.Contacts();
    try {
        contacts.saveContacts({ email: req.body.email, user: req.body.user });
        return res.json({
            status: 200,
            message: 'Contact saved successfully'
        });
    }
    catch (error) {
        return res.json({
            status: 200,
            error
        });
    }
};
exports.saveContact = saveContact;
//# sourceMappingURL=Contacts.controller.js.map
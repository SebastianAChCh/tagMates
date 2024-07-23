"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Contacts_controller_1 = require("./controllers/Contacts.controller");
const router = (0, express_1.Router)();
router.post('/loadContacts', Contacts_controller_1.loadContacts);
router.post('/saveContact', Contacts_controller_1.saveContact);
exports.default = router;
//# sourceMappingURL=Contacts.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Messages_controller_1 = require("./controllers/Messages.controller");
const router = (0, express_1.Router)();
router.post('/saveTextMessage', Messages_controller_1.saveTextMessages);
router.post('/saveFileMessage', Messages_controller_1.saveFileMessages);
router.post('/loadMessages', Messages_controller_1.loadMessages);
exports.default = router;
//# sourceMappingURL=Messages.routes.js.map
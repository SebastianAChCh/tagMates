"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Taggy_controller_1 = require("./controllers/Taggy.controller");
const router = (0, express_1.Router)();
router.post('/loadMessages', Taggy_controller_1.loadMessages);
exports.default = router;
//# sourceMappingURL=Taggy.routes.js.map
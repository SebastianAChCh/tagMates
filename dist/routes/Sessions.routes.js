"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Sessions_controller_1 = require("./controllers/Sessions.controller");
const router = (0, express_1.Router)();
router.post('/signUp', Sessions_controller_1.signUp);
router.post('/logIn', Sessions_controller_1.logIn);
router.post('/refreshToken', Sessions_controller_1.refreshToken);
router.post('/authAccessToken', Sessions_controller_1.authAccessToken);
exports.default = router;
//# sourceMappingURL=Sessions.routes.js.map
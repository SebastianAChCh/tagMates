"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Bans_controller_1 = require("./controllers/Bans.controller");
const router = (0, express_1.Router)();
router.get('/userBanApp', Bans_controller_1.checkUserBan);
router.post('/banApp', Bans_controller_1.banApp);
router.get('/userBlocked', Bans_controller_1.checkUserBlocked);
router.post('/ban', Bans_controller_1.banUser);
exports.default = router;
//# sourceMappingURL=Bans.routes.js.map
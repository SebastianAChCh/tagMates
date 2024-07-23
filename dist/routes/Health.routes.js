"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Health_controller_1 = require("./controllers/Health.controller");
const router = (0, express_1.Router)();
router.post('/saveHealthInfo', Health_controller_1.saveHealthInfo);
router.post('/updateHealthInfo', Health_controller_1.updateHealthInfo);
router.post('/loadHealthInfo', Health_controller_1.loadHealthInfo);
exports.default = express_1.Router;
//# sourceMappingURL=Health.routes.js.map
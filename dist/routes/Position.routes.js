"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Position_controller_1 = require("./controllers/Position.controller");
const router = (0, express_1.Router)();
router.post('/saveCurrentPos', Position_controller_1.updateCurrentPosition);
router.post('/changeProximityState', Position_controller_1.changeProximityState);
router.post('/getProximityState', Position_controller_1.getProximityState);
exports.default = router;
//# sourceMappingURL=Position.routes.js.map
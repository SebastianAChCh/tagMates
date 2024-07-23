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
exports.loadHealthInfo = exports.updateHealthInfo = exports.saveHealthInfo = void 0;
const Health_service_1 = require("../../services/Health.service");
const saveHealthInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const healthMethods = new Health_service_1.Health();
    try {
        yield healthMethods.saveHealthInfo(req.body);
        return res.json({ status: 200, message: 'data created successfully' });
    }
    catch (error) {
        return res.json({ status: 500, error });
    }
});
exports.saveHealthInfo = saveHealthInfo;
const updateHealthInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const healthMethods = new Health_service_1.Health();
    try {
        yield healthMethods.updateHealthInfo(req.body);
        return res.json({ status: 200, message: 'data updated successfully' });
    }
    catch (error) {
        return res.json({ status: 500, error });
    }
});
exports.updateHealthInfo = updateHealthInfo;
const loadHealthInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const healthMethods = new Health_service_1.Health();
    try {
        const healthInfo = yield healthMethods.loadInfoHealth(req.body.email);
        return res.json({ status: 200, healthInfo });
    }
    catch (error) {
        return res.json({ status: 500, error });
    }
});
exports.loadHealthInfo = loadHealthInfo;
//# sourceMappingURL=Health.controller.js.map
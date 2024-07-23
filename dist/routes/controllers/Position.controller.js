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
exports.getProximityState = exports.changeProximityState = exports.updateCurrentPosition = void 0;
const Positions_service_1 = require("../../services/Positions.service");
const updateCurrentPosition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coordinates, email } = req.body;
    const userNewPos = new Positions_service_1.Positions();
    try {
        yield userNewPos.updateCoordinates({ coordinates, email });
        return res.json({ status: 200 });
    }
    catch (error) {
        console.error(error);
        return res.json({ status: 500, error: error instanceof Error ? error.message : '' });
    }
});
exports.updateCurrentPosition = updateCurrentPosition;
const changeProximityState = (req, res) => {
    const proximityState = new Positions_service_1.Positions();
    try {
        proximityState.changeProximityState(req.body);
        return res.json({ status: 200 });
    }
    catch (error) {
        console.error(error);
        return res.json({ status: 500, error: error instanceof Error ? error.message : '' });
    }
};
exports.changeProximityState = changeProximityState;
const getProximityState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const proximityState = new Positions_service_1.Positions();
    try {
        const response = yield proximityState.getProximityState(email);
        if (typeof response === 'string') {
            return res.json({ status: 404, error: response });
        }
        return res.json({ status: 200, information: response.Vibration_proximity });
    }
    catch (error) {
        console.error(error);
        return res.json({ status: 500, error: error instanceof Error ? error.message : '' });
    }
});
exports.getProximityState = getProximityState;
//# sourceMappingURL=Position.controller.js.map
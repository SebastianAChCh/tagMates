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
exports.Health = void 0;
const firebaseAdmin_1 = require("../configurations/firebaseAdmin");
class Health {
    saveHealthInfo(healthInformation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebaseAdmin_1.dbFirestore.collection('Medical_Information').doc(healthInformation.email).create(healthInformation);
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    updateHealthInfo(newInfoHealth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (newInfoHealth.newInfoHealth.medical_summary)
                    yield firebaseAdmin_1.dbFirestore.collection('Medical_Information').doc(newInfoHealth.email).update({ medical_summary: newInfoHealth.newInfoHealth.medical_summary });
                else if (newInfoHealth.newInfoHealth.oxygenation)
                    yield firebaseAdmin_1.dbFirestore.collection('Medical_Information').doc(newInfoHealth.email).update({ oxygenation: newInfoHealth.newInfoHealth.oxygenation });
                else if (newInfoHealth.newInfoHealth.pulse)
                    yield firebaseAdmin_1.dbFirestore.collection('Medical_Information').doc(newInfoHealth.email).update({ pulse: newInfoHealth.newInfoHealth.pulse });
                else if (newInfoHealth.newInfoHealth.temperature)
                    yield firebaseAdmin_1.dbFirestore.collection('Medical_Information').doc(newInfoHealth.email).update({ temperature: newInfoHealth.newInfoHealth.temperature });
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    loadInfoHealth(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const medicalData = yield firebaseAdmin_1.dbFirestore.collection('Medical_Information').doc(email).get();
                if (!medicalData)
                    return 'There is no content yet';
                return medicalData;
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
}
exports.Health = Health;
//# sourceMappingURL=Health.service.js.map
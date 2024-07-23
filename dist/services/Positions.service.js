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
exports.Positions = void 0;
const firebaseAdmin_1 = require("../configurations/firebaseAdmin");
const Users_service_1 = require("./Users.service");
class Positions {
    constructor() {
        this.UserMethods = new Users_service_1.Users(null);
    }
    getCoordinatesUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = yield this.UserMethods.getUserId(email);
            if (ID === 'That user does not exist')
                return ID;
            try {
                const coordinates = yield firebaseAdmin_1.dbRealTime.ref('Users/' + ID).get();
                const coordinatesVal = coordinates.val();
                const coordinatesKeys = Object.keys(coordinatesVal)[0];
                return coordinatesVal[coordinatesKeys];
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    updateCoordinates(newCoordinates) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = yield this.UserMethods.getUserId(newCoordinates.email);
            if (ID === 'That user does not exist')
                return;
            try {
                const newCoordinatesObj = newCoordinates.coordinates;
                yield firebaseAdmin_1.dbRealTime.ref('Users/' + ID).update(newCoordinatesObj);
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    changeProximityState(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = yield this.UserMethods.getUserId(data.email);
            if (ID === 'That user does not exist')
                return ID;
            try {
                yield firebaseAdmin_1.dbRealTime.ref('Users/' + ID).update({ Vibration_proximity: data.state });
                return;
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    getProximityState(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const proximityState = yield firebaseAdmin_1.dbRealTime.ref('Users').orderByChild('email').equalTo(email).once('value');
                if (!proximityState.exists()) {
                    return 'Something went wrong';
                }
                else {
                    const proximityStateVal = proximityState.val();
                    const proximityStateID = Object.keys(proximityStateVal)[0];
                    return proximityStateVal[proximityStateID];
                }
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    calculateDistance(coordinates) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = this.degreesToRadians(coordinates.coordinates2.latitude - coordinates.coordinates1.latitude);
        const dLon = this.degreesToRadians(coordinates.coordinates2.longitude - coordinates.coordinates1.longitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degreesToRadians(coordinates.coordinates1.latitude)) * Math.cos(this.degreesToRadians(coordinates.coordinates2.latitude)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        const radiusInKm = Number(coordinates.radius) / 1000; // Convert radius from meters to kilometers
        return distance <= radiusInKm;
    }
}
exports.Positions = Positions;
//# sourceMappingURL=Positions.service.js.map
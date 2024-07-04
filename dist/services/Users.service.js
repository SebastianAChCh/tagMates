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
exports.Users = void 0;
const firebaseAdmin_1 = require("../configurations/firebaseAdmin");
class Users {
    constructor(usersInfo) {
        this.info_users = {};
        if (usersInfo) {
            this.info_users = {
                fullname: usersInfo.fullname,
                email: usersInfo.email,
                age: usersInfo.age,
                emergency_contact: usersInfo.emergency_contact,
                avatar_path: usersInfo.avatar_path,
                tags: [],
                pictures: [],
                summary: '',
                rating: 0,
                Vibration_proximity: false,
                range: {
                    min: '',
                    max: ''
                },
                coordinates: {
                    latitude: 0,
                    longitude: 0,
                    latitudeDelta: 0,
                    longitudeDelta: 0,
                },
            };
        }
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userInfo = yield this.getUser(this.info_users.email);
                if (userInfo)
                    return false;
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
            try {
                const creationUser = firebaseAdmin_1.dbRealTime.ref('Users').push();
                yield creationUser.set(this.info_users);
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
            try {
                const userInfo = yield this.getUser(this.info_users.email);
                return userInfo;
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        });
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield firebaseAdmin_1.dbRealTime.ref('Users').orderByChild('email').equalTo(email).once('value');
                if (!response.exists()) {
                    return 'That user does not exist';
                }
                else {
                    const users = response.val();
                    const userId = Object.keys(users)[0];
                    return users[userId];
                }
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        });
    }
    getUserId(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield firebaseAdmin_1.dbRealTime.ref('Users').orderByChild('email').equalTo(email).once('value');
                if (!response.exists()) {
                    return 'That user does not exist';
                }
                else {
                    const users = response.val();
                    return Object.keys(users)[0];
                }
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        });
    }
    updateCoordinates(coordinates, email) {
        return __awaiter(this, void 0, void 0, function* () {
            let ID;
            try {
                ID = yield this.getUserId(email);
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
            try {
                const newCoordinates = { coordinates };
                yield firebaseAdmin_1.dbRealTime.ref('Users/' + ID).update(newCoordinates);
            }
            catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        });
    }
}
exports.Users = Users;
//# sourceMappingURL=Users.service.js.map
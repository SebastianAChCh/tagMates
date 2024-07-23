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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const firebaseAdmin_1 = require("../configurations/firebaseAdmin");
const Token_service_1 = require("./Token.service");
const conf_1 = require("../configurations/conf");
class Users {
    constructor(usersInfo) {
        this.info_users = {};
        if (usersInfo) {
            const saltRounds = conf_1.SALT_ROUNDS;
            let password = '';
            if (usersInfo.password) {
                password = bcrypt_1.default.hashSync(usersInfo.password, saltRounds);
            }
            this.info_users = {
                fullname: usersInfo.fullname,
                email: usersInfo.email,
                age: 0,
                password: password,
                emergency_contact: usersInfo.emergency_contact,
                avatar_path: usersInfo.avatar_path,
                tags: [],
                pictures: [],
                summary: '',
                rating: 0,
                Vibration_proximity: false,
                range: {
                    min: '',
                    max: '',
                },
                coordinates: {
                    latitude: 0,
                    longitude: 0,
                    latitudeDelta: 0,
                    longitudeDelta: 0,
                },
            };
        }
        this.TokenService = new Token_service_1.Token();
    }
    validations(userInfo) {
        const regex = '[a-zA-z]';
        if (!userInfo.fullname || !userInfo.fullname.trim())
            throw new Error('The name cannot be void');
        if (!userInfo.password ||
            !userInfo.password.trim() ||
            userInfo.password.length < 6)
            throw new Error('The password cannot be void or have less than 6 characters');
        if (!userInfo.email || !userInfo.email.trim())
            throw new Error('The email cannot be void');
        if (!userInfo.emergency_contact ||
            !userInfo.emergency_contact.trim() ||
            userInfo.emergency_contact.match(regex))
            throw new Error('The emergency contact cannot be void or contain letters');
        return true;
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.info_users.email) {
                const userInfo = yield this.getUser(this.info_users.email);
                if (typeof userInfo !== 'string') {
                    return 'The user already exist';
                } //check if the user does not exist yet
                this.validations(this.info_users); //check if there's a problem with the data that was given
                try {
                    const creationUser = firebaseAdmin_1.dbRealTime.ref('Users').push();
                    yield creationUser.set(this.info_users);
                }
                catch (error) {
                    console.error(error);
                    throw new Error(error.message);
                }
                if (!this.info_users.fullname || !this.info_users.email) {
                    throw new Error('Error, one or some values were not provided');
                }
                return {
                    userInformation: this.info_users,
                    access_token: this.TokenService.generateToken({
                        age: 0,
                        email: this.info_users.email,
                        fullname: this.info_users.fullname,
                        duration: '1h',
                    }),
                    refreshToken: this.TokenService.generateToken({
                        age: 0,
                        email: this.info_users.email,
                        fullname: this.info_users.fullname,
                        duration: '7d',
                    }),
                };
            }
            return 'Error, one or some values were not provided';
        });
    }
    logIn(dataSession) {
        return __awaiter(this, void 0, void 0, function* () {
            let userInfo;
            try {
                userInfo = yield this.getUser(dataSession.email);
                if (typeof userInfo === 'string')
                    return userInfo; //verify if the data was sent correctly or there was an error
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
            try {
                if (typeof userInfo !== 'string') {
                    if (!userInfo.password || !userInfo.email || !userInfo.fullname)
                        return 'one or some values were not provided';
                    const isPassCorrect = yield bcrypt_1.default.compare(dataSession.password, userInfo.password);
                    if (isPassCorrect) {
                        const { password: _ } = userInfo, userInformation = __rest(userInfo, ["password"]);
                        return {
                            userInformation,
                            access_token: this.TokenService.generateToken({
                                age: 0,
                                email: userInfo.email,
                                fullname: userInfo.fullname,
                                duration: '1h',
                            }),
                            refreshToken: this.TokenService.generateToken({
                                age: 0,
                                email: userInfo.email,
                                fullname: userInfo.fullname,
                                duration: '7d',
                            }),
                        };
                    }
                }
                return 'There was an error with the data that was given';
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    //
    addTags(tagsData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = this.getUserId(tagsData.email);
            try {
                yield firebaseAdmin_1.dbRealTime.ref('Users/' + userID).update({ tags: tagsData.tags });
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    addSummary(summaryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = this.getUserId(summaryData.email);
            try {
                yield firebaseAdmin_1.dbRealTime.ref('Users/' + userID).update({ summary: summaryData.summary });
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    addPhoto(photo) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = this.getUserId(photo.email);
            try {
                yield firebaseAdmin_1.dbRealTime.ref('Users/' + userID).update({ avatar_path: photo.url });
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    addPhotos(pictures) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = this.getUserId(pictures.email);
            try {
                yield firebaseAdmin_1.dbRealTime.ref('Users/' + userID).update({ pictures: pictures.urls });
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    //
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
                throw new Error(error.message);
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
                throw new Error(error.message);
            }
        });
    }
    updateInformation(newInformation) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = this.getUserId(newInformation.email);
            try {
                yield firebaseAdmin_1.dbRealTime.ref('Users/' + userID).update(newInformation.userNewInfo);
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userID = this.getUserId(email);
            try {
                yield firebaseAdmin_1.dbRealTime.ref('Users/' + userID).remove();
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
}
exports.Users = Users;
//# sourceMappingURL=Users.service.js.map
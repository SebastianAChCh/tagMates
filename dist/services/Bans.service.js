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
exports.Bans = void 0;
const firebaseAdmin_1 = require("../configurations/firebaseAdmin");
class Bans {
    banUser(BanUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const isBlocked = yield this.checkUser({
                user: BanUser.userToBan,
                email: BanUser.email,
                fromApp: false
            });
            if (isBlocked) {
                return 'The user is already blocked';
            }
            try {
                yield firebaseAdmin_1.dbFirestore.collection('UsersBan').doc(BanUser.email).collection('Users').add({
                    userBanned: BanUser.userToBan
                });
                return '';
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    //This method checks if the user is banned from the application or a user has blocked it before
    checkUser(userBan) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (userBan.fromApp) {
                    const user = yield firebaseAdmin_1.dbFirestore.collection('BanFromApp').where('email', '==', userBan.user).get();
                    return user.docs.length > 0;
                }
                if (userBan.email) {
                    const user = yield firebaseAdmin_1.dbFirestore.collection('UsersBlocked').doc(userBan.email).collection('Bans').where('email', '==', userBan.user).get();
                    return user.docs.length > 0;
                }
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    banFromApp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIsBlocked = yield this.checkUser({
                user: email,
                fromApp: true
            });
            if (userIsBlocked) {
                return 'The user is already banned';
            }
            try {
                yield firebaseAdmin_1.dbFirestore.collection('UsersBanFromApp').add({
                    userBanned: email
                });
                return '';
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
}
exports.Bans = Bans;
//# sourceMappingURL=Bans.service.js.map
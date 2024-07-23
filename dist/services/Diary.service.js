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
exports.Diary = void 0;
const firebaseAdmin_1 = require("../configurations/firebaseAdmin");
class Diary {
    addDiary(DiaryInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebaseAdmin_1.dbFirestore.collection('Diaries').doc(DiaryInfo.emailA).collection('Information').add(Object.assign(Object.assign({}, DiaryInfo), { _emailA: '' }));
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    updateDiary(newDiaryInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diaryInfo = yield firebaseAdmin_1.dbFirestore.collection('Diaries').doc(newDiaryInfo.emailA).collection('Information').where('emailB', '==', newDiaryInfo.emailB).get();
                if (diaryInfo.docs.length < 1) {
                    return 'Something went wrong updating the diary';
                }
                diaryInfo.forEach(diary => {
                    diary.ref.update(Object.assign(Object.assign({}, newDiaryInfo), { _emailA: '' }));
                });
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    deleteDiary(Users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diaryInformation = yield firebaseAdmin_1.dbFirestore.collection('Diaries').doc(Users.emailA).collection('Information').where('emailB', '==', Users.emailB).get();
                if (diaryInformation.docs.length < 1) {
                    return 'Something went wrong deleting the diary';
                }
                diaryInformation.forEach(diary => {
                    diary.ref.delete();
                });
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
    getDiary(Users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diaryInformation = yield firebaseAdmin_1.dbFirestore.collection('Diaries').doc(Users.emailA).collection('Information').where('emailB', '==', Users.emailB).get();
                if (diaryInformation.docs.length < 1) {
                    return 'Something went wrong getting the diary';
                }
                return diaryInformation.docs[0].data();
            }
            catch (error) {
                console.error(error);
                throw new Error(error.message);
            }
        });
    }
}
exports.Diary = Diary;
//# sourceMappingURL=Diary.service.js.map
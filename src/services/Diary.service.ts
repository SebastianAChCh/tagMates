import { dbFirestore as db } from '../configurations/firebaseAdmin';
import { UsersTp, DiaryInformation } from '../types/Diary';

export class Diary {
    public async addDiary(DiaryInfo: DiaryInformation): Promise<void> {
        try {
            await db.collection('Diaries').doc(DiaryInfo.emailA).collection('Information').add({
                ...DiaryInfo,
                _emailA: ''
            });
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public async updateDiary(newDiaryInfo: DiaryInformation): Promise<void | string> {
        try {
            const diaryInfo = await db.collection('Diaries').doc(newDiaryInfo.emailA).collection('Information').where('emailB', '==', newDiaryInfo.emailB).get();

            if (diaryInfo.docs.length < 1) {
                return 'Something went wrong updating the diary';
            }

            diaryInfo.forEach(diary => {
                diary.ref.update({
                    ...newDiaryInfo,
                    _emailA: ''
                })
            });
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message)
        }
    }

    public async deleteDiary(Users: UsersTp): Promise<void | string> {
        try {
            const diaryInformation = await db.collection('Diaries').doc(Users.emailA).collection('Information').where('emailB', '==', Users.emailB).get();
            if (diaryInformation.docs.length < 1) {
                return 'Something went wrong deleting the diary';
            }

            diaryInformation.forEach(diary => {
                diary.ref.delete();
            });

        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public async getDiary(Users: UsersTp): Promise<string | DiaryInformation> {
        try {
            const diaryInformation: any = await db.collection('Diaries').doc(Users.emailA).collection('Information').where('emailB', '==', Users.emailB).get();

            if (diaryInformation.docs.length < 1) {
                return 'Something went wrong getting the diary';
            }

            return diaryInformation.docs[0].data();
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

}
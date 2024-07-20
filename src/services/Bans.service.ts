import { BanUser, isUserBan } from '../types/Bans';
import { dbFirestore as db } from '../configurations/firebaseAdmin'

export class Bans {
    public async banUser(BanUser: BanUser) {
        const isBlocked = await this.checkUser({
            user: BanUser.userToBan,
            email: BanUser.email,
            fromApp: false
        });

        if (isBlocked) {
            return 'The user is already blocked';
        }

        try {
            await db.collection('UsersBan').doc(BanUser.email).collection('Users').add({
                userBanned: BanUser.userToBan
            });
            return '';
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    //This method checks if the user is banned from the application or a user has blocked it before
    public async checkUser(userBan: isUserBan) {
        try {
            if (userBan.fromApp) {
                const user = await db.collection('BanFromApp').where('email', '==', userBan.user).get();
                return user.docs.length > 0;
            }

            if (userBan.email) {
                const user = await db.collection('UsersBlocked').doc(userBan.email).collection('Bans').where('email', '==', userBan.user).get();
                return user.docs.length > 0;
            }
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public async banFromApp(email: string) {
        const userIsBlocked = await this.checkUser({
            user: email,
            fromApp: true
        });

        if (userIsBlocked) {
            return 'The user is already banned';
        }

        try {
            await db.collection('UsersBanFromApp').add({
                userBanned: email
            });
            return '';
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}
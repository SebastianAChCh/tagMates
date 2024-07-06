import { dbFirestore as db } from '../configurations/firebaseAdmin'
import { checkResponseType, RequestsType } from '../types/Requests';
import { Contacts } from './Contacts.service';

export class Requests {
    public async addRequest(data: RequestsType) {
        try {
            await db.collection('Requests').doc(data.receiver).collection(data.sender).add({
                status: 'waiting'
            });
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public checkResponse(data: checkResponseType) {
        const contacts = new Contacts();
        switch (data.response) {
            case 'Accepted':
                contacts.saveContacts({
                    email: data.sender,
                    user: data.receiver
                });
                break;
            case 'Rejected':
                this.removeRequest({ receiver: data.receiver, sender: data.sender });
                break;

            default:
                console.error('That type is not supported');
                break;
        }
    }
    public async removeRequest(data: RequestsType) {
        try {
            await db.collection('Requests').doc(data.receiver).collection(data.sender);
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

}
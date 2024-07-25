import { dbFirestore as db } from '../configurations/firebaseAdmin';
import { ContactsType } from '../types/Contacts';
import { MessagesSocket } from './Messages.service';

export class Contacts {
    public async getContact(email: string, contact: string) {
        try {
            const ContactsInfo = await db.collection('Contacts').doc(email).collection('Users').where('email', '==', contact).get();

            if (ContactsInfo.docs[0]) {
                const users: any[] = ContactsInfo.docs;
                const data = users.filter(user => user._fieldsProto.email.stringValue === contact);
                return data[0]._fieldsProto.email;
            } else return null;

        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public async loadContacts(email: string) {
        const Messages = new MessagesSocket(email);
        let ContactsResponse;
        try {
            ContactsResponse = await db.collection('Contacts').doc(email).collection('Users').get();
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }

        const lastMessages = ContactsResponse.docs.map(async user => {
            const Message = await Messages.loadLastMessage(user.data().email);
            return Message;
        });


        return { ContactsResponse: ContactsResponse.docs, lastMessages: lastMessages };
    }

    public async saveContacts(contact: ContactsType) {
        try {
            await db.collection('Contacts').doc(contact.email).collection('Users').add({ email: contact.user });
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }
};

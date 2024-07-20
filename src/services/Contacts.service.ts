import { dbFirestore as db } from '../configurations/firebaseAdmin';
import { ContactsType } from '../types/Contacts';

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
        try {
            const ContactsResponse = await db.collection('Contacts').doc(email).collection('Users').get();

            return ContactsResponse;
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
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

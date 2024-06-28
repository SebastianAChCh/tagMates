import { dbFirestore as db } from '../firebaseAdmin'

export class Contacts {
    public async getContact(email: string, contact: string) {
        try {
            const Contacts = await db.collection('Contacts').where('email', '==', email).limit(1).get();

            if (Contacts.docs[0]) {
                const users: any[] = Contacts.docs[0].data().Contacts;
                const data = users.filter(user => user === contact);
                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public async loadContacts() { }

    public async saveContacts() { }

}
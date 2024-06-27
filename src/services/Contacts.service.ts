import { dbFirestore as db } from '../firebaseAdmin'

export class Contacts {

    constructor() { }

    public async getContact(email: string, contact: string) {
        try {
            const Contacts = await db.collection('Contacts').where('email', '==', email).limit(1).get();
            const users: any[] = Contacts.docs[0].data().Contacts;
            return users.filter(user => user !== contact);

        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public async loadContacts() { }

    public async saveContacts() { }

}
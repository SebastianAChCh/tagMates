import { dbFirestore as db } from '../firebaseAdmin'

export class Contacts {

    constructor() { }

    public async getContact(email: string) {
        try {
            const Contacts = await db.collection('Contacts').where('email', '==', email).limit(1).get();
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public async loadContacts() { }

    public async saveContacts() { }

}
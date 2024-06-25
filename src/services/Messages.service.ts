import { dbFirestore as db } from '../firebaseAdmin';
import { Contacts } from './Contacts.service';

export class MessagesSocket {
    private email: string;
    private Contacts: Contacts;

    constructor(email: string) {
        this.email = email;
        this.Contacts = new Contacts();
    }

    public async saveMessage(sender: string, receiver: string) {
        let otherEmail: string = '';//it will contains the contact at which the user is talking
        try {
            if (sender === this.email) otherEmail = receiver;
            else otherEmail = sender;


        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public async loadMessages() {

    }

}
import { dbFirestore as db } from '../firebaseAdmin';
import { Message } from '../types/Messages';
import { Contacts } from './Contacts.service';

export class MessagesSocket {
    private email: string;
    private Contacts: Contacts;

    constructor(email: string) {
        this.email = email;
        this.Contacts = new Contacts();
    }

    public async saveMessages(sender: string, receiver: string, Message: Message) {
        let otherEmail: string = '';//it will contains the contact at which the user is talking
        let contactExist: any[];

        if (sender === this.email) otherEmail = receiver;
        else otherEmail = sender;

        try {
            contactExist = await this.Contacts.getContact(this.email, otherEmail);
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }

        if (contactExist.length < 1) {

            const IdDoc = db.collection('Conversations').doc().id
            try {
                await db.collection('Conversations').doc(IdDoc).collection('Messages').add(Message);
            } catch (error) {
                console.error(error);
                throw new Error(String(error));
            }

        } else {
            const ID = await this.getMessagesId(this.email, otherEmail);

            try {
                await db.collection('Conversations').doc(ID).collection('Messages').add(Message);
            } catch (error) {
                console.error(error);
                throw new Error(String(error));
            }
        }
    }

    //This method will return the id of the document where the messages are in the collection "Conversations"
    public async getMessagesId(userA: string, userB: string) {
        try {
            const resultMessagesID = await db.collection('MessagesID').doc(userA).collection('Contacts').where('User.Username', '==', userB).get()
            return resultMessagesID.docs[0].data().User.ID;
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public async loadMessages(id: string) {
        try {
            // const Messages = await db.collection('Conversations').doc(id).collection('Messages').where();
            // return Messages;
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

}
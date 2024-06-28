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

    public async saveMessages(Message: Message) {
        let otherEmail: string = '';//it will contains the contact at which the user is talking

        if (Message.sender === this.email) {
            otherEmail = Message.receiver;
        }
        else {
            otherEmail = Message.sender;
        }

        const contactExist = await this.Contacts.getContact(this.email, otherEmail);

        let ID;
        if (contactExist.length < 1) {
            ID = db.collection('Conversations').doc().id
        } else {
            ID = await this.getMessagesId(this.email, otherEmail);//ID of the document where the messages are
        }

        try {
            await db.collection('Conversations').doc(ID).collection('Messages').add(Message);
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
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
import { dbFirestore as db } from '../configurations/firebaseAdmin';
import { Message } from '../types/Messages';
import { Contacts } from './Contacts.service';
import { v7 as RandomID } from 'uuid';

export class MessagesSocket {
    private email: string;
    private Contacts: Contacts;

    constructor(email: string) {
        this.email = email;
        this.Contacts = new Contacts();
    }

    public async saveMessages(Message: Message) {
        let user: string = '';//It w contains the contact at which the user is talking

        if (Message.sender === this.email) user = Message.receiver;
        else user = Message.sender;

        let ID: string;

        ID = await this.getConversationId(user);

        if (!ID) {
            ID = RandomID();//Generating and ID, it needs to be replaced in a future
            this.saveConversationID(user, ID);//Saving also the id of the document where the messages are
        }

        try {
            await db.collection('Conversations').doc(ID).collection('Messages').add(Message);
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    private async saveConversationID(user: string, ID: string) {
        try {
            await db.collection('ConversationID').doc(this.email).collection('Contacts').add({
                'Username': user,
                'Id': ID
            });
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }

        try {
            await db.collection('ConversationID').doc(user).collection('Contacts').add({
                'Username': this.email,
                'Id': ID
            });
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }

    }

    //This method will return the id of the document where the messages are in the collection "Conversations"
    public async getConversationId(user: string) {
        try {
            const resultMessagesID = await db.collection('ConversationID').doc(this.email).collection('Contacts').where('Username', '==', user).get();
            if (resultMessagesID.docs.length < 1) {
                return null;
            }

            return resultMessagesID.docs[0].data().Id;
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public async loadMessages(otherUser: string) {
        const conversationID = await this.getConversationId(otherUser);
        let messages: any;
        try {
            messages = await db.collection('Conversations').doc(conversationID).collection('Messages').where('sender', '==', otherUser).get();
            if (!messages) {
                messages = await db.collection('Conversations').doc(conversationID).collection('Messages').where('receiver', '==', otherUser).get();
            }

            return messages
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

}
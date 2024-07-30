import { dbFirestore as db, Timestamp } from '../configurations/firebaseAdmin';
import { Message } from '../types/Messages';
import { v7 as RandomID } from 'uuid';

export class MessagesSocket {
    private email: string;

    constructor(email: string) {
        this.email = email;
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
            await db.collection('Conversations').doc(ID).collection('Messages').add({ ...Message, date: Timestamp.now() });
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    private async saveConversationID(user: string, ID: string) {
        try {
            await db.collection('ConversationID').doc(this.email).collection('Contacts').add({
                'Username': user,
                'Id': ID
            });
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }

        try {
            await db.collection('ConversationID').doc(user).collection('Contacts').add({
                'Username': this.email,
                'Id': ID
            });
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
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
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public async loadLastMessage(user: string) {
        const conversationID = await this.getConversationId(user);

        let message;

        if (conversationID === null) {
            return { error: 'Something went wrong', email: user };
        };

        try {
            message = await db.collection('Conversations').doc(conversationID).collection('Messages').orderBy('date', 'desc').limit(1).get();

            if (message.docs.length > 0) {
                return { ...message.docs[0].data(), date: message.docs[0].data().date.toDate().toLocaleString() };
            } else {
                return { error: 'Something went wrong', email: user };
            }
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public async loadMessages(user: string) {
        const conversationID = await this.getConversationId(user);
        let messages;

        if (conversationID === null) return 'There are not messages yet';


        try {
            messages = await db.collection('Conversations').doc(conversationID).collection('Messages').get();

            if (messages.docs.length < 1) {
                return 'There are not messages yet';
            }

            const messagesUnordered = messages.docs.map(message => ({ ...message.data(), date: message.data().date.toDate().toLocaleString() }));
            const messagesOrdered = messagesUnordered.sort((a: any, b: any) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            });


            return messagesOrdered;
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

}
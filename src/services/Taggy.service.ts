import OpenAI from "openai";
import { MessageTaggy } from '../types/Messages';
import { dbFirestore as db } from '../configurations/firebaseAdmin';

export class Taggy {
    private openai: any;
    constructor() {
        this.openai = new OpenAI();
    }

    public async getMessage(Message: MessageTaggy) {
        try {
            const stream = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: 'You are a helpful assistant that helps the users with their doubts and problems' }, { role: "user", content: Message.message }],
                stream: true,
                response_format: { type: 'json_object' }
            });

            if (stream.choices[0].message.content) {
                this.saveMessage(Message);
            }

            return stream.choices[0].message.content;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    private async saveMessage(Message: MessageTaggy) {
        try {
            const userInformation = {
                ...Message,
                _user: Message.user
            }

            await db.collection('TaggyMessages').doc(Message.user).collection('Messages').add({
                userInformation,
            });

            return;
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public async loadMessages(Message: MessageTaggy) {
        try {
            const messages = await db.collection('TaggyMessages').doc(Message.user).collection('Messages').get();

            return messages.docs[0];
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

}

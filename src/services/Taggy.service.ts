import OpenAI from "openai";
import { Message } from '../types/Messages';
import { dbFirestore as db } from '../configurations/firebaseAdmin';

export class Taggy {
    private openai: any;
    constructor() {
        this.openai = new OpenAI();
    }

    public async getMessage(content: string) {
        try {
            const stream = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: 'You are a helpful assistant that helps the users with their doubts and problems' }, { role: "user", content: content }],
                stream: true,
                response_format: { type: 'json_object' }
            });

            return stream.choices[0].message.content;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async saveMessage(Message: Message) {
        try {
            await db.collection('TaggyMessages').doc(Message.sender).collection('Messages').add({
                Message
            });

            return;
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public async loadMessage() {

    }

}

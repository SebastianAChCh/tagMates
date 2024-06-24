import { Users } from "./Users.service";

export class MessagesSocket {
    private email: string
    private UsersMethods: any;

    constructor(email: string) {
        this.email = email;
        this.UsersMethods = new Users(null);
    }

    public async saveTextMessage() {
        try {

        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public async saveImg() {
        try {

        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public async loadMessages() { }

}
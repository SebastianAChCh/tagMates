import { Request, Response } from 'express';
import { Contacts } from '../../services/Contacts.service';

export const loadContacts = async (req: Request, res: Response) => {
    const contacts = new Contacts();

    try {
        const contactsLoaded = await contacts.loadContacts(req.body.email);

        let contactsInfo: any[] = [];

        await Promise.all(
            contactsLoaded.lastMessages.map(async (messagesValues) => {
                const message: any = await messagesValues;
                contactsLoaded.ContactsResponse.forEach((contactsValues) => {

                    if (!message) {
                        contactsInfo.push({ ...contactsValues.data(), MessageInf: '' });
                    } else if (message.error && message.email === contactsValues.data().email) {
                        contactsInfo.push({ ...contactsValues.data(), MessageInf: '' });
                    } else if (contactsValues.data().email === message.receiver || contactsValues.data().email === message.sender) {
                        contactsInfo.push({ ...contactsValues.data(), MessageInf: message });
                    }
                });
            })
        );

        return res.status(200).json({ status: 200, contactsLoaded: contactsInfo, });
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
};

export const saveContact = async (req: Request, res: Response) => {
    const contacts = new Contacts();
    try {
        await contacts.saveContacts({ email: req.body.email, user: req.body.user });

        return res.status(200).json({ status: 200, message: 'Contact saved successfully' });
    } catch (error) {
        return res.status(500).json({ status: 500, error });
    }
};
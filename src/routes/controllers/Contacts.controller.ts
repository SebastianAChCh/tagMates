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
                    if (contactsValues.data().email === message.receiver || contactsValues.data().email === message.sender) {
                        contactsInfo.push({ ...contactsValues.data(), MessageInf: message });
                    }
                });
            })
        );

        return res.json({
            status: 200,
            contactsLoaded: contactsInfo,
        });
    } catch (error) {
        return res.json({
            status: 200,
            error
        });
    }
};

export const saveContact = (req: Request, res: Response) => {
    const contacts = new Contacts();
    try {
        contacts.saveContacts({ email: req.body.email, user: req.body.user });

        return res.json({
            status: 200,
            message: 'Contact saved successfully'
        });
    } catch (error) {
        return res.json({
            status: 200,
            error
        });
    }
};
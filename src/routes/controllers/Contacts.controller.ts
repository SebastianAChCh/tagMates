import { Request, Response } from 'express';
import { Contacts } from '../../services/Contacts.service';

export const loadContacts = async (req: Request, res: Response) => {
    const contacts = new Contacts();

    try {
        const contactsLoaded = await contacts.loadContacts(req.body.email);
        if (!contactsLoaded.docs[0]) {
            return res.json({
                status: 404,
                message: 'there are not contacts yet'
            });
        }

        const contactsResponse = contactsLoaded.docs.map(cts => cts.data().email)

        return res.json({
            status: 200,
            contactsResponse
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
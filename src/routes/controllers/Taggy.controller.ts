import { Request, Response } from 'express';
import { Taggy } from '../../services/Taggy.service';

export const loadMessages = async (req: Request, res: Response) => {
    const TaggyMethods = new Taggy();
    try {
        const messages = await TaggyMethods.loadMessages(req.body);

        if (!messages) {
            return res.json({
                status: 404,
                error: 'There was an error getting the data'
            });
        }

        return res.json({
            status: 200,
            information: messages
        })


    } catch (error) {
        return res.json({
            status: 500,
            error: error instanceof Error ? error.message : ''
        });
    }
}
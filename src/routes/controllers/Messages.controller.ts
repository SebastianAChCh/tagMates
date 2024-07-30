import { Request, Response } from 'express';
import { MessagesSocket } from '../../services/Messages.service';
import { uploadFiles } from '../../configurations/uploads';
import multer from 'multer';

export const saveTextMessages = async (req: Request, res: Response) => {
    const messages = new MessagesSocket(req.body.email);

    try {
        await messages.saveMessages(req.body.Message);

        return res.json({
            status: 200
        })
    } catch (error) {
        return res.json({
            status: 500,
            error
        })
    }
}

export const loadMessages = async (req: Request, res: Response) => {
    try {
        const messages = new MessagesSocket(req.body.email);

        const response = await messages.loadMessages(req.body.user);

        return res.json({ status: 200, response });
    } catch (error: any) {
        return res.json({
            status: 500,
            error: error.message
        });
    }
}

export const loadLastMessage = async (req: Request, res: Response) => {
    const MessagesMethods = new MessagesSocket(req.body.email);
    try {
        const response = await MessagesMethods.loadLastMessage(req.body.user)

        if (response.error) return res.json({ status: 500, error: response.error });

        return res.json({ status: 200, message: response })

    } catch (error: any) {
        return res.json({ status: 500, error: error.message })
    }
}

export const saveFileMessages = async (req: Request, res: Response) => {

    uploadFiles(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: 'Multer error: ' + err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Unknown error: ' + err.message });
        }

        const file = req.file;
        console.log(req.file);

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }


        return res.status(200).json({ status: 'ok', file: file.path });
    });
};
import { Request, Response } from 'express'
import { MessagesSocket } from '../../services/Messages.service'

export const saveMessages = async (req: Request, res: Response) => {
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
        return res.json({
            status: 200,
        })
    } catch (error) {
        return res.json({
            status: 500,
            error
        })
    }
}
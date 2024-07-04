import { Request, Response } from 'express';

export const sendRequest = async (req: Request, res: Response) => {

    try {

    } catch (error) {
        return res.json({
            status: 500,
            error
        });
    }
};



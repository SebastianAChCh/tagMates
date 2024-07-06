import { Request, Response } from 'express'
import { Positions } from '../../services/Positions.service';

export const updateCurrentPosition = async (req: Request, res: Response) => {
    const { coordinates, email } = req.body;
    try {
        const userNewPos = new Positions();
        await userNewPos.updateCoordinates({ coordinates, email });
        return res.json({ status: 200 });
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, error });
    }
}
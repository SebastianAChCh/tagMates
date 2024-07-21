import { Request, Response } from 'express'
import { Positions } from '../../services/Positions.service';
import { UsersModel } from '../../types/Users';

export const updateCurrentPosition = async (req: Request, res: Response) => {
    const { coordinates, email } = req.body;
    const userNewPos = new Positions();

    try {
        await userNewPos.updateCoordinates({ coordinates, email });
        return res.json({ status: 200 });
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, error: error instanceof Error ? error.message : '' });
    }
}

export const changeProximityState = (req: Request, res: Response) => {
    const proximityState = new Positions();
    try {
        proximityState.changeProximityState(req.body);

        return res.json({ status: 200 });
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, error: error instanceof Error ? error.message : '' });
    }
}

export const getProximityState = async (req: Request, res: Response) => {
    const { email } = req.body;
    const proximityState = new Positions();

    try {
        const response: UsersModel | string = await proximityState.getProximityState(email);

        if (typeof response === 'string') {
            return res.json({ status: 404, error: response });
        }

        return res.json({ status: 200, information: response.Vibration_proximity });
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, error: error instanceof Error ? error.message : '' });
    }
}
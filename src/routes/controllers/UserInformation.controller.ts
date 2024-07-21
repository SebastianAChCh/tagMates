import { Request, Response } from 'express';
import { Users } from '../../services/Users.service';

export const userInformation = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userInformation = new Users(null);

    try {
        const informationUser = await userInformation.getUser(email);

        if (typeof informationUser === 'string') {
            return res.json({ status: 404, error: informationUser });
        }

        return res.json({ status: 200, information: informationUser });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userInformation = new Users(null);

    try {
        userInformation.deleteUser(email);

        return res.json({ status: 200, information: 'user deleted successfully' });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message });
    }
}
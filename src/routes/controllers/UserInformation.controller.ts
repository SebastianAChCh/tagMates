import { Request, Response } from 'express';
import { Users } from '../../services/Users.service';
import { Diary } from '../../services/Diary.service';

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

export const addTags = async (req: Request, res: Response) => {
    const userInformation = new Users(null);
    try {
        await userInformation.addTags(req.body);

        return res.json({ status: 200, information: 'Tags added successfully' });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message });
    }
}

export const addPhoto = async (req: Request, res: Response) => {
    const userInformation = new Users(null);

    try {
        await userInformation.addPhoto(req.body);

        return res.json({ status: 200, information: 'Photo changed successfully' });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message });
    }
}

export const addPictures = async (req: Request, res: Response) => {
    const userInformation = new Users(null);

    try {
        await userInformation.addPhotos(req.body);

        return res.json({ status: 200, information: 'Photo added successfully' });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message });
    }
}

export const addSummary = async (req: Request, res: Response) => {
    const userInformation = new Users(null);

    try {
        await userInformation.addSummary(req.body);

        return res.json({ status: 200, information: 'Summary changed successfully' });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message });
    }
}

export const addDiary = async (req: Request, res: Response) => {
    const diaryInformation = new Diary();

    try {
        await diaryInformation.addDiary(req.body);

        return res.json({ status: 200, information: 'Diary added successfully' });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message });
    }
}

export const getDiary = async (req: Request, res: Response) => {
    const diaryInformation = new Diary();

    try {
        const diary = await diaryInformation.getDiary(req.body);

        if (typeof diary === 'string') {
            return res.json({ status: 404, error: diary });
        }

        return res.json({ status: 200, information: diary });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message });
    }
}

export const updateDiary = async (req: Request, res: Response) => {
    const diaryInformation = new Diary();

    try {
        const response = await diaryInformation.updateDiary(req.body);

        if (typeof response === 'string') {
            return res.json({ status: 404, error: response });
        }

        return res.json({ status: 200, information: 'Diary updated successfully' });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message });
    }
}

export const deleteDiary = async (req: Request, res: Response) => {
    const diaryInformation = new Diary();

    try {
        const response = await diaryInformation.deleteDiary(req.body);
        if (typeof response === 'string') return res.json({ status: 404, error: response });

        return res.json({ status: 200, information: 'The diary was deleted successfully' });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message });
    }
}
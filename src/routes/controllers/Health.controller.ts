import { Request, Response } from 'express';
import { Health } from '../../services/Health.service';

export const saveHealthInfo = async (req: Request, res: Response) => {
    const healthMethods = new Health();
    try {
        await healthMethods.saveHealthInfo(req.body);
        return res.json({ status: 200, message: 'data created successfully' });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message })
    }
}

export const updateHealthInfo = async (req: Request, res: Response) => {
    const healthMethods = new Health();
    try {
        await healthMethods.updateHealthInfo(req.body);
        return res.json({ status: 200, message: 'data updated successfully' });
    } catch (error: any) {
        return res.json({ status: 500, error: error.message })
    }
}

export const loadHealthInfo = async (req: Request, res: Response) => {
    const healthMethods = new Health();
    try {
        const healthInfo = await healthMethods.loadInfoHealth(req.body.email);
        return res.json({ status: 200, healthInfo });
    } catch (error: any) {
        return res.json({ status: 500, error: error })
    }
}

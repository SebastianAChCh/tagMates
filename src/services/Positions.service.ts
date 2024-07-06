import { dbRealTime as db } from '../configurations/firebaseAdmin';
import { NewCoordinates, CalculateDistance } from '../types/Positions';
import { Users } from './Users.service';

export class Positions {
    private UserMethods: Users;

    constructor() {
        this.UserMethods = new Users(null);
    }

    public async getCoordinatesUser(email: string) {
        const ID = await this.UserMethods.getUserId(email);
        if (ID === 'That user does not exist') return;

        try {
            const coordinates = await db.ref('Users/' + ID).get();
            const coordinatesVal = coordinates.val();
            const coordinatesKeys = Object.keys(coordinatesVal)[0];
            return coordinatesVal[coordinatesKeys];
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    async updateCoordinates(newCoordinates: NewCoordinates) {
        const ID = await this.UserMethods.getUserId(newCoordinates.email);
        if (ID === 'That user does not exist') return;

        try {
            const newCoordinatesObj = newCoordinates.coordinates;
            await db.ref('Users/' + ID).update(newCoordinatesObj);
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public calculateDistance(coordinates: CalculateDistance) {
        return false;
    }

}
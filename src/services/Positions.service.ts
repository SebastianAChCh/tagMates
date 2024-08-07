import OpenAI from 'openai';
import { dbRealTime as db } from '../configurations/firebaseAdmin';
import { NewCoordinates, CalculateDistance, Coordinates, updateProximityState, tagsAnalyze } from '../types/Positions';
import { UsersModel } from '../types/Users';
import { Users } from './Users.service';
import { projectId } from '../configurations/conf';

export class Positions {
    private UserMethods: Users;

    constructor() {
        this.UserMethods = new Users(null);
    }

    public async getCoordinatesUser(email: string): Promise<UsersModel | string> {
        const ID = await this.UserMethods.getUserId(email);
        if (ID === 'That user does not exist') return ID;

        try {
            const coordinates = await db.ref('Users/' + ID).get();
            const coordinatesVal = coordinates.val();
            const coordinatesKeys = Object.keys(coordinatesVal)[0];
            return coordinatesVal[coordinatesKeys];
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    async updateCoordinates(newCoordinates: NewCoordinates) {
        const ID = await this.UserMethods.getUserId(newCoordinates.email);
        if (ID === 'That user does not exist') return;

        try {
            const newCoordinatesObj = newCoordinates.coordinates;
            await db.ref('Users/' + ID).update(newCoordinatesObj);
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public async changeProximityState(data: updateProximityState): Promise<string | void> {
        const ID = await this.UserMethods.getUserId(data.email);
        if (ID === 'That user does not exist') return ID;

        try {
            await db.ref('Users/' + ID).update({ Vibration_proximity: data.state });
            return;
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public async getProximityState(email: string): Promise<string | UsersModel> {

        try {
            const proximityState = await db.ref('Users').orderByChild('email').equalTo(email).once('value');

            if (!proximityState.exists()) {
                return 'Something went wrong';
            } else {
                const proximityStateVal = proximityState.val();
                const proximityStateID = Object.keys(proximityStateVal)[0];
                return proximityStateVal[proximityStateID];
            }
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    private degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    public async analyzeTags(usersTags: tagsAnalyze) {
        const openai = new OpenAI();

        try {
            const stream = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: 'You are a helpful assistant that analyze if two users are compatible through their tags and what you will return its how much is compatible the user b with the user a in a percentage' }, { role: "user", content: `UserA tags: ${usersTags.userTags1} and UserB tags: ${usersTags.userTags2}` }],
                stream: false,
            });

            if (stream.choices[0].message.content) {
                console.log(stream.choices[0].message.content);

            }

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }

    }

    public calculateDistance(coordinates: CalculateDistance): boolean {
        const R: number = 6371; // Radius of the Earth in kilometers
        const dLat: number = this.degreesToRadians(coordinates.coordinates2.latitude - coordinates.coordinates1.latitude);
        const dLon: number = this.degreesToRadians(coordinates.coordinates2.longitude - coordinates.coordinates1.longitude);
        const a: number =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.degreesToRadians(coordinates.coordinates1.latitude)) * Math.cos(this.degreesToRadians(coordinates.coordinates2.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers

        const radiusInKm = Number(coordinates.radius) / 1000; // Convert radius from meters to kilometers
        return distance <= radiusInKm;
    }

}
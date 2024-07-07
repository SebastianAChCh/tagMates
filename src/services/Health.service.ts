import { InfoHealth, NewInfoHealth } from '../types/Health';
import { dbFirestore as db } from '../configurations/firebaseAdmin';

export class Health {
    public async saveHealthInfo(healthInformation: InfoHealth) {
        try {
            await db.collection('Medical_Information').doc(healthInformation.email).create(healthInformation);
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public async updateHealthInfo(newInfoHealth: NewInfoHealth) {
        try {
            if (newInfoHealth.newInfoHealth.medical_summary)
                await db.collection('Medical_Information').doc(newInfoHealth.email).update({ medical_summary: newInfoHealth.newInfoHealth.medical_summary });
            else if (newInfoHealth.newInfoHealth.oxygenation)
                await db.collection('Medical_Information').doc(newInfoHealth.email).update({ oxygenation: newInfoHealth.newInfoHealth.oxygenation });
            else if (newInfoHealth.newInfoHealth.pulse)
                await db.collection('Medical_Information').doc(newInfoHealth.email).update({ pulse: newInfoHealth.newInfoHealth.pulse });
            else if (newInfoHealth.newInfoHealth.temperature)
                await db.collection('Medical_Information').doc(newInfoHealth.email).update({ temperature: newInfoHealth.newInfoHealth.temperature });
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }

    public async loadInfoHealth(email: string) {
        try {
            const medicalData = await db.collection('Medical_Information').doc(email).get();
            if (!medicalData) return 'There is no content yet';
            return medicalData;
        } catch (error) {
            console.error(error);
            throw new Error(String(error));
        }
    }
}

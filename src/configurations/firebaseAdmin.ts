import { config } from 'dotenv';

config();

import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getDatabase } from 'firebase-admin/database';

initializeApp({
  credential: applicationDefault(),
  databaseURL: 'https://tagmates-42c3a-default-rtdb.firebaseio.com/',
});

const dbFirestore = getFirestore();
const dbRealTime = getDatabase();

export default dbFirestore;
export { dbFirestore, dbRealTime, Timestamp };

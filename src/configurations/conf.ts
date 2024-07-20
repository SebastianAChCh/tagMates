import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const apiKey = process.env.apiKey;
export const authDomain = process.env.authDomain;
export const projectId = process.env.projectId;
export const storageBucket = process.env.storageBucket;
export const messagingSenderId = process.env.messagingSenderId;
export const appId = process.env.appId;
export const measurementId = process.env.measurementId;
export const cloud_name = process.env.cloud_name;
export const api_key = process.env.api_key;
export const api_secret = process.env.api_secret;
export const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS);
export const SECRET_KEY: string = String(process.env.SECRET_KEY);
export const NODE_ENV: string = String(process.env.NODE_ENV);
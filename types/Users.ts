import { Coordinates } from './Positions'

export type UsersTp = {
    fullname?: string,
    email?: string,
    age?: number,
    password?: string,
    emergency_contact?: string,
    avatar_path?: string,
    coordinates?: Coordinates,
    tags?: [],
    pictures?: [],
    summary?: string,
    rating?: number,
    Vibration_proximity?: boolean,
    range?: range
};


export type range = {
    min: string,
    max: string
};
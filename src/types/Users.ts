import { Coordinates } from './Positions'

export type UsersModel = {
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

export type UserNewInfo = {
    userNewInfo: Partial<UsersModel>
    email: string
};

export type range = {
    min: string,
    max: string
};

export type usersSocket = {
    user: string,
    socketId: string
};

export type logIn = {
    email: string
    password: string
};

export type getDataSession = {
    userInformation: UsersModel
    access_token: string
    refreshToken: string
} | string;

export type informationUser = UsersModel | string;
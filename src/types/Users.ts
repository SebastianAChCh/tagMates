import { Coordinates } from './Positions'

export type UsersModel = {
    fullname?: string,
    email?: string,
    age?: number,
    password?: string,
    emergency_contact?: string,
    avatar_path?: string,
    coordinates?: Coordinates,
    tags?: string[],
    pictures?: string[],
    summary?: string,
    rating?: number,
    Vibration_proximity?: boolean,
    range?: range
};

export type Tags = {
    tags: string[] | string
    email: string
}

export type Summary = {
    summary: string
    email: string
}

export type Photo = {
    url: string
    email: string
}

export type Pictures = {
    urls: string[] | string
    email: string
}

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


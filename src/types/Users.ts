export type UsersModel = {
    fullname: string,
    email: string,
    age: number,
    emergency_contact: string,
    avatar_path: string,
    coordinates: Coordinates,
    tags: [],
    pictures: [],
    summary: string,
    rating: number,
    Vibration_proximity: boolean,
    range: range
};

export type Coordinates = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
};

export type range = {
    min: string,
    max: string
}

export type usersSocket = {
    user: string,
    socketId: string
}
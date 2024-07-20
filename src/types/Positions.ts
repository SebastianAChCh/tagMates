export type Coordinates = {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
};

export type NewCoordinates = {
    coordinates: Coordinates
    email: string
};

export type CalculateDistance = {
    coordinates1: Coordinates
    coordinates2: Coordinates
    radius: number | string
};
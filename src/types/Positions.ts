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

export type updateProximityState = {
    email: string
    state: boolean
};

export type tagsAnalyze = {
    userTags1: string[],
    userTags2: string[]
};
export type BanUser = {
    email: string
    userToBan: string
};

export type isUserBan = {
    email?: string
    user: string
    fromApp: boolean//To check from where the verification needs to be
}
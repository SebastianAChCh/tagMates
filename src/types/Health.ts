export type InfoHealth = {
    pulse: string
    oxygenation: string
    temperature: string
    medical_summary: string
    email: string
}

export type NewInfoHealth = {
    newInfoHealth: Partial<InfoHealth>
    email: string
}
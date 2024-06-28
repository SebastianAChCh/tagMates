import { Request, Response } from 'express'
import { dbFirestore as db } from '../../firebaseAdmin'

export const saveMessages = (req: Request, res: Response) => { }

export const loadMessages = async (req: Request, res: Response) => {
    try {
        const resultMessagesID = await db.collection('MessagesID').doc('Max').collection('Contacts').where('User.Username', '==', 'Carlos').get()
        resultMessagesID.docs.map(res => console.log(res.data()))

        return res.json({
            status: 200,
            result: resultMessagesID.docs[0]
        })
    } catch (error) {
        return res.json({
            status: 500,
            error
        })
    }
}
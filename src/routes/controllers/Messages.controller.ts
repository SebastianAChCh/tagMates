import fs from 'fs'
import { Request, Response } from 'express';
import { MessagesSocket } from '../../services/Messages.service';
import { join, resolve } from 'path';
import { foldersMessagesFiles } from '../../types/Messages'

export const saveTextMessages = async (req: Request, res: Response) => {
    const messages = new MessagesSocket(req.body.email);

    try {
        await messages.saveMessages(req.body.Message);

        return res.json({
            status: 200
        })
    } catch (error) {
        return res.json({
            status: 500,
            error
        })
    }
}

export const loadMessages = async (req: Request, res: Response) => {
    try {
        const messages = new MessagesSocket(req.body.email);

        const response = await messages.loadMessages(req.body.user);

        return res.json({ status: 200, response });
    } catch (error) {
        return res.json({
            status: 500,
            error
        });
    }
}

let responseSent: boolean = false;

export const saveFileMessages = async (req: Request, res: Response) => {
    req.pipe(req.busboy);
    const body = {} as foldersMessagesFiles;
    const pathSrc = resolve(__dirname, '../../');

    req.busboy.on('field', (fieldname, val) => body[fieldname] = val);//Save the data of the body in a object called "body"

    req.busboy.on('file', (_, file, filename) => {
        if (!fs.existsSync(join(pathSrc, 'uploads', `${body['email']}`))) {//check if the folder exist
            fs.mkdirSync(join(pathSrc, 'uploads', `${body['email']}`));//if does not exist, then create it            
        }

        if (!fs.existsSync(join(pathSrc, 'uploads', `${body['email']}`, `${body['type']}`))) {//check if the folder exist
            fs.mkdirSync(join(pathSrc, 'uploads', `${body['email']}`, `${body['type']}`));//if does not exist, then create it
        }

        const dirPath = join(pathSrc, 'uploads', `${body['email']}`, `${body['type']}`, String(filename.filename));

        const createFile = fs.createWriteStream(dirPath);
        file.pipe(createFile);

        createFile.on('close', () => {
            responseSent = true;
            return res.json({ status: 200, message: 'File saved successfully' });
        });

        createFile.on('error', (err) => {
            console.error('There was an error saving the file', err);
            if (!responseSent) {
                return res.json({ status: 200, message: 'There was an error saving the file' });
            }
        });
    });
};
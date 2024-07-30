import { Router, Request, Response } from 'express'
import { loadMessages, saveTextMessages, saveFileMessages, loadLastMessage } from './controllers/Messages.controller';
import fs from 'fs'
import { v4 } from 'uuid'
import { join } from 'path';

const router = Router();

router.post('/saveTextMessage', saveTextMessages);
router.post('/saveFileMessage', saveFileMessages);
router.post('/saveFileMessageBase64', (req: Request, res: Response) => {
    const { base64 } = req.body;

    if (!base64) {
        return res.status(400).json({ error: 'No image provided' });
    }

    // Extraer el tipo de imagen y la cadena base64
    const matches = base64.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
        return res.status(400).json({ error: 'Invalid image format' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    // Obtener la extensión del archivo
    const extension = mimeType.split('/')[1]; // Extrae la extensión (por ejemplo, jpeg, png)

    // Generar un nombre único para el archivo
    const fileName = `${v4()}.${extension}`;
    const filePath = join('uploads', fileName);

    // Convertir base64 a buffer y guardar el archivo
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save image' });
        }
        res.json({ message: 'Image uploaded successfully', file: filePath });
    });
});
router.post('/loadMessages', loadMessages);
router.post('/loadLastMessage', loadLastMessage);

export default router;
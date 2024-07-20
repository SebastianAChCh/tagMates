import jwt from 'jsonwebtoken';
import { CreationToken } from '../types/Token'
import { SECRET_KEY } from '../configurations/conf';

export class Token {
    public validateToken(token: string) {
        try {
            const isValid = jwt.verify(token, SECRET_KEY);

            return isValid;
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    public generateToken(TokenData: CreationToken): string {
        const Token: string = jwt.sign(TokenData, SECRET_KEY, {
            expiresIn: TokenData.duration,
        });

        return Token;
    }
}

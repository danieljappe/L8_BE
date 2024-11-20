import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '6h';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

export const verifyToken = (token: string): object | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as object;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwtUtils";
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded; // Attach user information to request
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ message: 'Token has expired.' });
        }
        return res.status(403).json({ message: 'Invalid token.' });
    }
};
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./jwtUtils";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(403).json({ message: 'Invalid token.' });
    }

    // Attach user information to request
    (req as any).user = decoded; // Temporary workaround
    next();
};
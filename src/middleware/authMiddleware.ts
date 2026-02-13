import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";


export interface AuthRequest extends Request {
    user?: { id: string, role: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({message: "Unauthorized"});
    }

    const token = authHeader?.split(" ")[1];

    try {
        const decoded = jwt.verify(token!, JWT_SECRET) as unknown;
        req.user = decoded as { id: string; role: string };
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid token"});
    }
}

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
        res.status(403).json({message: "Forbidden"});
    } else {
        next();
    }
}

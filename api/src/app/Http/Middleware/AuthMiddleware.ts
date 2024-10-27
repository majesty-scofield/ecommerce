import jwt from "jsonwebtoken";
import * as process from "process";
import {NextFunction, Request, Response} from "express";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

// Check if token is present
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        // Remove 'Bearer ' prefix if it exists
        const actualToken = token.startsWith('Bearer ') ? token.slice(7).trim() : token;

        // Verify the token and attach the decoded payload to req.user
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET!);
        if (typeof decoded !== 'object' || !decoded?.userId) {
            res.status(401).json({ message: 'Access denied' });
            return
        }
        // Attach the decoded payload to req.user
        req.user = decoded?.userId;
        req.role = decoded?.role;
        // Call next() to pass control to the next middleware or route
        next();
    } catch (error) {
        // Send 401 error if token verification fails
        return res.status(401).json({ message: 'Access denied' });
    }

};
export const verifySeller = (req: Request, res: Response, next: NextFunction) => {
    const role = req.role;

// Check if token is present
    if (role !== 'seller') {
        return res.status(401).json({ message: 'Access denied' });
    }

    next();
};
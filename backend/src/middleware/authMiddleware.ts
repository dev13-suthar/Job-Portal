import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface directly in the current module
declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"] ?? "";

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "Invalid token format. Expected 'Bearer <token>'",
        });
    }

    // Extract the token by removing the 'Bearer ' prefix
    const token = authHeader.slice(7); // 7 characters for "Bearer "


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!!) as { userId: string };
        if (decoded.userId) {
            req.userId = decoded.userId;
            return next();
        } else {
            return res.status(403).json({
                message: "You are not logged in",
            });
        }
    } catch (error) {
        return res.status(403).json({
            message: "You are not logged in",
        });
    }
};
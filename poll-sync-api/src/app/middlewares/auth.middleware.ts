import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/app.config";

interface JwtPayload {
  userId: string;
  email: string;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token || !authHeader.startsWith("Bearer")) {
      res.status(401).json({ message: "Access denied" });
      return;
    } else {
      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
      (req as any).userId = decoded.userId;
      next();
    }
  } catch (err) {
    res.status(403).json({ error: true, message: "Invalid token" });
  }
};

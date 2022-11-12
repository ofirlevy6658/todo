import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db';
dotenv.config();

export interface CustomRequest extends Request {
  userId: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(403);
    const userId = jwt.verify(token, process.env.JWT_SECRET_STRING!);
    if (typeof userId === 'object') (req as CustomRequest).userId = userId.id;
    else return res.sendStatus(403);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

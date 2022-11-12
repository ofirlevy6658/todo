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
    const userEmail = jwt.verify(token, process.env.JWT_SECRET_STRING!);
    if (typeof userEmail === 'object') {
      const userResult = await db.query('SELECT id FROM users WHERE email = $1', [userEmail.email!]);
      if (userResult.rowCount > 0) (req as CustomRequest).userId = userResult.rows[0].id;
      else return res.sendStatus(403);
    }
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

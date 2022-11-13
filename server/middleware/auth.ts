import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db';

export interface CustomRequest extends Request {
  userId: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(403);
    const userId = jwt.verify(token, process.env.JWT_SECRET_STRING!);
    if (typeof userId === 'object') {
      (req as CustomRequest).userId = userId.id;
      const { rows } = await db.query('select * from users where id = $1', [userId.id]);
      if (rows.length > 0) {
        return next();
      }
    }
    return res.sendStatus(403);
  } catch (err) {
    console.error(err);
    if (err instanceof jwt.TokenExpiredError) return res.status(401).send('Token expired');
    return res.sendStatus(403);
  }
};

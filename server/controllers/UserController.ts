import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Missing Required Fields.');

  try {
    const { rows } = await db.query('select * from users where email = $1', [email]);
    if (rows.length > 0) return res.status(400).send('Email already exists');

    const encryptedPassword = await bcrypt.hash(password, 12);

    await db.query('INSERT INTO users (email, password, creation_date) VALUES ($1, $2, $3)', [email, encryptedPassword, new Date()]);

    res.sendStatus(200);

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { rows } = await db.query('select * from users where email = $1', [email]);
    if (rows.length > 0) {
      if (await bcrypt.compare(password, rows[0].password)) {
        const id = rows[0].id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET_STRING!);
        return res.send({ token });
      }
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }

  return res.sendStatus(403);
};

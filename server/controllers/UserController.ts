import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db';

export const register = async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;
  if (!email || !password) return res.status(400).send('Missing Required Fields.');

  try {
    const { rows } = await db.query('select * from users where email = $1', [email]);
    if (rows.length > 0) return res.status(400).send('Email already exists');

    const encryptedPassword = await bcrypt.hash(password, 12);

    await db.query('INSERT INTO users (email, password, creation_date, full_name) VALUES ($1, $2, $3, $4)', [email, encryptedPassword, new Date(), fullName]);

    res.status(201).send('User created');
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
        const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_STRING!, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET_STRING!, { expiresIn: '7d' });
        res.cookie('rtkn', refreshToken, { httpOnly: true });

        db.query('update users set last_login = $1 where id = $2', [new Date(), id]);
        return res.status(200).send({ accessToken });
      }
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }

  return res.sendStatus(403);
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.rtkn;
  if (!refreshToken) return res.sendStatus(401);
  try {
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET_STRING!) as { id: string };
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_STRING!, { expiresIn: '15m' });

    return res.send({ accessToken });
  } catch (error) {
    console.error(error);
    return res.sendStatus(403); // Forbidden
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('rtkn');
  res.sendStatus(200);
};

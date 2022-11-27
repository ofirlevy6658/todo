import { Request, Response } from 'express';
import db from '../db';
import { CustomRequest } from '../middleware/auth';

export async function addList(req: Request, res: Response) {
  const userId = (req as CustomRequest).userId;
  let { name, icon, background } = req.body;
  if (!name) return res.status(400).send('Name of the list is missing.');

  if (!icon) {
    var emojis = ['😄', '😃', '😀', '😊', '☺', '😉', '😍', '😘', '😚'];
    icon = emojis[Math.floor(Math.random() * emojis.length)].charCodeAt(0);
  }
  if (!background) background = 1;
  try {
    const { rows } = await db.query('insert into lists (user_id, name, icon, background) values ($1, $2, $3, $4) returning *', [userId, name, icon, background]);
    return res.status(200).send(rows[0]);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export async function getLists(req: Request, res: Response) {
  const { page, limit } = req.query;
  const userId = (req as CustomRequest).userId;
  try {
    if (!page || !limit) {
      const { rows } = await db.query('select * from lists where user_id = $1', [userId]);
      return res.status(200).send(rows);
    } else {
      const listsTotal = await db.query('select count(*) from lists where user_id = $1', [userId]);
      const { rows } = await db.query('select * from lists where user_id = $1 limit $2 offset $3', [userId, limit, (+page - 1) * +limit]);
      return res.status(200).send({ rows, count: +listsTotal.rows[0].count });
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export async function deleteList(req: Request, res: Response) {
  const { id } = req.params;
  const userId = (req as CustomRequest).userId;
  if (!id) return res.status(400).send('Missing List ID');

  try {
    const result = await db.query('delete from lists where id=$1 and user_id=$2', [id, userId]);
    return res.status(200).send(`Deletes ${result.rowCount} rows.`);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

// TODO update only necessary fields
export async function updateList(req: Request, res: Response) {
  const { id } = req.params;
  const userId = (req as CustomRequest).userId;
  let { name, icon, background } = req.body;
  if (!id) return res.status(400).send('Missing List ID');

  try {
    const result = await db.query('update lists set name = $1, icon = $2, background = $3 where id = $4 and user_id = $5;', [name, icon, background, id, userId]);
    return res.status(200).send(`Updated ${result.rowCount} rows.`);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

import { Request, Response } from 'express';
import db from '../db';
import { CustomRequest } from '../middleware/auth';
import { Todo } from '../models/todo';

export async function getTodo(req: Request, res: Response) {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  const userId = (req as CustomRequest).userId; //email of user who made the request.

  if (!limit || !page || page <= 0 || limit <= 0) return res.status(400).send('Missing / Wrong Query Params.');

  try {
    const todosResult = await db.query('SELECT * FROM todos WHERE user_id = $3 LIMIT $1 OFFSET $2', [limit, (page - 1) * limit, userId]);
    const todosTotal = await db.query('SELECT COUNT(*) FROM TODOS WHERE user_id = $1', [userId]);

    const todos = todosResult.rows;
    const count = todosResult.rowCount;
    const totalPages = Math.ceil(+todosTotal.rows[0].count / limit);

    res.send({ todos, count, totalPages, currentPage: +page });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function addTodo(req: Request, res: Response) {
  try {
    const { content, color, wallpaper } = req.body;
    const userId = (req as CustomRequest).userId;
    if (!content) return res.status(400).send('Content of the todo is missing.');

    const newTodo: Partial<Todo> = {
      content: content,
      user_id: userId,
      color,
      wallpaper,
    };

    const todoId = await db.query('insert into todos (user_id, content, color, wallpaper) values ($1,$2,$3,$4) RETURNING id', [newTodo.user_id, newTodo.content, newTodo.color, newTodo.wallpaper]);
    res.status(201).send({ id: todoId.rows[0].id });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    const { _id } = req.body;
    if (!_id) return res.status(400).send('Missing Todo ID');

    const result = await db.query('delete from todos where id=$1', [_id]);
    res.status(200).send(`Deletes ${result.rowCount} rows.`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function updateTodoState(req: Request, res: Response) {
  try {
    const { _id, done } = req.body;

    if (!_id) return res.status(400).send('Missing Todo ID');

    const result = await db.query('update todos set completed = $1 where id = $2;', [done, _id]);
    res.status(200).send(`Updated ${result.rowCount} rows.`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

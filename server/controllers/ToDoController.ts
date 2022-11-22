import { Request, Response } from 'express';
import db from '../db';
import { CustomRequest } from '../middleware/auth';
import { Todo } from '../types/Todo';

export async function getTodo(req: Request, res: Response) {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  const userId = (req as CustomRequest).userId;

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

export async function getTodoByListId(req: Request, res: Response) {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const listId = Number(req.params.listId);

  const userId = (req as CustomRequest).userId;

  if (!limit || !page || page <= 0 || limit <= 0) return res.status(400).send('Missing / Wrong Query Params.');
  else if (!listId) return res.status(400).send('Missing List Id in param.');

  try {
    const todosResult = await db.query('SELECT * FROM todos WHERE user_id = $3 AND list_id = $4 LIMIT $1 OFFSET $2', [limit, (page - 1) * limit, userId, listId]);
    const todosTotal = await db.query('SELECT COUNT(*) FROM TODOS WHERE user_id = $1 AND list_id = $2', [userId, listId]);

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
    let { content, color, listId, isImportant } = req.body;
    const userId = (req as CustomRequest).userId;

    if (!content) return res.status(400).send('Content of the todo is missing.');
    else if (!listId) return res.status(400).send('List id is missing.');

    isImportant = isImportant || false;

    const todoId = await db.query(
      `insert into todos (user_id, content, color, list_id, is_important) 
    select $1,$2,$3,$4,$5 where exists (select 1 from lists where id = $4 and user_id = $1) returning id`,
      [userId, content, color, listId, isImportant]
    );

    res.status(201).send({ id: todoId.rows[0].id });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send('Missing Todo ID');

    const result = await db.query('delete from todos where id=$1', [id]);
    res.status(200).send(`Deletes ${result.rowCount} rows.`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function updateTodoState(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (!id) return res.status(400).send('Missing Todo ID');

    const result = await db.query('update todos set completed = $1 where id = $2;', [completed, id]);
    res.status(200).send(`Updated ${result.rowCount} rows.`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function searchTodo(req: Request, res: Response) {
  try {
    const { search } = req.query;
    const userId = (req as CustomRequest).userId;
    if (!search) return res.status(400).send('Missing Search Query');

    const result = await db.query('select * from todos where user_id = $1 and content like $2', [userId, `%${search}%`]);
    res.status(200).send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

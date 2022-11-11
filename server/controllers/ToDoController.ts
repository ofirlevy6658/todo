import { Request, Response } from 'express';
import todo from '../models/ToDoModel';

export async function getToDo(req: Request, res: Response) {
  const { page, limit } = req.query;
  if (limit && page)
    try {
      const todos = await todo
        .find()
        .limit(+limit * 1)
        .skip((+page - 1) * +limit)
        .exec();
      const count = await todo.countDocuments();

      res.set(200).send({
        todos,
        count,
        totalPages: Math.ceil(count / +limit),
        currentPage: +page,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
}

export async function saveToDo(req: Request, res: Response) {
  try {
    const { desc } = req.body;
    const newModel = await todo.create({ desc });
    console.log('Added');
    console.log(newModel);
    res.set(201).send(newModel);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function deleteToDo(req: Request, res: Response) {
  try {
    const { _id } = req.body;
    console.log(_id);
    const a = await todo.findByIdAndDelete(_id);
    console.log(a);
    res.set(200).send('deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function updateToDo(req: Request, res: Response) {
  try {
    const { _id, done } = req.body;
    await todo.findByIdAndUpdate(_id, { done });
    res.set(200).send('Updated');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

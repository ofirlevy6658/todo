import { Router } from 'express';
import { addTodo, deleteTodo, getTodo, updateTodoState } from '../controllers/ToDoController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, getTodo);

router.post('/add', auth, addTodo);

router.delete('/:id', auth, deleteTodo);

router.put('/:id', auth, updateTodoState);

export default router;

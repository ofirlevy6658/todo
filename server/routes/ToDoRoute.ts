import { Router } from 'express';
import { addTodo, deleteTodo, getTodo, updateTodoState } from '../controllers/ToDoController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, getTodo);

router.post('/addTodo', auth, addTodo);

router.delete('/deleteTodo', auth, deleteTodo);

router.put('/update', auth, updateTodoState);

export default router;

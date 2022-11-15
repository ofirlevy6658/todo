import { Router } from 'express';
import { addTodo, deleteTodo, getTodo, getTodoByListId, searchTodo, updateTodoState } from '../controllers/ToDoController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, getTodo);
router.get('/list/:listId', auth, getTodoByListId);

router.get('/search', auth, searchTodo);

router.post('/add', auth, addTodo);

router.delete('/:id', auth, deleteTodo);

router.put('/:id', auth, updateTodoState);

export default router;

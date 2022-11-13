import { Router } from 'express';
import { deleteAccount, login, logout, profile, refresh, register } from '../controllers/UserController';
import auth from '../middleware/auth';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/refresh', refresh);

router.get('/logout', logout);

router.get('/', auth, profile);

router.delete('/', auth, deleteAccount);

export default router;

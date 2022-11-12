import { Router } from 'express';
import { login, logout, refresh, register } from '../controllers/UserController';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/refresh', refresh);

router.get('/logout', logout);

export default router;

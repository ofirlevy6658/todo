import { Router } from 'express';

import { addList, deleteList, getLists, updateList } from '../controllers/ListController';
import auth from '../middleware/auth';

const router = Router();

router.get('/', auth, getLists);
router.post('/', auth, addList);
router.delete('/:id', auth, deleteList);
router.put('/:id', auth, updateList);

export default router;

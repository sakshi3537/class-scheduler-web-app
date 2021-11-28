import express from 'express';
import {searchUser,follow} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router=express.Router();

router.get('/:searchQuery', auth, searchUser);
router.patch('/follow/:id',auth, follow);

export default router;
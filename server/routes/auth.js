import express from 'express';
import {signIn, signUp} from '../controllers/auth.js';
import auth from '../middleware/auth.js';

const router=express.Router();

router.post('/signIn',signIn);
router.post('/signUp',signUp);

export default router;
import express from 'express';
import {scheduleClass,registerForClass, getTimeline,myClasses} from '../controllers/class.js';
import auth from '../middleware/auth.js';

const router=express.Router();

router.post('/schedule',auth,scheduleClass);
router.patch('/register/:id',auth,registerForClass);
router.get('/getTimeline',auth,getTimeline);
router.get('/myClasses',auth,myClasses);



export default router;
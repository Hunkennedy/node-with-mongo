//imports
import Router from "express";
import * as authController from '../controllers/authsController';
//constants
const router = Router();
//routes
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

export default router;
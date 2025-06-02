import express from 'express';
import { signup, signin, newToken, info, logout } from '../controllers/authController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signin/new_token', newToken);
router.get('/info', auth, info);
router.get('/logout', auth, logout);

export default router;

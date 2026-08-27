import { Router } from 'express';
import { AuthController } from './AuthController';
import { authenticate } from '../../core/middleware/AuthMiddleware';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', authenticate, AuthController.me);

export default router;

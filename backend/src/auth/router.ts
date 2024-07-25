import { Router } from 'express';
import { loginHandler, registerHandler } from './controllers/auth';

const authRouter = Router();

authRouter.post('/login', loginHandler);
authRouter.post('/register', registerHandler);

export { authRouter };

import { Router } from 'express';
import { authRouter } from './auth/router';

const router: Router = Router();

router.use('/api/auth', authRouter);

export { router };

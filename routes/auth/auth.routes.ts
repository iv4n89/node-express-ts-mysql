import { Router } from 'express';
import { login } from '../../controllers/auth/auth.controller';
import { asyncError } from '../../util';

const router = Router();

router.post('/login', asyncError( login ));

export default router;
import { Router } from 'express';
import { login, register } from '../../controllers/auth/auth.controller';
import { asyncError } from '../../util';

const router = Router();

router.post('/login', asyncError( login ));
router.post('/register', asyncError( register ));

export default router;
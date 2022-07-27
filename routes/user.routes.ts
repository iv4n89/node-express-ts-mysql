import { router } from '.';
import { createUser, getAllUsers, getOneUser, updateOneUser } from '../controllers/user.controller';
import { asyncError } from '../util';

router.post('/user/store', asyncError(createUser));
router.get('/user/:id', asyncError(getOneUser));
router.post('/user/', asyncError(getAllUsers));
router.put('/user/:id', asyncError(updateOneUser));


export default router;
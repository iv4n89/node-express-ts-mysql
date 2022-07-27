import { router } from '../';
import { createGroup, deleteOneGroup, getAllGroups, getAllUserGroups, getOneGroup, updateOneGroup } from '../../controllers/auth/group.controller';
import { asyncError } from '../../util';

router.post('/group/store', asyncError(createGroup));
router.get('/group/:id', asyncError(getOneGroup));
router.post('/group', asyncError(getAllGroups));
router.get('/group/user/:id', asyncError(getAllUserGroups));
router.put('/group/:id', asyncError(updateOneGroup));
router.delete('/group/:id', asyncError(deleteOneGroup));

export default router;
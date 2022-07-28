import { router } from '../';
import { asyncError } from '../../util';
import { createPermission, getAllPermissions, getOnePermission } from '../../controllers/auth/permission.controller';

router.post('/permission/store', asyncError(createPermission));
router.post('/permission', asyncError(getAllPermissions));
router.post('/permission/find', asyncError(getOnePermission));

export default router;
import { router } from '..';
import { createCommunity, deleteOneCommunity, getAllCommunities, getOneCommunity, updateOneCommunity } from '../../controllers/adm/community.controller';
import { validateJWT } from '../../middlewares/jwtVerify';
import { asyncError } from '../../util';

router.post('/community/store', asyncError(createCommunity));
router.get('/community/:id', asyncError(getOneCommunity));
router.post('/community', asyncError(getAllCommunities));
router.put('/community/:id', asyncError(updateOneCommunity));
router.delete('/community/:id', asyncError(deleteOneCommunity));

export default router;
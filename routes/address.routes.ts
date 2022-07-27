import { router } from '.';
import { createAddress, deleteOneAddress, getAllAddresses, getAllUserAddresses, getOneAddress, updateOneAddress } from '../controllers/address.controller';
import { asyncError } from '../util';

router.post('/address/store', asyncError(createAddress));
router.get('/address/:id', asyncError(getOneAddress));
router.post('/address', asyncError(getAllAddresses));
router.post('/address/user/:id', asyncError(getAllUserAddresses));
router.put('/address/:id', asyncError(updateOneAddress));
router.delete('/address/:id', asyncError(deleteOneAddress));

export default router;
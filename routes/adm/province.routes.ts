import { asyncError } from '../../util';
import { router } from '../';
import { createProvince, deleteOneProvince, getAllProvinces, getOneProvince, updateOneProvince } from '../../controllers/adm/province.controller';


router.post('/province/store', asyncError( createProvince ));
router.get('/province/:id', asyncError(getOneProvince));
router.post('/province', asyncError(getAllProvinces));
router.put('/province/:id', asyncError(updateOneProvince));
router.delete('/province/:id', asyncError(deleteOneProvince));

export default router;
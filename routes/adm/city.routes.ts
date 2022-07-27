import { router } from '..';
import { createCity, deleteOneCity, getAllCities, getOneCity, updateOneCity } from '../../controllers/adm/city.controller';
import { asyncError } from '../../util';


router.post('/city/store', asyncError(createCity));
router.get('/city/:id', asyncError(getOneCity));
router.post('/city', asyncError(getAllCities));
router.put('/city/:id', asyncError(updateOneCity));
router.delete('/city/:id', asyncError(deleteOneCity));

export default router;
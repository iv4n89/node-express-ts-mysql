import { router } from '..';
import { createCountry, deleteOneCountry, getAllCountries, getOneCountry, updateOneCountry } from '../../controllers/adm/country.controller';
import { asyncError } from '../../util';

router.post('/country/store', asyncError(createCountry));
router.get('/country/:id', asyncError(getOneCountry));
router.post('/country', asyncError(getAllCountries));
router.put('/country/:id', asyncError(updateOneCountry));
router.delete('/country/:id', asyncError(deleteOneCountry));

export default router;
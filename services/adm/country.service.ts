import db from '../../database/db';
import { Country } from '../../models/adm/Country';

const repository = db.getRepository( Country );

const createCountry = async (attributes: Country) => {
    const country = repository.create(attributes);
    await repository.save(country);

    return country;
}

const getOneCountry = async (id: number) => await repository.findBy({id, deleted_at: null});

const getAllCountries = async () => await repository.findBy({ deleted_at: null });

const updateOneCountry = async (id: number, attributes: Partial<Country>) => {
    const result = await repository.update({id}, attributes);
    return await repository.findBy({id});
}

const deleteOneCountry = async (id: number) => await repository.softDelete({id});

export default {
    createCountry,
    getOneCountry,
    getAllCountries,
    updateOneCountry,
    deleteOneCountry
}
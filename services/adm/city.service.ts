import db from '../../database/db';
import { City } from '../../models/adm/City';

const repository = db.getRepository( City );

const createCity = async (attributes: City) => {
    const city = repository.create(attributes);
    await repository.save(city);

    return city;
}

const getAllCities = async () => {
    return await repository.find({ where: { deleted_at: null } });
}

const getOneCity = async (id: number) => {
    return await repository.findOneBy({id, deleted_at: null});
}

const updateOneCity = async (id: number, attributes: Partial<City>) => {
    const result = repository.update({ id }, { ...attributes });
    return await repository.findOneBy({ id });
}

const deleteOneCity = async (id: number) => {
    return await repository.softDelete({ id });
}

export default {
    createCity,
    getAllCities,
    getOneCity,
    updateOneCity,
    deleteOneCity
}
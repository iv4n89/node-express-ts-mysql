import db from '../../database/db';
import { Province } from '../../models/adm/Province';

const repository = db.getRepository(Province);

const createProvince = async (attributes: Province) => {
    const province = repository.create(attributes);
    await repository.save(province);
    return province;
}

const getOneProvince = async (id: number) => await repository.findOneBy({id, deleted_at: null});

const getAllProvinces = async () => await repository.findBy({ deleted_at: null });

const updateOneProvince = async (id: number, attributes: Partial<Province>) => {
    await repository.update({id}, attributes);
    return await repository.findOneBy({id});
}

const deleteOneProvince = async (id: number) => await repository.softDelete({id});

export default {
    createProvince,
    getOneProvince,
    getAllProvinces,
    updateOneProvince,
    deleteOneProvince
}
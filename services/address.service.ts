import db from '../database/db';
import { Address } from '../models';

const repository = db.getRepository(Address);

const createAddress = async (attributes: Address) => {
    const address = repository.create(attributes);
    await repository.save(address);
    return address;
}

const getOneAddress = async (id: number) => await repository.findOneBy({id});

const getAllAddresses = async () => await repository.findBy({deleted_at: null});

const getAllUserAddresses = async (userId: number) => await repository.findBy({user: { id: userId }});

const updateOneAddress = async (id: number, attributes: Partial<Address>) => {
    await repository.update({id}, attributes);
    return await repository.findOneBy({id});
}

const deleteOneAddress = async (id: number) => await repository.softDelete({id});

export default {
    createAddress, 
    getOneAddress,
    getAllAddresses,
    getAllUserAddresses,
    updateOneAddress,
    deleteOneAddress
}
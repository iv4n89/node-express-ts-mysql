import db from '../../database/db';
import { User } from '../../models/';
import bcrypt from 'bcrypt';
import { Group } from '../../models/auth/Group';

const repository = db.getRepository(User);

const createUser = async (attributes: User) => {

    const user = repository.create({
        ...attributes,
        password: bcrypt.hashSync(attributes.password, bcrypt.genSaltSync(10))
    });

    await repository.save(user);

    return user;
};

const getOneUser = async (id: number) => {
    const user = await repository.findOne({ where: { id, is_active: 1, deleted_at: null }, relations: { groups: true } });
    return user;
};

const getAllUsers = async () => {
    const users = await repository.find({ where: { is_active: 1, deleted_at: null }, relations: { groups: true } });
    return users;
};

const updateUser = async (id: number, attributes: Partial<User>) => {

    if ( attributes.groups ) {
        const { groups, ...rest } = attributes;
        await addGroupsToUser(id, groups);
        attributes = rest;
    }

    const user = await repository.update({ id }, attributes);
    return await repository.findOne({ where: { id }, relations: { groups: true } });
};

const deleteUser = async (id: number) => {
    const result = await repository.delete({ id });
    return result;
};

const addGroupsToUser = async (userId: number, groupIds: any[]) => {
    const user = await repository.findOne({ where: { id: userId } });
    const groups = groupIds.length > 0 && await db.getRepository(Group).createQueryBuilder().where('id IN (:...groupIds)', {groupIds}).getMany() || [];
    user.groups = groups;
    await repository.save(user);
}


export default {
    createUser,
    getOneUser,
    getAllUsers,
    updateUser,
    deleteUser
};
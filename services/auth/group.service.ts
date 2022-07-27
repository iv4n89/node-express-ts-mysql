import db from '../../database/db';
import { User } from '../../models';
import { Group } from '../../models/auth/Group';

const repository = db.getRepository(Group);

const createGroup = async (attributes: Group) => {
    const group = repository.create(attributes);
    await repository.save(group);
    return group;
};

const getOneGroup = async (id: number) => await repository.findOneBy({ id, deleted_at: null });

const getAllGroups = async () => await repository.findBy({ deleted_at: null });

const getAllUserGroups = async (userId: number) => await repository.findBy({ users: { id: userId } });

const updateOneGroup = async (id: number, attributes: Partial<Group>) => {
    if (attributes.users) {
        const { users, ...rest } = attributes;
        const group = await repository.findOneBy({ id });

        if (users.length > 0) {
            await addUserToGroup(group, users as any);
        } else {
            await deleteUsersFromGroup(group, users as any);
        }

        attributes = rest;
    }
    await repository.update({ id }, attributes);
    return await repository.findOneBy({ id });
};

const deleteOneGroup = async (id: number) => await repository.softDelete({ id });

const addUserToGroup = async (group: Group, userIds: number[]) => {
    const users = await db.createQueryBuilder(User, 'user').where('user.id IN (:...ids)', { ids: userIds }).getMany();
    group.users = users;
    await repository.save(group);
    return group;
};

const deleteUsersFromGroup = async (group: Group, userIds: number[] = []) => {
    group.users = group.users.filter(user => userIds.includes(user.id));
    await repository.save(group);
};

export default {
    createGroup,
    getOneGroup,
    getAllGroups,
    getAllUserGroups,
    updateOneGroup,
    deleteOneGroup
};
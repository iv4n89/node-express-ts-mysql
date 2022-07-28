import { group } from 'console';
import db from '../../database/db';
import { User } from '../../models';
import { Group } from '../../models/auth/Group';
import { parsePermission, updatePermissions } from '../../util/auth/permission.util';

const repository = db.getRepository(Group);

const createGroup = async (attributes: Group) => {
    const group = repository.create(attributes);
    await repository.save(group);
    return group;
};

const getOneGroup = async (id: number) => {
    const group = await repository.findOne({ where: { id, deleted_at: null }, relations: { permissions: true } });
    const { permissions, ...rest } = group;
    return {
        ...rest,
        permissions: parsePermission(permissions)
    }
}

const getAllGroups = async () => {
    const groups = await repository.find({ where: { deleted_at: null }, relations: { permissions: true } });
    return groups.map(group => ({ ...group, permissions: !!group.permissions && parsePermission(group.permissions) || [] }));
}

const getAllUserGroups = async (userId: number) => await repository.findBy({ users: { id: userId } });

const updateOneGroup = async (id: number, attributes: Partial<Group>) => {

    if (attributes.users) {
        const { users, ...rest } = attributes;
        addUserToGroup(id, users);
        attributes = rest;
    }

    if (attributes.permissions) {
        const { permissions, ...rest } = attributes;
        const group = await repository.findOne({ where: { id } });
        await updatePermissions<Group>(group, permissions as any, repository);
        attributes = rest;
    }

    await repository.update({ id }, attributes);

    const group = await repository.findOne({ where: { id }, relations: { permissions: true } });
    const { permissions, ...rest } = group;
    return {
        ...rest,
        permissions: parsePermission(permissions)
    }
};

const deleteOneGroup = async (id: number) => await repository.softDelete({ id });

const addUserToGroup = async (groupId: number, userIds: any[]) => {
    const group = await repository.findOne({ where: { id: groupId } });
    const users = userIds.length > 0 && await db.getRepository(User).createQueryBuilder().where('id IN (:...userIds)', { userIds }).getMany() || [];

    group.users = users;
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
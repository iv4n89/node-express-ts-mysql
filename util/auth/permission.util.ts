import { Permission } from "../../models";
import { Base } from "../../models/Base";
import db from '../../database/db';
import { Like, Repository } from "typeorm";

const actions = ['create', 'update', 'delete', 'export'];

export const parsePermission = (permissions: Permission[]) => {

    if (permissions.length === 0) return [];

    const { parent: { name }, children } = getParent(permissions);
    return {
        [name]: {
            [`create`]: children.findIndex(p => p.name.includes('create')) >= 0,
            [`update`]: children.findIndex(p => p.name.includes('update')) >= 0,
            [`delete`]: children.findIndex(p => p.name.includes('delete')) >= 0,
            [`export`]: children.findIndex(p => p.name.includes('export')) >= 0
        }
    }
};

export async function updatePermissions<T extends Base & { permissions: Permission[] }>(model: T, permissions: { [x: string]: { [y: string]: boolean } }, repository: Repository<T>) {

    Object.entries(permissions).forEach(async ([key, value]) => {
        const parent = await db.getRepository(Permission).createQueryBuilder('p').where('p.name = :key', { key }).getOne();
        const newPermissions = [parent];
        for (let act of actions) {
            if (!value[act]) continue;
            const p = await db.getRepository(Permission).createQueryBuilder('p').where('p.name = :n', {n: `${key} - ${act}`}).getOne()
            newPermissions.push(p);
        }
        model.permissions = newPermissions;
        return await repository.save(model);
    })
}

const getParent = (permissions: Permission[]) => ({
    parent: permissions.filter(p => p.children.length > 0)[0],
    children: permissions.filter(p => p.children.length === 0)
});
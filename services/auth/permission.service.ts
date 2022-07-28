import { IsNull } from 'typeorm';
import db from '../../database/db';
import { Permission } from '../../models';
import { parsePermission } from '../../util/auth/permission.util';


const repository = db.getRepository(Permission);

const createPermission = async (attributes: Permission) => await repository.save({ ...attributes });

const getOnePermission = async (name: string) => {
    const permission = await repository.findOne({ where: { name }, relations: { children: true } });
    return permission;
}

const getAllPermission = async () => {
    const permissions = await repository
        .createQueryBuilder('permission')
        .select('permission.name')
        .where('permission.parent_id IS NULL')
        .getMany();
    return permissions.flatMap(name => name.name);
};

const updateOnePermission = async (id: number | string, attributes: Partial<Permission>) => {



}

const deleteOnePermission = async (id: number) => await repository.softDelete({ id });

export default {
    createPermission,
    getOnePermission,
    getAllPermission,
    updateOnePermission,
    deleteOnePermission
}
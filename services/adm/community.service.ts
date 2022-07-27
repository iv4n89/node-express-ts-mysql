import db from '../../database/db';
import { Community } from '../../models/adm/Community';

const repository = db.getRepository( Community );

const createCommunity = async (attributes: Community) => {
    const community = repository.create(attributes);
    await repository.save(community);
    return community;
}

const getOneCommunity = async (id: number) => await repository.findBy({id, deleted_at: null});

const getAllCommunities = async () => await repository.findBy({ deleted_at: null });

const updateOneCommunity = async (id: number, attributes: Partial<Community>) => {
    const result = await repository.update({id}, attributes);
    return await repository.findBy({id});
}

const deleteOneCommunity = async (id: number) => await repository.softDelete({id});

export default {
    createCommunity,
    getOneCommunity,
    getAllCommunities,
    updateOneCommunity,
    deleteOneCommunity
}
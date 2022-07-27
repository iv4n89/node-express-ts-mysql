import { Request, Response } from 'express';
import { Community } from '../../models/adm/Community';
import { communityService } from '../../services';

export const createCommunity = async (req: Request<{}, {}, Community, {}>, res: Response) => {
    const attributes = req.body;
    const community = await communityService.createCommunity(attributes);
    res.status(201).json(community);
}

export const getOneCommunity = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const community = await communityService.getOneCommunity(id);
    res.status(200).json(community);
}

export const getAllCommunities = async (req: Request, res: Response) => {
    const communities = await communityService.getAllCommunities();
    res.status(200).json(communities);
}

export const updateOneCommunity = async (req: Request<{id: number}, {}, Partial<Community>, {}>, res: Response) => {
    const { id } = req.params;
    const attributes = req.body;
    const community = await communityService.updateOneCommunity(id, attributes);
    res.status(200).json(community);
}

export const deleteOneCommunity = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const result = await communityService.deleteOneCommunity(id);
    res.status(200).json(!!result.affected);
}
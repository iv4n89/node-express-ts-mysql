import { Request, Response } from 'express';
import { Group } from '../../models';
import { groupService } from '../../services';

export const createGroup = async (req: Request<{}, {}, Group, {}>, res: Response) => {
    const attributes = req.body;
    const group = await groupService.createGroup(attributes);
    res.status(200).json(group);
}

export const getOneGroup = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const group = await groupService.getOneGroup(id);
    res.status(200).json(group);
}

export const getAllGroups = async (req: Request, res: Response) => {
    const groups = await groupService.getAllGroups();
    res.status(200).json(groups);
}

export const getAllUserGroups = async (req: Request<{userId: number}>, res: Response) => {
    const { userId } = req.params;
    const groups = await groupService.getAllUserGroups(userId);
    res.status(200).json(groups);
}

export const updateOneGroup = async (req: Request<{id: number}, {}, Partial<Group>, {}>, res: Response) => {
    const { id } = req.params;
    const attributes = req.body;
    const group = await groupService.updateOneGroup(id, attributes);
    res.status(200).json(group);
}

export const deleteOneGroup = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const result = await groupService.deleteOneGroup(id);
    res.status(200).json(!!result);
}
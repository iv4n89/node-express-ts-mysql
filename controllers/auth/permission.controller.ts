import { Permission } from "../../models";
import { Request, Response } from 'express';
import { permissionService } from "../../services";


export const createPermission = async ({ body: attributes }: Request<{}, {}, Permission, {}>, res: Response) => {
    const permission = await permissionService.createPermission(attributes);
    res.status(200).json(permission)
}

export const getAllPermissions = async (req: Request, res: Response) => {
    const permissions = await permissionService.getAllPermission();
    res.status(200).json(permissions);
}

export const getOnePermission = async ({ body: {name} }: Request<{}, {}, {name: string}, {}>, res: Response) => {
    const permission = await permissionService.getOnePermission(name);
    res.status(200).json(permission);
}
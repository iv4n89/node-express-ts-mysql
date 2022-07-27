import {Request, Response} from 'express';
import { Address } from '../models';
import { addressService } from '../services';

export const createAddress = async (req: Request<{}, {}, Address, {}>, res: Response) => {
    const attributes = req.body;
    const address = await addressService.createAddress(attributes);
    res.status(200).json(address);
}

export const getOneAddress = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const address = await addressService.getOneAddress(id);
    res.status(200).json(address);
}

export const getAllAddresses = async (req: Request, res: Response) => {
    const addresses = await addressService.getAllAddresses();
    res.status(200).json(addresses);
}

export const getAllUserAddresses = async (req: Request<{}, {}, {userId: number}, {}>, res: Response) => {
    const { userId } = req.body;
    const addresses = await addressService.getAllUserAddresses(userId);
    res.status(200).json(addresses);
}

export const updateOneAddress = async (req: Request<{id: number}, {}, Partial<Address>, {}>, res: Response) => {
    const { id } = req.params;
    const attributes = req.body;
    const address = await addressService.updateOneAddress(id, attributes);
    res.status(200).json(address);
}

export const deleteOneAddress = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const result = await addressService.deleteOneAddress(id);
    res.status(200).json(!!result);
}
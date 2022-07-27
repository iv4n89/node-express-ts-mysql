import { Request, Response } from 'express';
import { City } from '../../models/adm/City';
import { cityService } from '../../services'

export const createCity = async (req: Request<{}, {}, City, {}>, res: Response ) => {
    const attributes = req.body;
    const city = await cityService.createCity( attributes );
    res.status(201).json(city);
}

export const getOneCity = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const city = await cityService.getOneCity(id);
    res.status(200).json(city);
}

export const getAllCities = async (req: Request, res: Response) => {
    const cities = await cityService.getAllCities();
    res.status(200).json(cities);
}

export const updateOneCity = (req: Request<{id: number}, {}, Partial<City>, {}>, res: Response) => {
    const { id } = req.params;
    const attributes = req.body;
    const city = cityService.updateOneCity(id, attributes);
    res.status(200).json(city);
}

export const deleteOneCity = (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const result = cityService.deleteOneCity(id);
    res.status(200).json(!!result);
}
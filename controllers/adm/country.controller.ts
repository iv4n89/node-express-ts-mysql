import { Request, Response } from 'express';
import { Country } from '../../models/adm/Country';
import { countryService } from '../../services';

export const createCountry = async (req: Request<{}, {}, Country, {}>, res: Response) => {
    const attributes = req.body;
    const country = await countryService.createCountry(attributes);
    res.status(201).json(country);
}

export const getOneCountry = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const country = countryService.getOneCountry(id);
    res.status(200).json(country);
}

export const getAllCountries = async ( req: Request, res: Response ) => {
    const countries = await countryService.getAllCountries();
    res.status(200).json(countries);
}

export const updateOneCountry = async (req: Request<{id: number}, {}, Partial<Country>, {}>, res: Response) => {
    const { id } = req.params;
    const attributes = req.body;
    const country = await countryService.updateOneCountry(id, attributes);
    res.status(200).json(country);
} 

export const deleteOneCountry = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const result = countryService.deleteOneCountry(id);
    res.status(200).json(!!result);
}
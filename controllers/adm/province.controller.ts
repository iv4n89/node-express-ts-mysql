import { Response, Request } from 'express'; 
import { Province } from '../../models/adm/Province';
import { provinceService } from '../../services';

export const createProvince = async (req: Request<{}, {}, Province, {}>, res: Response) => {
    const attributes = req.body;
    const province = await provinceService.createProvince(attributes);
    res.status(200).json(province);
}

export const getOneProvince = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const province = await provinceService.getOneProvince(id);
    res.status(200).json(province);
}

export const getAllProvinces = async (req: Request, res: Response) => {
    const provinces = await provinceService.getAllProvinces();
    res.status(200).json(provinces);
}

export const updateOneProvince = async (req: Request<{id: number}, {}, Partial<Province>, {}>, res: Response) => {
    const { id } = req.params;
    const attributes = req.body;
    const province = await provinceService.updateOneProvince(id, attributes);
    res.status(200).json(province);
}

export const deleteOneProvince = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params;
    const result = await provinceService.deleteOneProvince(id);
    res.status(200).json(!!result);
}
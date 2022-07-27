import { Response, Request } from 'express';
import { authService } from '../../services';
import moment from 'moment';

export const login = async (req: Request<{}, {}, { email: string, password: string; }, {}>, res: Response) => {
    const { email, password } = req.body;
    const { token, user } = await authService.verifyPassword(email, password);
    res.cookie('auth_token', token, { expires: moment().add(168, 'hours').toDate() });
    res.status(200).json({
        token,
        user
    });
};
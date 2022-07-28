import { Response, Request } from 'express';
import { authService, userService } from '../../services';
import moment from 'moment';
import { User } from '../../models';
import { generateJwt } from '../../util';

export const login = async (req: Request<{}, {}, { email: string, password: string; }, {}>, res: Response) => {
    const { email, password } = req.body;
    const { token, user } = await authService.verifyPassword(email, password);
    res.cookie('auth_token', token, { expires: moment().add(168, 'hours').toDate() });
    res.status(200).json({
        token,
        user
    });
};

export const register = async (req: Request<{}, {}, User, {}>, res: Response) => {
    const attributes = req.body;
    const user = await userService.createUser(attributes);
    const token = await generateJwt(user.id);
    res.status(200).json({
        token,
        user
    })
}
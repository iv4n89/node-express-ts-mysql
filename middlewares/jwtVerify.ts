import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization');

    if (!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRETKEY as string, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        (req as any).user = user;

        next();
    });
};
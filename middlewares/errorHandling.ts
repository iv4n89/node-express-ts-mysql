import { Request, Response, NextFunction } from 'express-serve-static-core';

function errorHandling (err, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    res.send({
        message: err.message,
        error: true,
        code: req.statusCode < 400 && 400 || req.statusCode,
        result: null
    });
}

module.exports = errorHandling;
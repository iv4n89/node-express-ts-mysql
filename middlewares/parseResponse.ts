import mung from 'express-mung';
import { Request, Response } from 'express-serve-static-core';

function parseResponse(body, req: Request, res: Response) {
    if (body.error) return;
    if (req.statusCode >= 400) return;

    return {
        message: 'Ok',
        error: false,
        code: res.statusCode,
        result: body
    }
}

module.exports = mung.json(parseResponse);
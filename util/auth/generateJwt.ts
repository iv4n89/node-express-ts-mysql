import jwt from 'jsonwebtoken';

export const generateJwt = (id: number) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '72h',
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Not possible to generate token');
            } else {
                resolve(token);
            }
        });
    });
};
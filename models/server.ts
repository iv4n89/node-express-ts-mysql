import express, { Application } from 'express';
import { router, authRouter } from '../routes';
import db from '../database/db';
import { validateJWT } from '../middlewares/jwtVerify';

export class Server {
    app: Application;
    port: string;
    _routes: { [x: string]: string };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        // database
        db.initialize()
            .then(() => console.log('conectado'))
            .catch((err) => console.log(err));

        //routes
        this._routes = {
            api: '/api',
            auth: '/auth'
        };

        this.middlewares();
        
        this.routes();
        
        this.app.use(require('../middlewares/errorHandling'));
    }
    
    middlewares() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(require('../middlewares/parseResponse'));
    }

    routes() {
        //api routes
        this.app.use(this._routes.api, validateJWT, router);

        //auth routes
        this.app.use(this._routes.auth, authRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`);
        })
    }
}
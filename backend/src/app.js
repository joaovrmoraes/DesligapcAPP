import express from 'express';
import routes from './routes.js';
import cors from 'cors';

class App {
    constructor() {
        this.server = express();

        this.middleweres();
        this.routes();
    }

    middleweres() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server

import express, {type RequestHandler} from 'express';
import type {RoutesInterface} from "./interfaces/routes.interface.js";
import {configsServerConstant} from "./constants/configsServer.constant.js";


export class Server {
    private routes: RoutesInterface[] = [];
    private app: express.Application;
    private readonly port: number;

    constructor(port: number = 3000) {
        this.app = express();
        this.port = port;
        this.initConfig();
    }

    initConfig() {
        configsServerConstant.forEach(config => this.addConfiguration(config));
    }

    addConfiguration(config:RequestHandler<any, any, Record<string, any>>){
        this.app.use(config);
    }

    addRoute(route: RoutesInterface) {
        this.routes.push(route);
    }

    deployRoutes() {
        this.routes.forEach(route => this.app.use(route.url, route.router));
        console.log('Routes deployed');
    }


    start(callback: Function) {
        this.app.listen(this.port, callback as  (error?: Error) => void);
    }
}
import express, {type RequestHandler} from 'express';
import type {RoutesInterface} from "./interfaces/routes.interface.js";
import {configsServerConstant} from "./constants/configsServer.constant.js";
import * as http from "node:http";


export class Server {
    private static instance: Server;
    private readonly port: number;
    private readonly httpServer: http.Server;
    private readonly app: express.Application;
    private routes: RoutesInterface[] = [];


    private constructor(port: number = 3000) {
        this.app = express();
        this.port = port;
        this.httpServer = new http.Server(this.app);
        this.initConfig();
    }

    static getInstance(port: number) {
        if (!Server.instance) {
            Server.instance = new this(port);
        }
        return Server.instance;
    }

    getServer() {
        return this.httpServer;
    }

    initConfig() {
        configsServerConstant.forEach(config => this.addConfiguration(config));
    }

    addConfiguration(config: RequestHandler<any, any, Record<string, any>>) {
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
        this.httpServer.listen(this.port, callback as (error?: Error) => void);
    }
}
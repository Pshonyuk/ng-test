import fs = require('fs');
import path = require('path');
import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import methodOverride = require('method-override');
import Express = express.Express;

import {logger} from './logger';
import {connect} from './db/mongoose';

type apiInfo = {
    version: string
}
interface IConfig {
    port: number,
    routesPath: string,
    databaseUrl: string,
    api: apiInfo
}

export class App {
    public expressApp: Express;

    constructor(private _config: IConfig) {
        connect(_config.databaseUrl);
        this.expressApp = express();
        this._connectRoutes();
    }

    public get apiInfo(): apiInfo {
        return this._config.api;
    }

    public listen(): void {
        this.expressApp.listen(this._config.port, () => {
            logger.info(`Listen port ${this._config.port}.`);
        });
    }

    private _configure(): void {
        const app = this.expressApp;
        app.configure(function() {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(cookieParser());
            app.use(methodOverride())
        });
    }

    private _connectRoutes(): void {
        const routesPath = this._config.routesPath;

        fs.readdir(routesPath, (err, data) => {
            if (err) return logger.error(err);

            data.forEach(fileName => {
                const filePath = path.resolve(path.join(routesPath, fileName));

                fs.stat(filePath, (err, stat) => {
                    if (err) return logger.error(err);

                    if (stat.isFile() && path.extname(fileName) === ".js") {
                        const routeConfig = require(filePath);
                        this.expressApp.use(routeConfig.path, routeConfig.action(this));
                    }
                })
            });
        });
    }
}
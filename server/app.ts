import fs = require('fs');
import path = require('path');
import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import session = require('express-session');
import mongoStore = require('connect-mongodb');
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
    api: apiInfo,
    mongoose: {
        url: string,
        options?: {
            user?: string,
            pass?: string,
        }
    }
}

export class App {
    public expressApp: Express;
    private _connectionData;

    constructor(private _config: IConfig) {
        this._connectionData = connect(_config.mongoose.url, _config.mongoose.options);
        this.expressApp = express();
        this._configure();
        this._connectRoutes();

        //temp
        this.expressApp.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
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
        const db = this._connectionData.db,
            app = this.expressApp;


        // logger.info(this._);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        // app.use(session({
        //     store: mongoStore({
        //         dbname: db.db.databaseName,
        //         host: db.db.serverConfig.host,
        //         port: db.db.serverConfig.port,
        //         username: db.uri.username,
        //         password: db.uri.password
        //     })
        // }));
        app.use(methodOverride())
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
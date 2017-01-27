import fs = require('fs');
import path = require('path');
import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import session = require('express-session');
import mongoStore = require('connect-mongodb');
import methodOverride = require('method-override');
import MySQLStore = require('express-mysql-session');

import Express = express.Express;

import { logger } from './logger';
import { connect } from './db/mongoose';

type apiInfo = {
	version: string
}
interface IConfig {
	port: number,
	routesPath: string,
	api: apiInfo,
	cookie: {
		key: string,
		secret: string
	}
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
		this.expressApp.use(function (req, res, next) {
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
		const config = this._config,
			app = this.expressApp;

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(cookieParser());
		app.use(session({
			key: config.cookie.key,
			secret: config.cookie.secret,
			store: this._createSessionStore(),
			resave: true,
			saveUninitialized: true
		}));
		app.use(methodOverride())
	}

	private _createSessionStore(): void {
		const mongoConfig = this._config.mongoose.options,
			db = this._connectionData.db,
			options = {
				host: db.host,
				port: db.port,
				user: mongoConfig.user,
				password: mongoConfig.pass,
				database: 'ng-app'
			};

		return new (MySQLStore(session))(options);
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
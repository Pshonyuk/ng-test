"use strict";
var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var methodOverride = require("method-override");
var MySQLStore = require("express-mysql-session");
var logger_1 = require("./logger");
var mongoose_1 = require("./db/mongoose");
var App = (function () {
    function App(_config) {
        this._config = _config;
        this._connectionData = mongoose_1.connect(_config.mongoose.url, _config.mongoose.options);
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
    Object.defineProperty(App.prototype, "apiInfo", {
        get: function () {
            return this._config.api;
        },
        enumerable: true,
        configurable: true
    });
    App.prototype.listen = function () {
        var _this = this;
        this.expressApp.listen(this._config.port, function () {
            logger_1.logger.info("Listen port " + _this._config.port + ".");
        });
    };
    App.prototype._configure = function () {
        var config = this._config, app = this.expressApp;
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
        app.use(methodOverride());
    };
    App.prototype._createSessionStore = function () {
        var mongoConfig = this._config.mongoose.options, db = this._connectionData.db, options = {
            host: db.host,
            port: db.port,
            user: mongoConfig.user,
            password: mongoConfig.pass,
            database: 'ng-app'
        };
        return new (MySQLStore(session))(options);
    };
    App.prototype._connectRoutes = function () {
        var _this = this;
        var routesPath = this._config.routesPath;
        fs.readdir(routesPath, function (err, data) {
            if (err)
                return logger_1.logger.error(err);
            data.forEach(function (fileName) {
                var filePath = path.resolve(path.join(routesPath, fileName));
                fs.stat(filePath, function (err, stat) {
                    if (err)
                        return logger_1.logger.error(err);
                    if (stat.isFile() && path.extname(fileName) === ".js") {
                        var routeConfig = require(filePath);
                        _this.expressApp.use(routeConfig.path, routeConfig.action(_this));
                    }
                });
            });
        });
    };
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map
"use strict";
var express = require("express");
var Router = express.Router;
var logger_1 = require("../logger");
exports.path = "/api/users";
exports.action = function (app) {
    var router = Router();
    router.use(function (req, res, next) {
        next();
    });
    router.post('/', function (req, res) {
        logger_1.logger.info("test post");
        res.json({ test: 1 });
    });
    router.get('/', function (req, res) {
        logger_1.logger.info("test get");
        res.json({ test: 1 });
    });
    return router;
};
//# sourceMappingURL=users.js.map
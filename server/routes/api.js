"use strict";
var express = require("express");
var Router = express.Router;
exports.path = "/api";
exports.action = function (app) {
    var router = Router();
    router.use(function (req, res, next) {
        next();
    });
    router.get('/', function (req, res) {
        res.json(app.apiInfo);
    });
    return router;
};
//# sourceMappingURL=api.js.map
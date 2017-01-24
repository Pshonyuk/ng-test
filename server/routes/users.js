"use strict";
var express = require("express");
var Router = express.Router;
exports.path = "/users/";
exports.action = function (app) {
    var router = Router();
    router.use(function (req, res, next) {
        next();
    });
    router.post('/users/', function (req, res) {
    });
    return router;
};
//# sourceMappingURL=users.js.map
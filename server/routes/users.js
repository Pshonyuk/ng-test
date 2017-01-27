"use strict";
var express = require("express");
var Router = express.Router;
var User_1 = require("../models/User");
var logger_1 = require("../logger");
var errorsData;
(function (errorsData) {
    errorsData.CONFIRM_PASSWORD = {
        field: 'confirmPassword',
        type: 'confirm'
    };
    errorsData.DUPLICATED_EMAIL = {
        field: 'email',
        type: 'duplicated'
    };
    errorsData.UNKNOWN = {
        type: 'unknown'
    };
})(errorsData = exports.errorsData || (exports.errorsData = {}));
exports.path = '/api/users';
exports.action = function (app) {
    var router = Router();
    router.use(function (req, res, next) {
        next();
    });
    router.post('/', function (req, res) {
        if (req.body.password !== req.body.confirmPassword) {
            res.json({ error: errorsData.CONFIRM_PASSWORD });
            return;
        }
        new User_1.UserModel(req.body).save().then(function () {
            res.json({});
        }).catch(function (err) {
            if (err.name === 'ValidationError' && err.errors && err.errors.email) {
                res.json({ error: errorsData.DUPLICATED_EMAIL });
                return;
            }
            logger_1.logger.error(JSON.stringify(err));
            res.json({ error: errorsData.UNKNOWN });
        });
    });
    router.get('/', function (req, res) {
        logger_1.logger.info('test get');
        res.json({ test: 'get' });
    });
    return router;
};
//# sourceMappingURL=users.js.map
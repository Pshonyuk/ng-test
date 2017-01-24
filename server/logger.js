"use strict";
var fs = require("fs");
var winston = require("winston");
var Logger = winston.Logger;
if (!fs.existsSync('./logs'))
    fs.mkdirSync('./logs');
exports.logger = new Logger({
    transports: [
        new winston.transports.Console({
            name: 'debug-console',
            level: 'debug',
            handleException: true,
            json: false,
            colorize: true,
            timestamp: true
        }),
        new winston.transports.File({
            name: 'info-file',
            level: 'info',
            filename: './logs/filelog-info.log',
            handleException: true,
            json: true,
            maxSize: 5242880,
            maxFiles: 2,
            colorize: false,
            timestamp: true
        }),
        new (winston.transports.File)({
            name: 'error-file',
            level: 'error',
            filename: './logs/filelog-error.log',
            handleException: true,
            json: true,
            maxSize: 5242880,
            maxFiles: 2,
            colorize: false,
            timestamp: true
        })
    ],
    exitOnError: false
});
//# sourceMappingURL=logger.js.map
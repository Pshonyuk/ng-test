import mongoose = require('mongoose');
import {Connection} from "mongoose";
import connection = mongoose.connection;

import {logger} from '../logger';

mongoose.Promise = global.Promise;

export const connect = (url: string, opts?: any): Connection => {
    mongoose.connect(url, (<any>Object).assign({}, opts));

    connection.on('error', function (err) {
        logger.error('Connection error:', err.message);
    });

    connection.once('open', function callback () {
        logger.info("Connected to DB!");
    });

    return connection;
};
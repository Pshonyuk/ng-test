import express = require('express');
import Router = express.Router;
import {UserModel} from '../models/User';
import {logger} from "../logger";

export const path: string = "/api/users";

export const action = (app) => {
    const router = Router();

    router.use((req, res, next) => {
        next();
    });

    router.post('/', (req, res) => {
        logger.info("test post");
        res.json({test: 1});
    });

    router.get('/', (req, res) => {
        logger.info("test get");
        res.json({test: 1});
    });
    return router;
};
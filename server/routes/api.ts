import express = require('express');
import Router = express.Router;


export const path: string = "/api";

export const action = (app) => {
	const router = Router();

	router.use((req, res, next) => {
		next();
	});

	router.get('/', (req, res) => {
		res.json(app.apiInfo);
	});

	return router;
};